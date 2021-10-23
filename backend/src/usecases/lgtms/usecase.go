package lgtms

import (
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/koki-develop/lgtm-generator/backend/src/usecases"
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

func (uc *Usecase) FindAll(ipt *entities.LGTMsFindAllInput) (entities.LGTMs, error) {
	var lmt int64 = 100
	if ipt.Limit != nil && *ipt.Limit >= 0 {
		lmt = *ipt.Limit
	}

	if ipt.After != "" {
		lgtms, err := uc.config.LGTMsRepository.FindAllAfter(ipt.After, lmt)
		if err != nil {
			return nil, errors.WithStack(err)
		}
		return lgtms, nil
	}

	lgtms, err := uc.config.LGTMsRepository.FindAll(lmt)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return lgtms, nil
}

func (uc *Usecase) Create(ipt *entities.LGTMCreateInput) (*entities.LGTM, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}
	if ipt.Base64 != nil {
		lgtm, err := uc.config.LGTMsRepository.CreateFromBase64(*ipt.Base64, ipt.ContentType)
		if err != nil {
			return nil, errors.WithStack(err)
		}
		return lgtm, nil
	}
	if ipt.URL != nil {
		lgtm, err := uc.config.LGTMsRepository.CreateFromURL(*ipt.URL)
		if err != nil {
			return nil, errors.WithStack(err)
		}
		return lgtm, nil
	}

	return nil, errors.WithStack(entities.ErrInvalidParameter)
}

func (uc *Usecase) Delete(ipt *entities.LGTMDeleteInput) error {
	if err := uc.config.LGTMsRepository.Delete(ipt.ID); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
