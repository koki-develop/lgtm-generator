package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Base64Decode(t *testing.T) {
	t.Run("return decoded text", func(t *testing.T) {
		b, err := Base64Decode("aGVsbG8gd29ybGQ=")
		assert.Equal(t, "hello world", string(b))
		assert.NoError(t, err)
	})

	t.Run("return error when invalid base64", func(t *testing.T) {
		b, err := Base64Decode("INVALID_BASE64")
		assert.Nil(t, b)
		assert.NotNil(t, err)
	})
}
