package entities

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func buildReportCreateInput() *ReportCreateInput {
	return &ReportCreateInput{
		LGTMID: "00000000-0000-0000-0000-000000000000",
		Type:   ReportTypeOther,
		Text:   "hello world",
	}
}

func Test_buildReportCreateInput(t *testing.T) {
	t.Run("return valid input", func(t *testing.T) {
		ipt := buildReportCreateInput()
		assert.Nil(t, ipt.Valid())
	})
}

func TestReportType_Valid(t *testing.T) {
	testcases := []struct {
		value ReportType
		valid bool
	}{
		{"illegal", true},
		{"inappropriate", true},
		{"other", true},
		{"invalid", false},
		{"hoge", false},
		{"fuga", false},
	}
	for _, testcase := range testcases {
		err := testcase.value.Valid()
		if testcase.valid {
			assert.NoError(t, err)
		} else {
			assert.NotNil(t, err)
		}
	}
}

func TestReportCreateInput_Valid(t *testing.T) {
	t.Run("lgtm id", func(t *testing.T) {
		testcases := []struct {
			value string
			valid bool
		}{
			{"00000000-0000-0000-0000-000000000000", true},
			{"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", true},
			{"", false},
			{" ", false},
			{"      ", false},
			{"invalid_id", false},
			{"AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA", false},
		}
		for _, testcase := range testcases {
			ipt := buildReportCreateInput()
			ipt.LGTMID = testcase.value
			err := ipt.Valid()
			if testcase.valid {
				assert.NoError(t, err)
			} else {
				assert.NotNil(t, err)
			}
		}
	})

	t.Run("type", func(t *testing.T) {
		testcases := []struct {
			value ReportType
			valid bool
		}{
			{"illegal", true},
			{"inappropriate", true},
			{"other", true},
			{"", false},
			{"invalid type", false},
		}
		for _, testcase := range testcases {
			ipt := buildReportCreateInput()
			ipt.Type = testcase.value
			err := ipt.Valid()
			if testcase.valid {
				assert.NoError(t, err)
			} else {
				assert.NotNil(t, err)
			}
		}
	})

	t.Run("text", func(t *testing.T) {
		testcases := []struct {
			value string
			valid bool
		}{
			{"", true},
			{strings.Repeat("a", 100), true},
			{strings.Repeat("a", 999), true},
			{strings.Repeat("a", 1000), true},
			{strings.Repeat("あ", 100), true},
			{strings.Repeat("あ", 999), true},
			{strings.Repeat("あ", 1000), true},
			{strings.Repeat("a", 1001), false},
			{strings.Repeat("a", 1002), false},
			{strings.Repeat("a", 2000), false},
			{strings.Repeat("あ", 1001), false},
			{strings.Repeat("あ", 1002), false},
			{strings.Repeat("あ", 2000), false},
		}
		for _, testcase := range testcases {
			ipt := buildReportCreateInput()
			ipt.Text = testcase.value
			err := ipt.Valid()
			if testcase.valid {
				assert.NoError(t, err)
			} else {
				assert.NotNil(t, err)
			}
		}
	})
}
