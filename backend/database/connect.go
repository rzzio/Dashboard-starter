package database

import (
	"backend/models"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func Connect(seed bool) {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error connecting to DB ENV FILE")
	}
	// dsn := os.Getenv("DSN")
	dbUser := os.Getenv("DB_USER")
	dbPass := os.Getenv("DB_PASS")
	dbName := os.Getenv("DB_NAME")
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	var dsn string
	if !seed {
		dsn = fmt.Sprintf("host=db user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", dbUser, dbPass, dbName, dbPort)
	} else {
		dsn = fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Shanghai", dbHost, dbUser, dbPass, dbName, dbPort)
	}
	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})
	if err != nil {
		panic("Could not connect to DB")
	} else {
		log.Println("Connection successful")
	}

	DB = database
	database.AutoMigrate(models.AllModels...)
}
