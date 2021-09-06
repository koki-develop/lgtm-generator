package entities

import (
	"net/url"
	"regexp"
	"strings"
	"time"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/utils"
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
	URL         *string `json:"url"`
}

func (ipt *LGTMCreateInput) Valid() error {
	if ipt.Base64 == nil && ipt.URL == nil {
		return errors.New("image source is empty")
	}
	if ipt.Base64 != nil {
		if ipt.ContentType == "" {
			return errors.New("content type is empty")
		}
		if !regexp.MustCompile(`\Aimage/.+\z`).Match([]byte(ipt.ContentType)) {
			return errors.Errorf("invalid content type: %s", ipt.ContentType)
		}
		if strings.TrimSpace(*ipt.Base64) == "" {
			return errors.New("base64 is empty")
		}
		if _, err := utils.Base64Decode(*ipt.Base64); err != nil {
			return errors.New("invalid base64 format")
		}
	}
	if ipt.URL != nil {
		if strings.TrimSpace(*ipt.URL) == "" {
			return errors.New("url is empty")
		}
		if _, err := url.ParseRequestURI(*ipt.URL); err != nil {
			return errors.New("invalid url format")
		}
	}
	return nil
}
