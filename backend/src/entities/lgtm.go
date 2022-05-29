package entities

import (
	"net/url"
	"regexp"
	"strings"
	"time"

	"github.com/koki-develop/lgtm-generator/backend/src/utils"
	"github.com/pkg/errors"
)

type LGTMStatus string

const (
	LGTMStatusOK       LGTMStatus = "ok"
	LGTMStatusPending  LGTMStatus = "pending"
	LGTMStatusDeleting LGTMStatus = "deleting"
)

type LGTM struct {
	ID        string     `json:"id"         dynamo:"id"         dynamodbav:"id"`
	Status    LGTMStatus `json:"-"          dynamo:"status"     dynamodbav:"status"`
	CreatedAt time.Time  `json:"-" dynamo:"created_at" dynamodbav:"created_at"`
}

type LGTMs []*LGTM

type LGTMsFindAllInput struct {
	Limit  *int64  `form:"limit"`
	After  *string `form:"after"`
	Random bool    `form:"random"`
}

func (ipt *LGTMsFindAllInput) Valid() error {
	if ipt.After != nil {
		if !utils.IsLowerUUID(*ipt.After) {
			return errors.Errorf("invalid lgtm id format: %s", *ipt.After)
		}
	}
	return nil
}

type LGTMCreateInput struct {
	ContentType *string `json:"content_type"`
	Base64      *string `json:"base64"`
	URL         *string `json:"url"`
}

func (ipt *LGTMCreateInput) Valid() error {
	if ipt.Base64 == nil && ipt.URL == nil {
		return errors.New("either url or base64 is required")
	}
	if ipt.Base64 != nil && ipt.URL != nil {
		return errors.New("only one of url and base64 should be specified")
	}

	if ipt.Base64 != nil {
		if strings.TrimSpace(*ipt.Base64) == "" {
			return errors.New("base64 is required")
		}
		if _, err := utils.Base64Decode(*ipt.Base64); err != nil {
			return errors.New("invalid base64 format")
		}
		if ipt.ContentType == nil || strings.TrimSpace(*ipt.ContentType) == "" {
			return errors.New("content type is required")
		}
		if !regexp.MustCompile(`\Aimage/.+\z`).Match([]byte(*ipt.ContentType)) {
			return errors.Errorf("invalid content type: %s", *ipt.ContentType)
		}
	}

	if ipt.URL != nil {
		if ipt.ContentType != nil {
			return errors.New("content type cannot be specified when url is specified")
		}
		if strings.TrimSpace(*ipt.URL) == "" {
			return errors.New("url is required")
		}
		u, err := url.ParseRequestURI(*ipt.URL)
		if err != nil {
			return errors.New("invalid url format")
		}
		if u.Scheme != "https" {
			return errors.New("url scheme is only valid for https")
		}
	}
	return nil
}

type LGTMDeleteInput struct {
	ID string
}
