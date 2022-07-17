package repositories

import (
	"fmt"
	"time"

	"github.com/guregu/dynamo"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/utils"
	"github.com/pkg/errors"
)

type ReportsRepository struct {
	DynamoDB *dynamo.DB
	DBPrefix string
}

func NewReportsRepository(db *dynamo.DB, dbPrefix string) *ReportsRepository {
	return &ReportsRepository{DynamoDB: db, DBPrefix: dbPrefix}
}

func (repo *ReportsRepository) Create(lgtmid string, t entities.ReportType, text string) (*entities.Report, error) {
	rpt := &entities.Report{
		ID:        utils.UUIDV4(),
		LGTMID:    lgtmid,
		Type:      t,
		Text:      text,
		CreatedAt: time.Now(),
	}

	tbl := repo.getTable()
	if err := tbl.Put(rpt).Run(); err != nil {
		return nil, errors.WithStack(err)
	}

	return rpt, nil
}

func (repo *ReportsRepository) getTable() dynamo.Table {
	return repo.DynamoDB.Table(fmt.Sprintf("%s-reports", repo.DBPrefix))
}
