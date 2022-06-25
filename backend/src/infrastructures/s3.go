package infrastructures

import (
	"bytes"
	"os"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3iface"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/pkg/errors"
)

type S3 struct {
	api      s3iface.S3API
	uploader infiface.S3Uploader
	config   *S3Config
}

type S3Config struct {
	Bucket string
}

func NewS3(cfg *S3Config) *S3 {
	awscfg := &aws.Config{Region: aws.String("us-east-1")}
	if os.Getenv("STAGE") == "local" {
		awscfg.Endpoint = aws.String("http://bucket:9000")
		awscfg.Credentials = credentials.NewStaticCredentials("DUMMY_AWS_ACCESS_KEY_ID", "DUMMY_AWS_SECRET_ACCESS_KEY", "")
		awscfg.S3ForcePathStyle = aws.Bool(true)
	}

	sess := session.Must(session.NewSession(awscfg))
	return &S3{
		api:      s3.New(sess),
		uploader: s3manager.NewUploader(sess),
		config:   cfg,
	}
}

func (c *S3) Save(path, contentType string, data []byte) error {
	if _, err := c.uploader.Upload(&s3manager.UploadInput{
		Body:        bytes.NewReader(data),
		Bucket:      aws.String(c.config.Bucket),
		Key:         aws.String(path),
		ContentType: aws.String(contentType),
	}); err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func (c *S3) ListKeys() ([]string, error) {
	resp, err := c.api.ListObjectsV2(&s3.ListObjectsV2Input{
		Bucket:  aws.String(c.config.Bucket),
		MaxKeys: aws.Int64(1000),
	})
	if err != nil {
		return nil, errors.WithStack(err)
	}
	var keys []string
	for _, o := range resp.Contents {
		keys = append(keys, *o.Key)
	}
	return keys, nil
}

func (c *S3) IssueSignedURL(key string) (string, error) {
	req, _ := c.api.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(c.config.Bucket),
		Key:    aws.String(key),
	})
	url, err := req.Presign(time.Minute * 5)
	if err != nil {
		return "", errors.WithStack(err)
	}
	return url, nil
}

func (c *S3) Delete(key string) error {
	if _, err := c.api.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(c.config.Bucket),
		Key:    aws.String(key),
	}); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
