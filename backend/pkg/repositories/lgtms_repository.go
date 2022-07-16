package repositories

import (
	"fmt"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/pkg/errors"
)

type LGTMsRepository struct {
	DynamoDB *dynamo.DB
	DBPrefix string
}

func NewLGTMsRepository() *LGTMsRepository {
	awscfg := &aws.Config{Region: aws.String("us-east-1")}
	if os.Getenv("STAGE") == "local" {
		awscfg.Endpoint = aws.String("http://localhost:8000")
	}
	sess := session.Must(session.NewSession(awscfg))

	return &LGTMsRepository{
		DynamoDB: dynamo.New(sess),
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

func (repo *LGTMsRepository) getTable() dynamo.Table {
	return repo.DynamoDB.Table(fmt.Sprintf("%s-lgtms", repo.DBPrefix))
}
