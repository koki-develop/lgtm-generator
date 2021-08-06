package entities

import (
	"github.com/pkg/errors"
)

type Image struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

type Images []*Image

type ImagesSearchInput struct {
	Query string `json:"q"`
}

func (ipt *ImagesSearchInput) Valid() error {
	if ipt.Query == "" {
		return errors.New("query is empty")
	}
	return nil
}
