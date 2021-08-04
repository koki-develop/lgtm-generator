package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type LGTMsRepository interface {
	Create(base64 string) (entities.LGTM, error)
}
