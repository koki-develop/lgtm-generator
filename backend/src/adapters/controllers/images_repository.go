package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type ImagesRepository interface {
	Search(q string) (entities.Images, error)
}
