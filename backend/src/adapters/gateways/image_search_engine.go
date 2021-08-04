package gateways

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type ImageSearchEngine interface {
	Search(q string) (entities.Images, error)
}
