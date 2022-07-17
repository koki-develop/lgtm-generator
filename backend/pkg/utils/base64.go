package utils

import "encoding/base64"

func IsBase64(str string) bool {
	_, err := base64.StdEncoding.DecodeString(str)
	return err == nil
}
