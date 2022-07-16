package entities

import (
	"net/url"
	"strings"

	"github.com/pkg/errors"
)

type Image struct {
	Title string `json:"title"`
	URL   string `json:"url"`
}

type Images []*Image

func (imgs Images) FilterOnlyHTTPS() Images {
	rtn := Images{}
	for _, img := range imgs {
		u, err := url.ParseRequestURI(img.URL)
		if err != nil {
			continue
		}
		if u.Scheme != "https" {
			continue
		}
		rtn = append(rtn, img)
	}
	return rtn
}

type ImagesSearchInput struct {
	Query string `form:"q"`
}

func (ipt *ImagesSearchInput) Valid() error {
	if strings.TrimSpace(ipt.Query) == "" {
		return errors.New("query is empty")
	}
	return nil
}
