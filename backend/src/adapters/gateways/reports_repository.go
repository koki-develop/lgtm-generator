package gateways

import (
	"fmt"
	"time"

	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/utils"
	"github.com/pkg/errors"
)

type ReportsRepository struct {
	config *ReportsRepositoryConfig
}

type ReportsRepositoryConfig struct {
	DynamoDB infiface.DynamoDB
	DBPrefix string
}

func NewReportsRepository(cfg *ReportsRepositoryConfig) *ReportsRepository {
	return &ReportsRepository{config: cfg}
}

func (repo *ReportsRepository) Create(rpt *entities.Report) error {
	rpt.ID = utils.UUIDV4()
	rpt.CreatedAt = time.Now()

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-reports", repo.config.DBPrefix))
	if err := tbl.Put(rpt).Run(); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
