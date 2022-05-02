package iface

import "github.com/aws/aws-sdk-go/service/s3/s3manager"

type S3Uploader interface {
	Upload(input *s3manager.UploadInput, options ...func(*s3manager.Uploader)) (*s3manager.UploadOutput, error)
}
