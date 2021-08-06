package reports

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/usecases"
	"github.com/pkg/errors"
)

type Usecase struct {
	config *UsecaseConfig
}

type UsecaseConfig struct {
	ReportsRepository usecases.ReportsRepository
	LGTMsRepository   usecases.LGTMsRepository
}

func NewUsecase(cfg *UsecaseConfig) *Usecase {
	return &Usecase{config: cfg}
}

func (uc *Usecase) Create(ipt *entities.ReportCreateInput) (*entities.Report, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}

	if _, err := uc.config.LGTMsRepository.Find(ipt.LGTMID); err != nil {
		if errors.Is(err, entities.ErrNotFound) {
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

	return &rpt, nil
}
