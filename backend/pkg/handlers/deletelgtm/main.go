package main

import (
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/lambda"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/dynamodb"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/s3"
	"github.com/koki-develop/lgtm-generator/backend/pkg/repositories"
)

type Event struct {
	LGTMID string `json:"lgtm_id"`
}

func handler(e Event) error {
	db := dynamodb.New()
	bucket := fmt.Sprintf("lgtm-generator-backend-%s-images", os.Getenv("STAGE"))
	s3client := s3.New(bucket)
	repo := repositories.NewLGTMsRepository(s3client, db)
	if err := repo.Delete(e.LGTMID); err != nil {
		return err
	}
	return nil
}

func main() {
	lambda.Start(handler)
}
