package utils

import (
	"regexp"

	"github.com/google/uuid"
)

func UUIDV4() string {
	return uuid.New().String()
}

func IsLowerUUID(s string) bool {
	return regexp.MustCompile(`\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z`).Match([]byte(s))
}
