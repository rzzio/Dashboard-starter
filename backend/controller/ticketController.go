package controller

import (
	"backend/database"
	"backend/models"
	"backend/util"
	"backend/util/types"
	"errors"
	"fmt"
	"mime/multipart"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TicketView struct {
	Title       string           `json:"title"`
	Priority    types.Priority   `json:"priority"`
	Description string           `json:"description"`
	AssignedTo  []uuid.UUID      `json:"assigned_to"`
	Status      types.StatusType `json:"status"`
}

type CommentView struct {
	Description string    `json:"description"`
	TicketId    uuid.UUID `json:"ticket_id"`
}

type AlterAdminStatusView struct {
	UserId uuid.UUID `json:"user_id"`
}

type UserParam struct {
	IsAdmin      bool `query:"is_admin"`
	IsTechnician bool `query:"is_technician"`
}

type AttachmentView struct {
	File      *multipart.FileHeader `form:"file"`
	TicketId  *uuid.UUID            `form:"ticket_id"`
	CommentId *uuid.UUID            `form:"comment_id"`
}

func CreateTicket(c *fiber.Ctx) error {
	var view TicketView
	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}
	userId := c.Locals("user")
	var user *models.User
	if err := database.DB.Model(&models.User{}).Where("id = ?", userId).Find(&user).Error; err != nil {
		c.Status(500)

		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	ticket := &models.Ticket{
		Id:          uuid.New(),
		Title:       view.Title,
		Priority:    view.Priority,
		Description: view.Description,
		Status:      types.UnassignedStatus,
	}
	ticket.CreatedById = user.GetId()
	for _, assigned := range view.AssignedTo {
		ticket.AssignedTo = append(ticket.AssignedTo, &models.TicketUser{TicketId: ticket.Id, UserId: assigned})
	}
	fmt.Println(ticket.AssignedTo)
	if err := database.DB.Create(&ticket).Error; err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(ticket)
}

func ListTicket(c *fiber.Ctx) error {
	db := database.DB
	userId := c.Locals("user")
	user, _ := util.GetUser(userId.(uuid.UUID), db)
	var tickets []models.Ticket
	db = db.Table("tickets as t")
	db = db.Joins("LEFT JOIN ticket_users tu on tu.ticket_id = t.id")
	if user.IsTechnician {
		db = db.Where("t.created_by_id = ? OR tu.user_id =?", userId, userId)
	} else if user.IsSuperAdmin {
		db = db
	} else {
		db = db.Where("t.created_by_id = ?", userId)
	}
	db = db.Preload("CreatedBy").Preload("AssignedTo.User")
	db = db.Order("t.created_at desc")
	if err := db.Find(&tickets).Error; err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(tickets)
}

func FindTicket(c *fiber.Ctx) error {
	db := database.DB
	ticketId := c.Params("id")
	var ticket models.Ticket
	db = db.Preload("CreatedBy").Preload("AssignedTo.User").Preload("Comments.CreatedBy").Preload("Attachments").Preload("Comments.Attachments")
	if err := db.Where("id = ?", ticketId).First(&ticket).Error; err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	for i := range ticket.Attachments {
		ticket.Attachments[i].FileUrl = fmt.Sprintf("http://localhost:8091/%s", ticket.Attachments[i].FileUrl)
	}
	for _, each := range ticket.Comments {
		for i := range each.Attachments {
			each.Attachments[i].FileUrl = fmt.Sprintf("http://localhost:8091/%s", each.Attachments[i].FileUrl)
		}
	}

	c.Status(200)
	return c.JSON(ticket)
}

func CreateComment(c *fiber.Ctx) error {
	db := database.DB
	var view CommentView
	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"error": "Bad request" + err.Error(),
		})
	}
	userId := c.Locals("user").(uuid.UUID)

	comment := &models.Comment{
		Description: view.Description,
		CreatedById: &userId,
		TicketId:    &view.TicketId,
	}

	if err := db.Create(&comment).Error; err != nil {
		c.Status(500)
		return err
	}
	return c.JSON(comment)
}

