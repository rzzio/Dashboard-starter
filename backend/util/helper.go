package util

import (
	"errors"
	//"go/token"
	"time"

	"github.com/golang-jwt/jwt/v5"
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


