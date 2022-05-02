package controllers

import (
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	uciface "github.com/koki-develop/lgtm-generator/backend/src/usecases/iface"
	"github.com/pkg/errors"
)

type ImagesController struct {
	config *ImagesControllerConfig
}

type ImagesControllerConfig struct {
	Renderer      infiface.Renderer
	ImagesUsecase uciface.ImagesUsecase
}

func NewImagesController(cfg *ImagesControllerConfig) *ImagesController {
	return &ImagesController{config: cfg}
}

func (ctrl *ImagesController) Search(ctx infiface.Context) {
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
