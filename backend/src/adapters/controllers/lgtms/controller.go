package lgtms

import (
	"github.com/pkg/errors"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer     controllers.Renderer
	LGTMsUsecase controllers.LGTMsUsecase
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Index(ctx controllers.Context) {
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

func (ctrl *Controller) Create(ctx controllers.Context) {
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
