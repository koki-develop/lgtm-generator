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
	LGTMsRepository usecases.LGTMsRepository
}

func NewUsecase(cfg *UsecaseConfig) *Usecase {
	return &Usecase{config: cfg}
}

func (uc *Usecase) Create(ipt *entities.ReportCreateInput) (*entities.Report, error) {
	rpt := &entities.Report{
		LGTMID: ipt.LGTMID,
		Type:   ipt.Type,
		Text:   ipt.Text,
	}

	if !rpt.Type.IsValid() {
		return nil, errors.WithStack(entities.ErrInvalidParameter)
	}
	if _, err := uc.config.LGTMsRepository.Find(rpt.LGTMID); err != nil {
		if errors.Is(err, entities.ErrNotFound) {
			return nil, errors.WithStack(entities.ErrInvalidParameter)
		}
		return nil, errors.WithStack(err)
	}
	if len(ipt.Text) > 1000 {
		return nil, errors.WithStack(entities.ErrInvalidParameter)
	}

	return rpt, nil
}
