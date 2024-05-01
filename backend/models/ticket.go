package models

import (
	"backend/util/types"
	"time"

	"github.com/google/uuid"
)

type Ticket struct {
	Id          uuid.UUID        `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Status      types.StatusType `json:"status"`
	AssignedTo  []*TicketUser    `json:"assigned_to"`
	Priority    types.Priority   `json:"priority"`
	Description string           `json:"description"`
	Title       string           `json:"title"`
	CreatedAt   time.Time        `json:"created_at" gorm:"autoCreateTime"`
	CreatedById *uuid.UUID       `json:"created_by_id"`
	CreatedBy   *User            `json:"creator,omitempty" gorm:"foreignReference:CreatedById"`
	Attachments []Attachment     `json:"attachments,omitempty"`
	Comments    []Comment        `json:"comments,omitempty"  gorm:"foreignKey:TicketId;constraint:OnDelete:CASCADE;"`
}

type TicketUser struct {
	Id       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	TicketId uuid.UUID `json:"ticket_id"`
	UserId   uuid.UUID `json:"user_id"`
	User     *User     `json:"user,omitempty"`
	Ticket   *Ticket   `json:"ticket,omitempty"`
}
