package main

import (
	"backend/database"
	"backend/models"
	"fmt"
	"log"
	"os"

	"github.com/google/uuid"
)

func main() {
	database.Connect(true)
	db := database.DB
	users := []models.User{}
	u1 := models.User{
		Id:           uuid.New(),
		FirstName:    "Admin",
		LastName:     "User",
		Email:        "admin@admin.com",
		IsSuperAdmin: true,
	}
	u1.SetPassword("admin123")
	technician := models.User{
		Id:           uuid.New(),
		FirstName:    "Suraj",
		LastName:     "Pandey",
		Email:        "suraj@suraj.com",
		IsTechnician: true,
	}

	technician1 := models.User{
		Id:           uuid.New(),
		FirstName:    "Suraj1",
		LastName:     "Pandey1",
		Email:        "suraj1@suraj1.com",
		IsTechnician: true,
	}
	technician.SetPassword("suraj123")
	technician1.SetPassword("suraj123")
	users = append(users, u1, technician, technician1)
	if err := db.Create(&users).Error; err != nil {
		log.Println(err)
		os.Exit(1)
	}
	fmt.Println("Successfully seeded user")
}
