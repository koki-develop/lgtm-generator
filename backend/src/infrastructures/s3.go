package infrastructures

import (
	"bytes"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3iface"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"github.com/pkg/errors"
)

type S3Uploader interface {
	Upload(input *s3manager.UploadInput, options ...func(*s3manager.Uploader)) (*s3manager.UploadOutput, error)
}

type S3 struct {
	api      s3iface.S3API
	uploader S3Uploader
	config   *S3Config
}

type S3Config struct {
	Bucket string
}

func NewS3(cfg *S3Config) *S3 {
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String("us-east-1")}))
	return &S3{
		api:      s3.New(sess),
		uploader: s3manager.NewUploader(sess),
		config:   cfg,
	}
}

func (c *S3) Save(path, contentType string, data []byte) error {
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String("us-east-1")}))
	u := s3manager.NewUploader(sess)

	if _, err := u.Upload(&s3manager.UploadInput{
		Body:        bytes.NewReader(data),
		Bucket:      aws.String(c.config.Bucket),
		Key:         aws.String(path),
		ContentType: aws.String(contentType),
	}); err != nil {
		return errors.WithStack(err)
	}
	return nil
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
