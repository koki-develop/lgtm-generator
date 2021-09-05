package entities

import (
	"strings"

	"github.com/pkg/errors"
)

type Image struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

type Images []*Image

type ImagesSearchInput struct {
	Query string `form:"q"`
}

func (ipt *ImagesSearchInput) Valid() error {
	if strings.TrimSpace(ipt.Query) == "" {
		return errors.New("query is empty")
	}
	return nil
}
