package infrastructures

import (
	"context"

	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
	"google.golang.org/api/customsearch/v1"
	"google.golang.org/api/option"
)

type GoogleImageSearchEngineConfig struct {
	APIKey         string
	SearchEngineID string
}

type GoogleImageSearchEngine struct {
	config *GoogleImageSearchEngineConfig
}

func NewGoogleImageSearchEngine(cfg *GoogleImageSearchEngineConfig) *GoogleImageSearchEngine {
	return &GoogleImageSearchEngine{config: cfg}
}

func (e *GoogleImageSearchEngine) Search(q string) (entities.Images, error) {
	svc, err := customsearch.NewService(context.Background(), option.WithAPIKey(e.config.APIKey))
	if err != nil {
		return nil, errors.WithStack(err)
	}
	search := svc.Cse.List()
	search.Cx(e.config.SearchEngineID)
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
		imgs = append(imgs, &entities.Image{
			Title: item.Title,
			URL:   item.Link,
		})
	}

	return imgs, nil
}
