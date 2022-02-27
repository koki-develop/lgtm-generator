package entities

import (
	"testing"

	"github.com/koki-develop/lgtm-generator/backend/src/utils"
	"github.com/stretchr/testify/assert"
)

func buildLGTMCreateInputWithURL() *LGTMCreateInput {
	return &LGTMCreateInput{URL: utils.StringPtr("https://example.com")}
}

func buildLGTMCreateInputWithBase64() *LGTMCreateInput {
	return &LGTMCreateInput{
		Base64:      utils.StringPtr("aGVsbG8gd29ybGQ="),
		ContentType: utils.StringPtr("image/png"),
	}
}

func Test_buildLGTMCreateInputWithURL(t *testing.T) {
	t.Run("return valid input", func(t *testing.T) {
		ipt := buildLGTMCreateInputWithURL()
		assert.NoError(t, ipt.Valid())
	})
}

func Test_buildLGTMCreateInputWithBase64(t *testing.T) {
	t.Run("return valid input", func(t *testing.T) {
		ipt := buildLGTMCreateInputWithBase64()
		assert.NoError(t, ipt.Valid())
	})
}

func TestLGTMCreateInput_Valid(t *testing.T) {
	t.Run("return error when base64 and url are nil", func(t *testing.T) {
		ipts := []*LGTMCreateInput{
			{nil, nil, nil},
			{nil, nil, utils.StringPtr(("image/png"))},
		}
		for _, ipt := range ipts {
			assert.NotNil(t, ipt.Valid())
		}
	})
	t.Run("return error when both base64 and url are specified", func(t *testing.T) {
		ipts := []*LGTMCreateInput{
			{utils.StringPtr("https://example.com"), utils.StringPtr("aGVsbG8gd29ybGQ="), nil},
			{utils.StringPtr("https://example.com"), utils.StringPtr("aGVsbG8gd29ybGQ="), utils.StringPtr("image/png")},
		}
		for _, ipt := range ipts {
			assert.NotNil(t, ipt.Valid())
		}
	})
	t.Run("when base64 is specified", func(t *testing.T) {
		t.Run("base64", func(t *testing.T) {
			testcases := []struct {
				value *string
				valid bool
			}{
				{utils.StringPtr("aGVsbG8gd29ybGQ="), true},
				{utils.StringPtr(""), false},
				{utils.StringPtr(" "), false},
				{utils.StringPtr("      "), false},
				{utils.StringPtr("invalid base64"), false},
			}
			for _, testcase := range testcases {
				ipt := buildLGTMCreateInputWithBase64()
				ipt.Base64 = testcase.value
				err := ipt.Valid()
				if testcase.valid {
					assert.NoError(t, err)
				} else {
					assert.NotNil(t, err)
				}
			}
		})
		t.Run("content type", func(t *testing.T) {
			testcases := []struct {
				value *string
				valid bool
			}{
				{utils.StringPtr("image/png"), true},
				{utils.StringPtr("image/jpeg"), true},
				{utils.StringPtr("image/gif"), true},
				{utils.StringPtr("image/webp"), true},
				{utils.StringPtr(""), false},
				{utils.StringPtr(" "), false},
				{utils.StringPtr("      "), false},
				{utils.StringPtr("text/html"), false},
				{utils.StringPtr("application/json"), false},
			}
			for _, testcase := range testcases {
				ipt := buildLGTMCreateInputWithBase64()
				ipt.ContentType = testcase.value
				err := ipt.Valid()
				if testcase.valid {
					assert.NoError(t, err)
				} else {
					assert.NotNil(t, err)
				}
			}
		})
	})
	t.Run("when url is specified", func(t *testing.T) {
		t.Run("content type", func(t *testing.T) {
			testcases := []struct {
				value *string
				valid bool
			}{
				{nil, true},
				{utils.StringPtr("image/png"), false},
				{utils.StringPtr("image/jpeg"), false},
				{utils.StringPtr("image/gif"), false},
				{utils.StringPtr("image/webp"), false},
				{utils.StringPtr(""), false},
				{utils.StringPtr(" "), false},
				{utils.StringPtr("      "), false},
				{utils.StringPtr("text/html"), false},
				{utils.StringPtr("application/json"), false},
			}
			for _, testcase := range testcases {
				ipt := buildLGTMCreateInputWithURL()
				ipt.ContentType = testcase.value
				err := ipt.Valid()
				if testcase.valid {
					assert.NoError(t, err)
				} else {
					assert.NotNil(t, err)
				}
			}
		})
		t.Run("url", func(t *testing.T) {
			testcases := []struct {
				value *string
				valid bool
			}{
				{utils.StringPtr("https://example.com"), true},
				{utils.StringPtr("https://example.com/"), true},
				{utils.StringPtr("https://example.com/aaa"), true},
				{utils.StringPtr("https://example.com/aaa/"), true},
				{utils.StringPtr("https://example.com/aaa?bbb=ccc&ddd=eee"), true},
				{utils.StringPtr("https://example.com/aaa#bbb"), true},
				{utils.StringPtr("http://example.com"), false},
				{utils.StringPtr("http://example.com/"), false},
				{utils.StringPtr("http://example.com/aaa"), false},
				{utils.StringPtr("http://example.com/aaa/"), false},
				{utils.StringPtr("http://example.com/aaa?bbb=ccc&ddd=eee"), false},
				{utils.StringPtr("http://example.com/aaa#bbb"), false},
				{utils.StringPtr(""), false},
				{utils.StringPtr(" "), false},
				{utils.StringPtr("      "), false},
				{utils.StringPtr("invalid url"), false},
				{utils.StringPtr("example.com"), false},
			}
			for _, testcase := range testcases {
				ipt := buildLGTMCreateInputWithURL()
				ipt.URL = testcase.value
				err := ipt.Valid()
				if testcase.valid {
					assert.NoError(t, err)
				} else {
					assert.NotNil(t, err)
				}
			}
		})
	})
}
