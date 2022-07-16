package entities

import "strings"

type Image struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

type Images []*Image

type ImagesSearchInput struct {
	Query string `form:"q"`
}

func (ipt *ImagesSearchInput) Valid() bool {
	if strings.TrimSpace(ipt.Query) == "" {
		return false
	}
	return true
}
