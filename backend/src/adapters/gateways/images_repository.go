package gateways

import (
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/pkg/errors"
)

type ImagesRepository struct {
	config *ImagesRepositoryConfig
}

type ImagesRepositoryConfig struct {
	ImageSearchEngine infiface.ImageSearchEngine
}

func NewImagesRepository(cfg *ImagesRepositoryConfig) *ImagesRepository {
	return &ImagesRepository{config: cfg}
}

func (repo *ImagesRepository) Search(q string) (entities.Images, error) {
	imgs, err := repo.config.ImageSearchEngine.Search(q)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return imgs, nil
}
