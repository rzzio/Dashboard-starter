package routes

import (
	"backend/controller"
	//"backend/middleware"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Post("/api/login", controller.Login)

	app.Post("/api/register", controller.Register)

	// app.Use(middleware.IsAuthenticate)

}
