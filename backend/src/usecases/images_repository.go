package usecases

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type ImagesRepository interface {
	Search(q string) (entities.Images, error)
}
