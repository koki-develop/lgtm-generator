package lgtms

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/usecases"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/utils"
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
	if ipt.After != "" {
		lgtms, err := uc.config.LGTMsRepository.FindAllAfter(ipt.After)
		if err != nil {
			return nil, errors.WithStack(err)
		}
		return lgtms, nil
	}

	lgtms, err := uc.config.LGTMsRepository.FindAll()
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
		src, err := utils.Base64Decode(*ipt.Base64)
		if err != nil {
			return nil, errors.WithStack(entities.ErrInvalidParameter)
		}
		lgtm, err := uc.config.LGTMsRepository.Create(src, ipt.ContentType)
		if err != nil {
			return nil, errors.WithStack(err)
		}
		return lgtm, nil
	}

	return nil, errors.WithStack(entities.ErrInvalidParameter)
}
