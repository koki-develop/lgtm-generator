package images

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/images"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer         controllers.Renderer
	ImagesRepository images.Repository
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Search(ctx controllers.Context) {
	q := ctx.Query("q")
	if q == "" {
		ctrl.config.Renderer.BadRequest(ctx)
		return
	}

	imgs, err := ctrl.config.ImagesRepository.Search(q)
	if err != nil {
		ctrl.config.Renderer.InternalServerError(ctx)
		return
	}

	ctrl.config.Renderer.OK(ctx, imgs)
}
