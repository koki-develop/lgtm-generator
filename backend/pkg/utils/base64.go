package utils

import (
	"encoding/base64"

	"github.com/pkg/errors"
)

func IsBase64(str string) bool {
	_, err := base64.StdEncoding.DecodeString(str)
	return err == nil
}

func Base64Decode(str string) ([]byte, error) {
	b, err := base64.StdEncoding.DecodeString(str)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return b, nil
}
