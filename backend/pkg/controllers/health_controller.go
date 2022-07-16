package controllers

import (
	"github.com/gin-gonic/gin"
)

type HealthController struct {
	Renderer *Renderer
}

func NewHealthController() *HealthController {
	return &HealthController{
		Renderer: NewRenderer(),
	}
}

func (ctrl *HealthController) Standard(ctx *gin.Context) {
	ctrl.Renderer.OK(ctx, map[string]string{"status": "ok"})
}
