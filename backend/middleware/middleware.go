package middleware

import (
	"backend/util"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

func IsAuthenticate(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	var userId string
	var err error
	if userId, err = util.ParseJwt(cookie); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": " user not authenticatede",
		})
	}
	user, _ := uuid.Parse(userId)
	c.Locals("user", user)
	return c.Next()
}
