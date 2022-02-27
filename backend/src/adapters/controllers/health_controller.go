package controllers

import (
	"net/http"

	"github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
)

type HealthController struct {
	config *HealthControllerConfig
}

type HealthControllerConfig struct {
	Renderer iface.Renderer
}

func NewHealthController(cfg *HealthControllerConfig) *HealthController {
	return &HealthController{
		config: cfg,
	}
}

func (ctrl *HealthController) Standard(ctx iface.Context) {
	ctrl.config.Renderer.OK(ctx, map[string]int{
		"status": http.StatusOK,
	})
}
