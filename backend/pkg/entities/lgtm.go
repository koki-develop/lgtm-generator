package entities

import (
	"strings"
	"time"

	"github.com/koki-develop/lgtm-generator/backend/pkg/utils"
)

type LGTMStatus string

const (
	LGTMStatusOK       LGTMStatus = "ok"
	LGTMStatusPending  LGTMStatus = "pending"
	LGTMStatusDeleting LGTMStatus = "deleting"
)

type LGTMImage struct {
	Data        []byte
	ContentType string
}

type LGTM struct {
	ID        string     `json:"id" dynamo:"id"         dynamodbav:"id"`
	Status    LGTMStatus `json:"-"  dynamo:"status"     dynamodbav:"status"`
	CreatedAt time.Time  `json:"-"  dynamo:"created_at" dynamodbav:"created_at"`
}

type LGTMs []*LGTM

type LGTMCreateFrom string

const (
	LGTMCreateFromURL    LGTMCreateFrom = "URL"
	LGTMCreateFromBase64 LGTMCreateFrom = "BASE64"
)

type LGTMCreateInput struct {
	URL         string `json:"url"`
	Base64      string `json:"base64"`
	ContentType string `json:"content_type"`
	From        LGTMCreateFrom
}

func (ipt *LGTMCreateInput) Valid() bool {
	if strings.TrimSpace(ipt.URL) != "" {
		if !utils.IsURL(ipt.URL) {
			return false
		}
		ipt.From = LGTMCreateFromURL
		return true
	}
	if strings.TrimSpace(ipt.Base64) != "" {
		if !utils.IsBase64(ipt.Base64) {
			return false
		}
		if strings.TrimSpace(ipt.ContentType) == "" {
			return false
		}
		ipt.From = LGTMCreateFromBase64
		return true
	}
	return false
}

func (ipt *LGTMCreateInput) Source() string {
	switch ipt.From {
	case LGTMCreateFromBase64:
		return ipt.Base64
	case LGTMCreateFromURL:
		return ipt.URL
	default:
		return ""
	}
}

type LGTMFindAllInput struct {
	After *string `form:"after"`
}
