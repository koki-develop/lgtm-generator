package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type LGTMsUsecase interface {
	FindAll() (entities.LGTMs, error)
	Create(ipt *entities.LGTMCreateInput) (*entities.LGTM, error)
}
