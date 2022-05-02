package entities

import (
	"strings"
	"time"
	"unicode/utf8"

	"github.com/koki-develop/lgtm-generator/backend/src/utils"
	"github.com/pkg/errors"
)

type ReportType string

func (t ReportType) Valid() error {
	switch t {
	case ReportTypeIllegal, ReportTypeInappropriate, ReportTypeOther:
		return nil
	default:
		return errors.Errorf("invalid report type: %s", t)
	}
}

const (
	ReportTypeIllegal       ReportType = "illegal"
	ReportTypeInappropriate ReportType = "inappropriate"
	ReportTypeOther         ReportType = "other"
)

type Report struct {
	ID        string     `json:"id"         dynamo:"id"`
	LGTMID    string     `json:"lgtm_id"    dynamo:"lgtm_id"`
	Type      ReportType `json:"type"       dynamo:"type"`
	Text      string     `json:"text"       dynamo:"text"`
	CreatedAt time.Time  `json:"created_at" dynamo:"created_at"`
}

type ReportCreateInput struct {
	LGTMID string     `json:"lgtm_id"`
	Type   ReportType `json:"type"`
	Text   string     `json:"text"`
}

func (ipt *ReportCreateInput) Valid() error {
	// lgtm id
	if strings.TrimSpace(ipt.LGTMID) == "" {
		return errors.New("lgtm id is required")
	}
	if !utils.IsLowerUUID(ipt.LGTMID) {
		return errors.Errorf("invalid lgtm id format: %s", ipt.LGTMID)
	}

	// type
	if strings.TrimSpace(string(ipt.Type)) == "" {
		return errors.New("type is required")
	}
	if err := ipt.Type.Valid(); err != nil {
		return errors.WithStack(err)
	}

	// text
	if utf8.RuneCountInString(ipt.Text) > 1000 {
		return errors.New("text too long")
	}

	return nil
}
