package reports

import (
	"fmt"
	"time"

	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/koki-develop/lgtm-generator/backend/src/utils"
	"github.com/pkg/errors"
)

type Repository struct {
	config *RepositoryConfig
}

type RepositoryConfig struct {
	DynamoDB infiface.DynamoDB
	DBPrefix string
}

func NewRepository(cfg *RepositoryConfig) *Repository {
	return &Repository{config: cfg}
}

func (repo *Repository) Create(rpt *entities.Report) error {
	rpt.ID = utils.UUIDV4()
	rpt.CreatedAt = time.Now()

	tbl := repo.config.DynamoDB.Table(fmt.Sprintf("%s-reports", repo.config.DBPrefix))
	if err := tbl.Put(rpt).Run(); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
