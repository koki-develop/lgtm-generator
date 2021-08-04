package infrastructures

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"golang.org/x/oauth2"
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
	svc, err := customsearch.NewService(oauth2.NoContext, option.WithAPIKey(e.config.APIKey))
	if err != nil {
		return nil, err
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
		return nil, err
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
