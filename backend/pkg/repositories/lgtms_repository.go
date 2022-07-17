package repositories

import (
	"fmt"
	"os"
	"time"

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

func (repo *LGTMsRepository) FindAll() (entities.LGTMs, error) {
	var lgtms entities.LGTMs

	tbl := repo.getTable()
	q := tbl.Get("status", entities.LGTMStatusOK).Index("index_by_status").Order(dynamo.Descending).Limit(20)
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

func (repo *LGTMsRepository) getTable() dynamo.Table {
	return repo.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.DBPrefix))
}
