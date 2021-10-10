package usecases

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type ReportsRepository interface {
	Create(rpt *entities.Report) error
}
