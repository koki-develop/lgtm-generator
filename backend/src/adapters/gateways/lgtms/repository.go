package lgtms

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type Repository struct {
	config *RepositoryConfig
}

type RepositoryConfig struct {
}

func NewRepository(cfg *RepositoryConfig) *Repository {
	return &Repository{config: cfg}
}

func (repo *Repository) Create(src []byte) (entities.LGTM, error) {
	return entities.LGTM{}, nil
}
