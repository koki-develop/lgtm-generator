package lgtms

import (
	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/controllers"
)

type LGTMsController struct {
	Renderer *controllers.Renderer
}

func New() *LGTMsController {
	return &LGTMsController{
		Renderer: controllers.NewRenderer(),
	}
}

func (ctrl *LGTMsController) FindAll(ctx *gin.Context) {
	ctrl.Renderer.OK(ctx, []string{})
}
