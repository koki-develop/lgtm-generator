package reports

import "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer controllers.Renderer
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Create(ctx controllers.Context) {
	ctrl.config.Renderer.OK(ctx, map[string]interface{}{
		"message": "hello",
	})
}
