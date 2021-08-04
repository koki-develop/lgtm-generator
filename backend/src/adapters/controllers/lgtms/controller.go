package lgtms

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer controllers.Renderer
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Index(ctx controllers.Context) {
	ctrl.config.Renderer.OK(ctx, entities.LGTMs{})
}
