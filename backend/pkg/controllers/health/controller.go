package health

import (
	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/controllers"
)

type HealthController struct {
	Renderer *controllers.Renderer
}

func New() *HealthController {
	return &HealthController{
		Renderer: controllers.NewRenderer(),
	}
}

func (ctrl *HealthController) Standard(ctx *gin.Context) {
	ctrl.Renderer.OK(ctx, map[string]string{"status": "ok"})
}