func ListAllUsers(c *fiber.Ctx) error {
	db := database.DB
	var users []*models.User
	var userParams UserParam

	if err := c.QueryParser(&userParams); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{"message": "Bad request"})
	}
	if userParams.IsTechnician {
		db = db.Where("is_technician = true")
	} else if userParams.IsAdmin {
		db = db
	} else {
		db = db.Where("not is_technician and not is_super_admin")
	}

	if err := db.Find(&users).Error; err != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.JSON(users)
}

func ChangeAdminStatus(c *fiber.Ctx) error {
	userId := c.Locals("user")
	var view AlterAdminStatusView
	if err := c.BodyParser(&view); err != nil {
		c.SendStatus(fiber.StatusBadRequest)
	}
	db := database.DB
	user, _ := util.GetUser(userId.(uuid.UUID), db)
	if !user.IsSuperAdmin {
		c.Status(403)
		return c.JSON(fiber.Map{"message": "You are not authorized to perform this operation."})
	}
	if err := db.Model(&models.User{}).Where("id = ?", view.UserId).Update("is_admin", gorm.Expr("NOT is_admin")).Error; err != nil {
		return err
	}

	c.Status(200)
	return c.JSON(fiber.Map{
		"message": "Successfully changed admin status",
	})
}

func UploadAttachment(c *fiber.Ctx) error {
	var view AttachmentView

	file, err := c.FormFile("file")
	if err != nil {
		return err
	}

	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}

	view.File = file

	f, err := util.FileUploadHandler(*view.File)
	if err != nil {
		c.Status(500)
		return err
	}
	filePath := "tmp/uploads/" + file.Filename

	err = os.MkdirAll(filepath.Dir(filePath), 0755)
	if err != nil {
		c.Status(500)
		return err
	}

	err = os.WriteFile(filePath, f, 0644)
	if err != nil {
		fmt.Println("I got the error from her")
		return err
	}
	// imageUrl := fmt.Sprintf("http://localhost:8091/%s", filePath)
	attachment := &models.Attachment{
		Name:      file.Filename,
		FileSize:  file.Size,
		FileUrl:   filePath,
		TicketId:  view.TicketId,
		CommentId: view.CommentId,
		FileType:  file.Header.Get("ContentType"),
	}
	if err := database.DB.Create(&attachment).Error; err != nil {
		c.Status(500)
		return err
	}
	return c.SendStatus(200)
}

func DeleteTicket(c *fiber.Ctx) error {
	db := database.DB
	id, _ := uuid.Parse(c.Params("id"))
	return db.Transaction(func(tx *gorm.DB) error {
		if err := db.Where("ticket_id = ?", id).Delete(&models.TicketUser{}).Error; err != nil {
			c.Status(200)
			return err
		}

		if err := db.Where("ticket_id = ?", id).Delete(&models.Attachment{}).Error; err != nil {
			c.Status(500)
			return err
		}

		if err := db.Where("id = ?", id).Delete(&models.Ticket{}).Error; err != nil {
			c.Status(500)
			return err
		}
		c.Status(200)
		return c.JSON(fiber.Map{"message": "Successfully deleted"})
	})
}

type TicketStatus struct {
	Completed  int `json:"completed"`
	Pending    int `json:"pending"`
	Unassigned int `json:"unassigned"`
}

func DashboardDetails(c *fiber.Ctx) error {
	db := database.DB
	userId := c.Locals("user")
	user, _ := util.GetUser(userId.(uuid.UUID), db)
	var ticketStatus TicketStatus
	db = db.Table("tickets")
	if user.IsTechnician {
		db = db.Joins("LEFT JOIN ticket_users tu ON tickets.id = tu.ticket_id").
			Where("tu.user_id = ? OR tickets.created_by_id = ?", userId, userId)
	} else if !user.IsSuperAdmin && !user.IsTechnician {
		db = db.Where("tickets.created_by_id = ?", userId)
	}
	if err := db.
		Select("SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed, " +
			"SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending, " +
			"SUM(CASE WHEN status = 'Unassigned' THEN 1 ELSE 0 END) as unassigned").
		Scan(&ticketStatus).Error; err != nil {
		return err
	}

	return c.JSON(ticketStatus)
}

