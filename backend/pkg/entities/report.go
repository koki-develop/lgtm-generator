package entities

import (
	"strings"
	"time"
	"unicode/utf8"
)

type ReportType string

const (
	ReportTypeIllegal       ReportType = "illegal"
	ReportTypeInappropriate ReportType = "inappropriate"
	ReportTypeOther         ReportType = "other"
)

func (t ReportType) Valid() bool {
	switch t {
	case ReportTypeIllegal, ReportTypeInappropriate, ReportTypeOther:
		return true
	default:
		return false
	}
}

type Report struct {
	ID        string     `json:"id" dynamo:"id"`
	LGTMID    string     `json:"-"  dynamo:"lgtm_id"`
	Type      ReportType `json:"-"  dynamo:"type"`
	Text      string     `json:"-"  dynamo:"text"`
	CreatedAt time.Time  `json:"-"  dynamo:"created_at"`
}

type ReportCreateInput struct {
	LGTMID string     `json:"lgtm_id"`
	Type   ReportType `json:"type"`
	Text   string     `json:"text"`
}

func (ipt *ReportCreateInput) Valid() bool {
	// lgtm id
	if strings.TrimSpace(ipt.LGTMID) == "" {
		return false
	}

	// type
	if strings.TrimSpace(string(ipt.Type)) == "" {
		return false
	}
	if !ipt.Type.Valid() {
		return false
	}

	// text
	if utf8.RuneCountInString(ipt.Text) > 1000 {
		return false
	}

	return true
}
