package main

import (
	"backend/database"
	"backend/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	database.Connect(false)
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env files")
	}
	port := os.Getenv("PORT")
	app := fiber.New()
	app.Static("/tmp/uploads", "./tmp/uploads")
	app.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost, http://localhost:3000",
		AllowCredentials: true,
	}))
	routes.Setup(app)
	app.Listen(":" + port)
}
