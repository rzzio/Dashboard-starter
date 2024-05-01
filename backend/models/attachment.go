package models

import "github.com/google/uuid"

type Attachment struct {
	Id        uuid.UUID  `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Name      string     `json:"name,omitempty"`
	FileUrl   string     `json:"file_url"`
	FileSize  int64      `json:"file_size,omitempty"`
	FileType  string     `json:"file_type,omitempty"`
	TicketId  *uuid.UUID `json:"ticket_id"`
	CommentId *uuid.UUID `json:"comment_id"`
}
