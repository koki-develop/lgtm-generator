package utils

import (
	"fmt"
	"os"

	"github.com/pkg/errors"
)

func WriteTmpFile(name string, data []byte) (string, error) {
	filename := fmt.Sprintf("/tmp/%s", name)

	f, err := os.Create(filename)
	if err != nil {
		return "", errors.WithStack(err)
	}
	defer f.Close()

	if _, err := f.Write(data); err != nil {
		return "", errors.WithStack(err)
	}

	return filename, nil
}
