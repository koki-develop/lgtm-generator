package entities

import "time"

type LGTMStatus string

const (
	LGTMStatusOK       LGTMStatus = "ok"
	LGTMStatusPending  LGTMStatus = "pending"
	LGTMStatusDeleting LGTMStatus = "deleting"
)

type LGTM struct {
	ID        string     `json:"id" dynamo:"id"         dynamodbav:"id"`
	Status    LGTMStatus `json:"-"  dynamo:"status"     dynamodbav:"status"`
	CreatedAt time.Time  `json:"-"  dynamo:"created_at" dynamodbav:"created_at"`
}

type LGTMs []*LGTM
