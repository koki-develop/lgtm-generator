package iface

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type ImagesUsecase interface {
	Search(ipt *entities.ImagesSearchInput) (entities.Images, error)
}
