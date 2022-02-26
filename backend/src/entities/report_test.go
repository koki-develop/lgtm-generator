package entities

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestReportType_Valid(t *testing.T) {
	t.Run("return nil when valid report type", func(t *testing.T) {
		typs := []ReportType{
			"illegal",
			"inappropriate",
			"other",
		}
		for _, tp := range typs {
			assert.Nil(t, tp.Valid())
		}
	})
	t.Run("return error when invalid report type", func(t *testing.T) {
		typs := []ReportType{
			"invalid",
			"hoge",
			"fuga",
		}
		for _, tp := range typs {
			err := tp.Valid()
			assert.NotNil(t, err)
			assert.EqualError(t, err, fmt.Sprintf("invalid report type: %s", tp))
		}
	})
}
