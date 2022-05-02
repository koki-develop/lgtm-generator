package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/controllers"
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/gateways"
	"github.com/koki-develop/lgtm-generator/backend/src/infrastructures"
	"github.com/koki-develop/lgtm-generator/backend/src/usecases"
	"github.com/pkg/errors"
)

type event struct {
	LGTMID string `json:"lgtm_id"`
}

func handler(e event) error {
	db := infrastructures.NewGureguDynamoDB()
	s3lgtms := infrastructures.NewS3(&infrastructures.S3Config{
		Bucket: fmt.Sprintf("lgtm-generator-backend-%s-images", os.Getenv("STAGE")),
	})
	lgtmsrepo := gateways.NewLGTMsRepository(&gateways.LGTMsRepositoryConfig{
		DynamoDB:    db,
		DBPrefix:    fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
		FileStorage: s3lgtms,
	})
	lgtmsuc := usecases.NewLGTMsUsecase(&usecases.LGTMsUsecaseConfig{
		LGTMsRepository: lgtmsrepo,
	})
	ctrl := controllers.NewLGTMsController(&controllers.LGTMsControllerConfig{
		LGTMsUsecase: lgtmsuc,
	})
	if err := ctrl.BatchDelete(e.LGTMID); err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func main() {
	lambda.Start(handler)
}
