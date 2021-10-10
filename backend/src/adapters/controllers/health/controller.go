package health

import (
	"net/http"

	"github.com/koki-develop/lgtm-generator/backend/src/adapters/controllers"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer controllers.Renderer
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{
		config: cfg,
	}
}

func (ctrl *Controller) Standard(ctx controllers.Context) {
	ctrl.config.Renderer.OK(ctx, map[string]int{
		"status": http.StatusOK,
	})
}
