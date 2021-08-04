package utils

import (
	"encoding/base64"

	"github.com/pkg/errors"
)

func Base64Decode(src string) ([]byte, error) {
	b, err := base64.StdEncoding.DecodeString(src)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return b, nil
}
