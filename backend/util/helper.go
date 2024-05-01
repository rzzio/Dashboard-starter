package util

import (
	"backend/models"
	"errors"
	"io"
	"mime/multipart"

	//"go/token"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

const SecretKey = "secret"

// GenerateJwt generates a JWT token for a given issuer that expires in 12 hours.
// It returns the generated token string and any error encountered.
func GenerateJwt(issuer string) (string, error) { // Corrected the return types
	// Define the token claims
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"iss": issuer,                                // Use "iss" for issuer
		"exp": time.Now().Add(time.Hour * 12).Unix(), // Expiration time
	})

	// Sign the token with our secret key
	tokenString, err := claims.SignedString([]byte(SecretKey))
	if err != nil {
		return "", err // Return the error if any
	}

	return tokenString, nil // Return the generated token and nil error
}

// ParseJwt parses the given JWT token string and returns the issuer if the token is valid.
func ParseJwt(tokenString string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &jwt.MapClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil || !token.Valid {
		return "", err
	}

	claims, ok := token.Claims.(*jwt.MapClaims)
	if !ok {
		return "", errors.New("could not parse claims")
	}

	issuer, ok := (*claims)["iss"].(string)
	if !ok {
		return "", errors.New("issuer claim is not a string")
	}

	return issuer, nil
}

func GetUser(id uuid.UUID, db *gorm.DB) (*models.User, error) {
	var user *models.User
	if err := db.Model(&models.User{}).Where("id = ?", id).Find(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func FileUploadHandler(file multipart.FileHeader) ([]byte, error) {
	fileContent, err := file.Open()
	if err != nil {
		return nil, errors.New("failed to open the uploaded file")
	}
	defer fileContent.Close()

	fileBytes, err := io.ReadAll(fileContent)
	if err != nil {
		return nil, errors.New("failed to read the file content")
	}

	return fileBytes, nil
}

func FindObjectById[T any](db *gorm.DB, id *uuid.UUID) (T, error) {
	var object T
	if id == nil {
		return object, nil
	}

	if err := db.Where("id=?", id).First(&object).Error; err != nil {
		return object, err
	}
	return object, nil
}
