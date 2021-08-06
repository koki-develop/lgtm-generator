package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type ImagesUsecase interface {
	Search(ipt *entities.ImagesSearchInput) (entities.Images, error)
}
