package controllers

import (
	"github.com/gin-gonic/gin"
)

type LGTMsController struct {
	Renderer *Renderer
}

func NewLGTMsController() *LGTMsController {
	return &LGTMsController{
		Renderer: NewRenderer(),
	}
}

func (ctrl *LGTMsController) FindAll(ctx *gin.Context) {
	ctrl.Renderer.OK(ctx, []string{})
}
