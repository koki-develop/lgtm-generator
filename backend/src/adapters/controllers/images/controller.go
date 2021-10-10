package images

import (
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/controllers"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
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
		if errors.Is(err, entities.ErrInvalidParameter) {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidParameter, errors.WithStack(err))
			return
		}
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}

	ctrl.config.Renderer.OK(ctx, imgs)
}
