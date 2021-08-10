package entities

import (
	"regexp"
	"time"

	"github.com/pkg/errors"
)

type LGTMStatus string

const (
	LGTMStatusOK      LGTMStatus = "ok"
	LGTMStatusPending LGTMStatus = "pending"
)

type LGTM struct {
	ID        string     `json:"id"         dynamo:"id"         dynamodbav:"id"`
	Status    LGTMStatus `json:"-"          dynamo:"status"     dynamodbav:"status"`
	CreatedAt time.Time  `json:"created_at" dynamo:"created_at" dynamodbav:"created_at"`
}

type LGTMs []*LGTM

type LGTMsFindAllInput struct {
	Limit *int64 `form:"limit"`
	After string `form:"after"`
}

type LGTMCreateInput struct {
	ContentType string  `json:"content_type"`
	Base64      *string `json:"base64"`
}

func (ipt *LGTMCreateInput) Valid() error {
	if ipt.ContentType == "" {
		return errors.New("content type is empty")
	}
	if !regexp.MustCompile(`\Aimage/.+\z`).Match([]byte(ipt.ContentType)) {
		return errors.Errorf("invalid content type: %s", ipt.ContentType)
	}
	if ipt.Base64 != nil {
		if *ipt.Base64 == "" {
			return errors.New("base64 is empty")
		}
		return nil
	}

	return errors.New("image source is empty")
}
