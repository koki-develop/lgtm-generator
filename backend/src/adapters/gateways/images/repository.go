package images

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type Repository struct {
	config *RepositoryConfig
}

type RepositoryConfig struct {
	ImageSearchEngine gateways.ImageSearchEngine
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
