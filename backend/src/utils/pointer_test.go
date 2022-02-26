package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_StringPtr(t *testing.T) {
	s := "hello world"

	assert.Equal(t, &s, StringPtr(s))
}
