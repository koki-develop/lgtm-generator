package controllers

import (
	"github.com/pkg/errors"

	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	uciface "github.com/koki-develop/lgtm-generator/backend/src/usecases/iface"
)

type LGTMsController struct {
	config *LGTMsControllerConfig
}

type LGTMsControllerConfig struct {
	Renderer     infiface.Renderer
	LGTMsUsecase uciface.LGTMsUsecase
}

func NewLGTMsController(cfg *LGTMsControllerConfig) *LGTMsController {
	return &LGTMsController{config: cfg}
}

func (ctrl *LGTMsController) Index(ctx infiface.Context) {
	var ipt entities.LGTMsFindAllInput
	if err := ctx.ShouldBindQuery(&ipt); err != nil {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidParameter, errors.WithStack(err))
		return
	}

	lgtms, err := ctrl.config.LGTMsUsecase.FindAll(&ipt)
	if err != nil {
		if errors.Is(err, entities.ErrResourceNotFound) {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeResourceNotFound, errors.WithStack(err))
			return
		}
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}
	ctrl.config.Renderer.OK(ctx, lgtms)
}

func (ctrl *LGTMsController) Create(ctx infiface.Context) {
	var ipt entities.LGTMCreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidJSON, errors.WithStack(err))
		return
	}

	lgtm, err := ctrl.config.LGTMsUsecase.Create(&ipt)
	if err != nil {
		if errors.Is(err, entities.ErrInvalidParameter) {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidParameter, errors.WithStack(err))
			return
		}
		if errors.Is(err, entities.ErrUnsupportedImageFormat) {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeUnsupportedImageFormat, errors.WithStack(err))
			return
		}
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}
	ctrl.config.Renderer.Created(ctx, lgtm)
}

func (ctrl *LGTMsController) BatchDelete(id string) error {
	ipt := &entities.LGTMDeleteInput{ID: id}
	if err := ctrl.config.LGTMsUsecase.Delete(ipt); err != nil {
		return errors.WithStack(err)
	}

	return nil
}