func EditTicket(c *fiber.Ctx) error {
	db := database.DB
	var view TicketView
	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}

	ticketId, _ := uuid.Parse(c.Params("id"))
	oldTicket, err := util.FindObjectById[*models.Ticket](db, &ticketId)
	if err != nil {
		return err
	}
	ticket := &models.Ticket{}
	ticket.Title = oldTicket.Title
	ticket.Priority = oldTicket.Priority
	ticket.Status = oldTicket.Status
	ticket.Description = oldTicket.Description
	ticket.CreatedById = oldTicket.CreatedById
	ticket.CreatedAt = oldTicket.CreatedAt
	ticket.Id = oldTicket.Id

	for _, uid := range view.AssignedTo {
		ticket.AssignedTo = append(ticket.AssignedTo, &models.TicketUser{
			TicketId: oldTicket.Id,
			UserId:   uid,
		})
	}

	err = db.Transaction(func(tx *gorm.DB) error {
		if err = tx.Where("ticket_id=?", ticketId).Delete(&models.TicketUser{}).Error; err != nil {
			return err
		}
		if err := tx.Save(ticket).Error; err != nil {
			return err
		}
		return nil
	})
	c.Status(200)
	return c.JSON(ticket)
}

type UserView struct {
	IsTechnician bool   `json:"is_technician"`
	FirstName    string `json:"first_name"`
	LastName     string `json:"last_name"`
	Phone        string `json:"phone"`
	Inactive     bool   `json:"inactive"`
}

func EditUser(c *fiber.Ctx) error {
	var view UserView
	ctxUserId := c.Locals("user")
	db := database.DB
	authUser, _ := util.GetUser(ctxUserId.(uuid.UUID), db)
	userId, _ := uuid.Parse(c.Params("id"))
	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}

	oldUser, _ := util.GetUser(userId, db)
	if !authUser.IsSuperAdmin {
		c.Status(403)
		return c.JSON(fiber.Map{"message": "Only super admin has the access to change user status", "error": true})
	}
	user := &models.User{
		IsTechnician: view.IsTechnician,
		FirstName:    view.FirstName,
		LastName:     view.LastName,
		Phone:        view.Phone,
		Inactive:     view.Inactive,
	}
	user.Id = oldUser.Id
	if err := db.Model(&oldUser).Select("*").Omit("id").Updates(&user).Error; err != nil {
		c.Status(500)
		return err
	}
	return c.JSON(user)
}

type InactiveView struct {
	Inactive bool      `json:"inactive"`
	UserId   uuid.UUID `json:"user_id"`
}

func Inactive(c *fiber.Ctx) error {
	var view InactiveView
	db := database.DB
	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}

	if err := db.Model(&models.User{}).Where("id = ?", view.UserId).Update("inactive", view.Inactive).Error; err != nil {
		c.Status(500)
		return err
	}
	return c.SendStatus(200)
}

func TicketStatusChange(c *fiber.Ctx) error {
	var view PatchView
	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}
	if view.Col != "status" {
		c.Status(400)
		return errors.New("This field cannot be changed")
	}
	uid := c.Locals("user")
	db := database.DB
	user, _ := util.GetUser(uid.(uuid.UUID), db)
	if !user.IsSuperAdmin && !user.IsTechnician {
		c.Status(403)
		return errors.New("You are not authorized to change ticket status")
	}
	return db.Model(&models.Ticket{}).
		Where("id = ?", view.Id).
		Updates(map[string]interface{}{
			view.Col: view.Value,
		}).Error
}

type PatchView struct {
	Id    uuid.UUID   `json:"id"`
	Col   string      `json:"col"`
	Value interface{} `json:"value"`
}

func AlterTechnician(c *fiber.Ctx) error {
	var view PatchView

	if err := c.BodyParser(&view); err != nil {
		c.Status(400)
		return err
	}
	loggedInUser := c.Locals("user")
	db := database.DB
	user, _ := util.GetUser(loggedInUser.(uuid.UUID), db)
	if !user.IsSuperAdmin {
		c.Status(403)
		return errors.New("You are not authorized to change ticket status")
	}

	if view.Col != "is_technician" {
		c.Status(400)
		return errors.New("Cannot change this field")

	}

	return db.Model(&models.User{}).
		Where("id = ?", view.Id).
		Updates(map[string]interface{}{
			view.Col: view.Value,
		}).Error
}
