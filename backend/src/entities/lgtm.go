package entities

import (
	"regexp"
	"time"
)

type LGTMStatus string

const (
	LGTMStatusOK      LGTMStatus = "ok"
	LGTMStatusPending LGTMStatus = "pending"
)

type LGTM struct {
	ID        string     `json:"id"         dynamo:"id"`
	Status    LGTMStatus `json:"-"          dynamo:"status"`
	CreatedAt time.Time  `json:"created_at" dynamo:"created_at"`
}

type LGTMs []*LGTM

type LGTMCreateInput struct {
	ContentType string  `json:"content_type"`
	Base64      *string `json:"base64"`
}

func (ipt *LGTMCreateInput) IsValid() bool {
	if ipt.ContentType == "" {
		return false
	}
	if !regexp.MustCompile(`\Aimage/.+\z`).Match([]byte(ipt.ContentType)) {
		return false
	}
	if ipt.Base64 != nil {
		if *ipt.Base64 == "" {
			return false
		}
		return true
	}

	return false
}
