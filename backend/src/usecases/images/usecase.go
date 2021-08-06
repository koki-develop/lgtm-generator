package images

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/usecases"
	"github.com/pkg/errors"
)

type Usecase struct {
	config *UsecaseConfig
}

type UsecaseConfig struct {
	ImagesRepository usecases.ImagesRepository
}

func NewUsecase(cfg *UsecaseConfig) *Usecase {
	return &Usecase{config: cfg}
}

func (uc *Usecase) Search(ipt *entities.ImagesSearchInput) (entities.Images, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}
	imgs, err := uc.config.ImagesRepository.Search(ipt.Query)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return imgs, nil
}
