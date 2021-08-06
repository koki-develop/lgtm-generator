package images

import (
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer      controllers.Renderer
	ImagesUsecase controllers.ImagesUsecase
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Search(ctx controllers.Context) {
	var ipt entities.ImagesSearchInput
	if err := ctx.ShouldBindQuery(&ipt); err != nil {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidParameter, errors.WithStack(err))
		return
	}

	imgs, err := ctrl.config.ImagesUsecase.Search(&ipt)
	if err != nil {
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}

	ctrl.config.Renderer.OK(ctx, imgs)
}
