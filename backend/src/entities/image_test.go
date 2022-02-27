package entities

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func buildImageSearchInput() *ImagesSearchInput {
	return &ImagesSearchInput{Query: "query"}
}

func TestImageSearchInput_Valid(t *testing.T) {
	t.Run("query", func(t *testing.T) {
		testcases := []struct {
			value string
			valid bool
		}{
			{"query", true},
			{"", false},
			{" ", false},
			{"      ", false},
		}
		for _, testcase := range testcases {
			ipt := buildImageSearchInput()
			ipt.Query = testcase.value
			err := ipt.Valid()
			if testcase.valid {
				assert.NoError(t, err)
			} else {
				assert.NotNil(t, err)
			}
		}
	})
}