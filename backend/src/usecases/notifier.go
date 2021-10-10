package usecases

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type Notifier interface {
	NotifyReport(rpt *entities.Report) error
}
