package imagesearch

import (
	"context"

	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/utils"
	"github.com/pkg/errors"
	"google.golang.org/api/customsearch/v1"
	"google.golang.org/api/option"
)

type Engine interface {
	Search(q string) (entities.Images, error)
}

type GoogleImageSearchEngine struct {
	APIKey   string
	EngineID string
}

func New(apiKey, engineID string) *GoogleImageSearchEngine {
	return &GoogleImageSearchEngine{APIKey: apiKey, EngineID: engineID}
}

func (e *GoogleImageSearchEngine) Search(q string) (entities.Images, error) {
	svc, err := customsearch.NewService(context.Background(), option.WithAPIKey(e.APIKey))
	if err != nil {
		return nil, errors.WithStack(err)
	}
	search := svc.Cse.List()
	search.Cx(e.EngineID)
	search.Q(q)
	search.Num(10)
	search.SearchType("image")
	search.Safe("active")
	search.Start(1)

	resp, err := search.Do()
	if err != nil {
		return nil, errors.WithStack(err)
	}

	imgs := entities.Images{}
	for _, item := range resp.Items {
		if !utils.IsHTTPSURL(item.Link) {
			continue
		}
		imgs = append(imgs, &entities.Image{
			Title: item.Title,
			URL:   item.Link,
		})
	}

	return imgs, nil
}
