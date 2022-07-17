package dynamodb

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
)

func New() *dynamo.DB {
	awscfg := &aws.Config{Region: aws.String("us-east-1")}
	if os.Getenv("STAGE") == "local" {
		awscfg.Endpoint = aws.String("http://localhost:8000")
	}
	sess := session.Must(session.NewSession(awscfg))

	return dynamo.New(sess)
}
