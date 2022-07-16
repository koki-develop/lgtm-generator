package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/repositories"
)

type LGTMsController struct {
	Renderer        *Renderer
	LGTMsRepository *repositories.LGTMsRepository
}

func NewLGTMsController(repo *repositories.LGTMsRepository) *LGTMsController {
	return &LGTMsController{
		Renderer:        NewRenderer(),
		LGTMsRepository: repo,
	}
}

func (ctrl *LGTMsController) FindAll(ctx *gin.Context) {
	lgtms, err := ctrl.LGTMsRepository.FindAll()
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.OK(ctx, lgtms)
}
