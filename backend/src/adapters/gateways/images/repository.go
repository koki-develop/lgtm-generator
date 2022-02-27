package images

import (
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/pkg/errors"
)

type Repository struct {
	config *RepositoryConfig
}

type RepositoryConfig struct {
	ImageSearchEngine infiface.ImageSearchEngine
}

func NewRepository(cfg *RepositoryConfig) *Repository {
	return &Repository{config: cfg}
}

func (repo *Repository) Search(q string) (entities.Images, error) {
	imgs, err := repo.config.ImageSearchEngine.Search(q)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return imgs, nil
}
