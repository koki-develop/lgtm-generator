package usecases

import (
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/gateways/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type LGTMsUsecase struct {
	config *LGTMsUsecaseConfig
}

type LGTMsUsecaseConfig struct {
	LGTMsRepository iface.LGTMsRepository
}

func NewLGTMsUsecase(cfg *LGTMsUsecaseConfig) *LGTMsUsecase {
	return &LGTMsUsecase{config: cfg}
}

func (uc *LGTMsUsecase) FindAll(ipt *entities.LGTMsFindAllInput) (entities.LGTMs, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}

	var lmt int64 = 100
	if ipt.Limit != nil && *ipt.Limit >= 0 {
		lmt = *ipt.Limit
	}

	if ipt.Random {
		lgtms, err := uc.config.LGTMsRepository.FindRandomly(lmt)
		if err != nil {
			return nil, errors.WithStack(err)
		}
		return lgtms, nil
	}

	if ipt.After != nil {
		lgtms, err := uc.config.LGTMsRepository.FindAllAfter(*ipt.After, lmt)
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

func (uc *LGTMsUsecase) Create(ipt *entities.LGTMCreateInput) (*entities.LGTM, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}
	if ipt.Base64 != nil {
		lgtm, err := uc.config.LGTMsRepository.CreateFromBase64(*ipt.Base64, *ipt.ContentType)
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

func (uc *LGTMsUsecase) Delete(ipt *entities.LGTMDeleteInput) error {
	if err := uc.config.LGTMsRepository.Delete(ipt.ID); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
