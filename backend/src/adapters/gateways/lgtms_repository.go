package gateways

import (
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/utils"
	"github.com/pkg/errors"
)

type LGTMsRepository struct {
	config *LGTMsRepositoryConfig
}

type LGTMsRepositoryConfig struct {
	LGTMGenerator infiface.LGTMGenerator
	DynamoDB      infiface.DynamoDB
	DBPrefix      string
	FileStorage   infiface.FileStorage
	HTTPAPI       infiface.HTTPAPI
}

func NewLGTMsRepository(cfg *LGTMsRepositoryConfig) *LGTMsRepository {
	return &LGTMsRepository{config: cfg}
}

func (repo *LGTMsRepository) Find(id string) (*entities.LGTM, error) {
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

func (repo *LGTMsRepository) FindAll(limit int64) (entities.LGTMs, error) {
	lgtms := entities.LGTMs{}

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(infiface.DynamoDBOrderDesc).Limit(limit).All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}
	return lgtms, nil
}

func (repo *LGTMsRepository) FindAllAfter(id string, limit int64) (entities.LGTMs, error) {
	lgtm, err := repo.Find(id)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	key, err := dynamodbattribute.MarshalMap(lgtm)
	if err != nil {
		return nil, errors.WithStack(err)
	}

	lgtms := entities.LGTMs{}
	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(infiface.DynamoDBOrderDesc).Limit(limit).StartFrom(key).All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}
	return lgtms, nil
}

func (repo *LGTMsRepository) CreateFromBase64(base64, contentType string) (*entities.LGTM, error) {
	src, err := utils.Base64Decode(base64)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return repo.Create(src, contentType)
}

func (repo *LGTMsRepository) CreateFromURL(url string) (*entities.LGTM, error) {
	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	resp, err := repo.config.HTTPAPI.Do(req)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	defer resp.Body.Close()
	src, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, errors.WithStack(err)
	}

	return repo.Create(src, resp.Header.Get("Content-Type"))
}

func (repo *LGTMsRepository) Create(src []byte, contentType string) (*entities.LGTM, error) {
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

func (repo *LGTMsRepository) Delete(id string) error {
	lgtm, err := repo.Find(id)
	if err != nil {
		return errors.WithStack(err)
	}

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.config.DBPrefix))
	if err := tbl.Update("id", lgtm.ID).Range("created_at", lgtm.CreatedAt).Set("status", entities.LGTMStatusDeleting).Run(); err != nil {
		return errors.WithStack(err)
	}
	if err := repo.config.FileStorage.Delete(lgtm.ID); err != nil {
		return errors.WithStack(err)
	}
	if err := tbl.Delete("id", lgtm.ID).Range("created_at", lgtm.CreatedAt).Run(); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
