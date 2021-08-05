package lgtms

import (
	"github.com/pkg/errors"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/utils"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer        controllers.Renderer
	LGTMsRepository controllers.LGTMsRepository
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Index(ctx controllers.Context) {
	lgtms, err := ctrl.config.LGTMsRepository.FindAll()
	if err != nil {
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}
	ctrl.config.Renderer.OK(ctx, lgtms)
}

type CreateInput struct {
	Base64 *string `json:"base64"`
}

func (ctrl *Controller) Create(ctx controllers.Context) {
	var ipt CreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.config.Renderer.BadRequest(ctx, errors.WithStack(err))
		return
	}

	if ipt.Base64 != nil {
		src, err := utils.Base64Decode(*ipt.Base64)
		if err != nil {
			ctrl.config.Renderer.BadRequest(ctx, errors.WithStack(err))
			return
		}
		lgtm, err := ctrl.config.LGTMsRepository.Create(src)
		if err != nil {
			ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
			return
		}
		ctrl.config.Renderer.OK(ctx, lgtm)
		return
	}

	ctrl.config.Renderer.BadRequest(ctx, errors.New("empty parameter"))
}
