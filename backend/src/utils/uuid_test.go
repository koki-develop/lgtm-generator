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

func Test_IsLowerUUID(t *testing.T) {
	t.Run("return is string uuid", func(t *testing.T) {
		testcases := []struct {
			str string
			ok  bool
		}{
			{"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", true},
			{"00000000-0000-0000-0000-000000000000", true},
			{"da078009-a2b4-4e6d-9004-cb0096ab9f62", true},
			{"AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA", false},
			{"DA078009-A2B4-4E6D-9004-CB0096AB9F62", false},
		}

		for _, testcase := range testcases {
			assert.Equal(t, testcase.ok, IsLowerUUID(testcase.str))
		}
	})
}
