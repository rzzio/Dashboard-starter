package models

import (
	"time"

	"github.com/google/uuid"
)

type Comment struct {
	Id          uuid.UUID    `json:"id,omitempty" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Description string       `json:"description"`
	CreatedAt   time.Time    `json:"created_at"`
	CreatedById *uuid.UUID   `json:"created_by_id"`
	CreatedBy   *User        `json:"creator,omitempty" gorm:"foreignReference:CreatedById"`
	TicketId    *uuid.UUID   `json:"ticket_id"`
	Attachments []Attachment `json:"attachments,omitempty"`
}
