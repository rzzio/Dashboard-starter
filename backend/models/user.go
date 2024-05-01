package models

import (
	"log"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id           uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	FirstName    string    `json:"first_name"`
	LastName     string    `json:"last_name"`
	Email        string    `json:"email"`
	Password     []byte    `json:"-"`
	Phone        string    `json:"phone"`
	IsTechnician bool      `json:"is_technician"`
	IsSuperAdmin bool      `json:"is_super_admin"`
	Inactive     bool      `json:"inactive"  gorm:"default:false"`
}

func (user *User) SetPassword(password string) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPassword

	if err != nil {
		log.Println("hashing error")
	}
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}

func (u User) GetId() *uuid.UUID {
	return &u.Id
}
