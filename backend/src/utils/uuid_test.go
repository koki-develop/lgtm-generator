package utils

import (
	"regexp"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_UUIDV4(t *testing.T) {
	t.Run("return uuid v4 string", func(t *testing.T) {
		u := UUIDV4()
		assert.Regexp(t, regexp.MustCompile(`\A[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\z`), u)
	})
}
