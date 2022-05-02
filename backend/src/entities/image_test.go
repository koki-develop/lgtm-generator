package entities

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func buildImageSearchInput() *ImagesSearchInput {
	return &ImagesSearchInput{Query: "query"}
}

func Test_buildImageSearchInput(t *testing.T) {
	t.Run("return valid input", func(t *testing.T) {
		ipt := buildImageSearchInput()
		assert.NoError(t, ipt.Valid())
	})
}

func TestImages_FilterOnlyHTTPS(t *testing.T) {
	t.Run("return only https images", func(t *testing.T) {
		imgs := Images{
			{URL: "https://example.com/1"},
			{URL: "http://example.com/2"},
			{URL: "https://example.com/3"},
			{URL: "http://example.com/4"},
			{URL: "INVALID_URL"},
		}
		assert.Equal(t, Images{
			{URL: "https://example.com/1"},
			{URL: "https://example.com/3"},
		}, imgs.FilterOnlyHTTPS())
	})
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
