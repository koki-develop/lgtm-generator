package gateways

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type ImageSearchEngine interface {
	Search(q string) (entities.Images, error)
}
