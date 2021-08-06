package usecases

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type ReportsRepository interface {
	Create(rpt *entities.Report) error
}
