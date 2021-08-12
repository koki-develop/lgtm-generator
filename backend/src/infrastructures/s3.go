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
