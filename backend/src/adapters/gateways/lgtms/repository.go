package lgtms

import (
	"fmt"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type Repository struct {
	config *RepositoryConfig
}

type RepositoryConfig struct {
	DynamoDB gateways.DynamoDB
	DBPrefix string
}

func NewRepository(cfg *RepositoryConfig) *Repository {
	return &Repository{config: cfg}
}

func (repo *Repository) FindAll() (entities.LGTMs, error) {
	var lgtms entities.LGTMs

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(gateways.OrderDesc).Limit(20).All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}
	return lgtms, nil
}

func (repo *Repository) Create(src []byte) (*entities.LGTM, error) {
	return &entities.LGTM{}, nil
}
