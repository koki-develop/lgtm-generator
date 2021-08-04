package entities

import "time"

type LGTMStatus string

const (
	LGTMStatusOK      LGTMStatus = "ok"
	LGTMStatusPending LGTMStatus = "pending"
)

type LGTM struct {
	ID        string     `json:"id"`
	Status    LGTMStatus `json:"-"`
	CreatedAt time.Time  `json:"created_at"`
}

type LGTMs []*LGTM
