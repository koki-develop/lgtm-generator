package lgtms

import (
	"fmt"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/utils"
	"github.com/pkg/errors"
)

type Repository struct {
	config *RepositoryConfig
}

type RepositoryConfig struct {
	LGTMGenerator gateways.LGTMGenerator
	DynamoDB      gateways.DynamoDB
	DBPrefix      string
	FileStorage   gateways.FileStorage
}

func NewRepository(cfg *RepositoryConfig) *Repository {
	return &Repository{config: cfg}
}

func (repo *Repository) Find(id string) (*entities.LGTM, error) {
	var lgtms entities.LGTMs

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Get("id", id).All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}
	if len(lgtms) == 0 {
		return nil, errors.WithStack(entities.ErrResourceNotFound)
	}

	return lgtms[0], nil
}

func (repo *Repository) FindAll(limit int64) (entities.LGTMs, error) {
	var lgtms entities.LGTMs

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(gateways.DynamoDBOrderDesc).Limit(limit).All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}
	return lgtms, nil
}

func (repo *Repository) FindAllAfter(id string, limit int64) (entities.LGTMs, error) {
	lgtm, err := repo.Find(id)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	key, err := dynamodbattribute.MarshalMap(lgtm)
	if err != nil {
		return nil, errors.WithStack(err)
	}

	var lgtms entities.LGTMs
	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(gateways.DynamoDBOrderDesc).Limit(limit).StartFrom(key).All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}
	return lgtms, nil
}

func (repo *Repository) Create(src []byte, contentType string) (*entities.LGTM, error) {
	id := utils.UUIDV4()
	now := time.Now()

	lgtm := &entities.LGTM{
		ID:        id,
		Status:    entities.LGTMStatusPending,
		CreatedAt: now,
	}

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Put(&lgtm).Run(); err != nil {
		return nil, errors.WithStack(err)
	}

	lgtmsrc, err := repo.config.LGTMGenerator.Generate(src)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	if err := repo.config.FileStorage.Save(lgtm.ID, contentType, lgtmsrc); err != nil {
		return nil, errors.WithStack(err)
	}

	if err := tbl.Update("id", lgtm.ID).Range("created_at", lgtm.CreatedAt).Set("status", entities.LGTMStatusOK).Run(); err != nil {
		return nil, errors.WithStack(err)
	}

	return lgtm, nil
}
