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

type LGTMCreateInput struct {
	URL string `json:"url"`
}

func (ipt *LGTMCreateInput) Valid() bool {
	if strings.TrimSpace(ipt.URL) == "" {
		return false
	}
	if !utils.IsURL(ipt.URL) {
		return false
	}
	return true
}
