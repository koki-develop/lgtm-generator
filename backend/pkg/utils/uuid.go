package utils

import (
	"github.com/google/uuid"
)

func UUIDV4() string {
	return uuid.New().String()
}
