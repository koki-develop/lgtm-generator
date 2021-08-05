package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type LGTMsRepository interface {
	Create(src []byte) (*entities.LGTM, error)
}
