package entities

import "time"

type ReportType string

const (
	ReportTypeIllegal       ReportType = "illegal"
	ReportTypeInappropriate ReportType = "inappropriate"
	ReportTypeOther         ReportType = "other"
)

type Report struct {
	ID        string     `json:"id"`
	LGTMID    string     `json:"lgtm_id"`
	Type      ReportType `json:"created_at"`
	Text      string     `json:"type"`
	CreatedAt time.Time  `json:"text"`
}
