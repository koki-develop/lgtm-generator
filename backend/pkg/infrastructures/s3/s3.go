package s3

import (
	"bytes"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3iface"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/aws/aws-sdk-go/service/s3/s3manager/s3manageriface"
	"github.com/pkg/errors"
)

type ClientAPI interface {
	List() ([]string, error)
	Put(key, contentType string, data []byte) error
	Delete(key string) error
}

type Client struct {
	api      s3iface.S3API
	uploader s3manageriface.UploaderAPI
	bucket   string
}

func New(bucket string) *Client {
	awscfg := &aws.Config{Region: aws.String("us-east-1")}
	if os.Getenv("STAGE") == "local" {
		awscfg.Endpoint = aws.String("http://localhost:9000")
		awscfg.Credentials = credentials.NewStaticCredentials("DUMMY_AWS_ACCESS_KEY_ID", "DUMMY_AWS_SECRET_ACCESS_KEY", "")
		awscfg.S3ForcePathStyle = aws.Bool(true)
	}
	sess := session.Must(session.NewSession(awscfg))

	return &Client{
		api:      s3.New(sess),
		uploader: s3manager.NewUploader(sess),
		bucket:   bucket,
	}
}

func (cl *Client) List() ([]string, error) {
	resp, err := cl.api.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket: aws.String(cl.bucket),
	})
	if err != nil {
		return nil, errors.WithStack(err)
	}

	var keys []string

	for _, c := range resp.Contents {
		keys = append(keys, *c.Key)
	}

	return keys, nil
}

func (cl *Client) Put(key, contentType string, data []byte) error {
	_, err := cl.uploader.Upload(&s3manager.UploadInput{
		Bucket:      aws.String(cl.bucket),
		Key:         aws.String(key),
		ContentType: aws.String(contentType),
		Body:        bytes.NewReader(data),
	})
	if err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func (cl *Client) Delete(key string) error {
	_, err := cl.api.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(cl.bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return errors.WithStack(err)
	}
	return nil
}
