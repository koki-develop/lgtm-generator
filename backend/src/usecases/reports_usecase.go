package usecases

import (
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/gateways/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type ReportsUsecase struct {
	config *ReportsUsecaseConfig
}

type ReportsUsecaseConfig struct {
	ReportsRepository iface.ReportsRepository
	LGTMsRepository   iface.LGTMsRepository
	Notifier          iface.Notifier
}

func NewReportsUsecase(cfg *ReportsUsecaseConfig) *ReportsUsecase {
	return &ReportsUsecase{config: cfg}
}

func (uc *ReportsUsecase) Create(ipt *entities.ReportCreateInput) (*entities.Report, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}

	if _, err := uc.config.LGTMsRepository.Find(ipt.LGTMID); err != nil {
		if errors.Is(err, entities.ErrResourceNotFound) {
			return nil, errors.WithStack(entities.ErrInvalidParameter)
		}
		return nil, errors.WithStack(err)
	}

	rpt := entities.Report{
		LGTMID: ipt.LGTMID,
		Type:   ipt.Type,
		Text:   ipt.Text,
	}

	if err := uc.config.ReportsRepository.Create(&rpt); err != nil {
		return nil, errors.WithStack(err)
	}

	if err := uc.config.Notifier.NotifyReport(&rpt); err != nil {
		return nil, errors.WithStack(err)
	}

	return &rpt, nil
}
