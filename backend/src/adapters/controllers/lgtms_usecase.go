package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type LGTMsUsecase interface {
	FindAll(ipt *entities.LGTMsFindAllInput) (entities.LGTMs, error)
	Create(ipt *entities.LGTMCreateInput) (*entities.LGTM, error)
}
