package usecases

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type Notifier interface {
	NotifyReport(rpt *entities.Report) error
}
