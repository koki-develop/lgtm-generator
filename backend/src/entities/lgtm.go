package entities

import "time"

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
