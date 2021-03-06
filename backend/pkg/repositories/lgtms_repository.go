package repositories

import (
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
	"github.com/guregu/dynamo"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/s3"
	"github.com/koki-develop/lgtm-generator/backend/pkg/utils"
	"github.com/pkg/errors"
)

type LGTMsRepository struct {
	S3API    s3.ClientAPI
	DynamoDB *dynamo.DB
	DBPrefix string
}

func NewLGTMsRepository(s3api s3.ClientAPI, db *dynamo.DB) *LGTMsRepository {
	return &LGTMsRepository{
		S3API:    s3api,
		DynamoDB: db,
		DBPrefix: fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
	}
}

func (repo *LGTMsRepository) Find(id string) (*entities.LGTM, bool, error) {
	var lgtms entities.LGTMs

	tbl := repo.getTable()
	if err := tbl.Get("id", id).All(&lgtms); err != nil {
		return nil, false, errors.WithStack(err)
	}
	if len(lgtms) == 0 {
		return nil, false, nil
	}

	return lgtms[0], true, nil
}

func (repo *LGTMsRepository) FindAll() (entities.LGTMs, error) {
	lgtms := entities.LGTMs{}

	tbl := repo.getTable()
	q := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(dynamo.Descending).Limit(20)
	if err := q.All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}

	return lgtms, nil
}

func (repo *LGTMsRepository) FindRandomly() (entities.LGTMs, error) {
	keys, err := repo.S3API.List()
	if err != nil {
		return nil, err
	}

	utils.Shuffle(keys)
	if len(keys) > 20 {
		keys = keys[:20]
	}

	lgtms := entities.LGTMs{}
	for _, k := range keys {
		lgtms = append(lgtms, &entities.LGTM{ID: k})
	}
	return lgtms, nil
}

func (repo *LGTMsRepository) FindAllAfter(lgtm *entities.LGTM) (entities.LGTMs, error) {
	key, err := dynamodbattribute.MarshalMap(lgtm)
	if err != nil {
		return nil, errors.WithStack(err)
	}

	lgtms := entities.LGTMs{}
	tbl := repo.getTable()
	q := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(dynamo.Descending).Limit(20).StartFrom(key)
	if err := q.All(&lgtms); err != nil {
		return nil, errors.WithStack(err)
	}

	return lgtms, nil
}

func (repo *LGTMsRepository) Create(img *entities.LGTMImage) (*entities.LGTM, error) {
	now := time.Now()
	id := utils.UUIDV4()

	lgtm := &entities.LGTM{ID: id, Status: entities.LGTMStatusPending, CreatedAt: now}

	tbl := repo.getTable()
	if err := tbl.Put(&lgtm).Run(); err != nil {
		return nil, errors.WithStack(err)
	}

	if err := repo.S3API.Put(lgtm.ID, img.ContentType, img.Data); err != nil {
		return nil, err
	}

	lgtm.Status = entities.LGTMStatusOK
	upd := tbl.Update("id", lgtm.ID).Range("created_at", lgtm.CreatedAt)
	if err := upd.Set("status", lgtm.Status).Run(); err != nil {
		return nil, errors.WithStack(err)
	}

	return lgtm, nil
}

func (repo *LGTMsRepository) Delete(id string) error {
	lgtm, ok, err := repo.Find(id)
	if err != nil {
		return err
	}
	if !ok {
		return errors.Errorf("lgtm not found: %s", id)
	}

	tbl := repo.getTable()
	upd := tbl.Update("id", id).Range("created_at", lgtm.CreatedAt).Set("status", entities.LGTMStatusDeleting)
	if err := upd.Run(); err != nil {
		return errors.WithStack(err)
	}
	if err := repo.S3API.Delete(id); err != nil {
		return err
	}
	if err := tbl.Delete("id", id).Range("created_at", lgtm.CreatedAt).Run(); err != nil {
		return errors.WithStack(err)
	}

	return nil
}

func (repo *LGTMsRepository) getTable() dynamo.Table {
	return repo.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.DBPrefix))
}
