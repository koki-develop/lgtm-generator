package controllers

import "github.com/koki-develop/lgtm-generator/backend/src/entities"

type LGTMsUsecase interface {
	FindAll(ipt *entities.LGTMsFindAllInput) (entities.LGTMs, error)
	Create(ipt *entities.LGTMCreateInput) (*entities.LGTM, error)
	Delete(ipt *entities.LGTMDeleteInput) error
}
