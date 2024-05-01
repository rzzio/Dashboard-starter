package routes

import (
	"backend/controller"
	"backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	nonAuthApi := app.Group("/api")
	nonAuthApi.Post("/login", controller.Login)
  nonAuthApi.Post("/register", controller.Register)

	authApi := app.Group("/api", middleware.IsAuthenticate)

	authApi.Post("/ticket", controller.CreateTicket)
	authApi.Get("/tickets", controller.ListTicket)
	authApi.Get("ticket/:id", controller.FindTicket)
	authApi.Post("/comment", controller.CreateComment)
	authApi.Get("/users", controller.ListAllUsers)
	authApi.Post("/user/status", controller.ChangeAdminStatus)
	authApi.Post("/upload", controller.UploadAttachment)
	authApi.Post("/ticket/delete/:id", controller.DeleteTicket)
	authApi.Get("/ticket-count", controller.DashboardDetails)
	authApi.Put("/ticket/:id", controller.EditTicket)
	authApi.Put("/user/:id", controller.EditUser)
	authApi.Patch("/inactive", controller.Inactive)
	authApi.Patch("/tickets", controller.TicketStatusChange)
}
