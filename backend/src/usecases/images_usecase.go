package usecases

import (
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/gateways/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type ImagesUsecase struct {
	config *ImagesUsecaseConfig
}

type ImagesUsecaseConfig struct {
	ImagesRepository iface.ImagesRepository
}

func NewImagesUsecase(cfg *ImagesUsecaseConfig) *ImagesUsecase {
	return &ImagesUsecase{config: cfg}
}

func (uc *ImagesUsecase) Search(ipt *entities.ImagesSearchInput) (entities.Images, error) {
	if err := ipt.Valid(); err != nil {
		return nil, errors.Wrap(entities.ErrInvalidParameter, err.Error())
	}
	imgs, err := uc.config.ImagesRepository.Search(ipt.Query)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return imgs.FilterOnlyHTTPS(), nil
}
