package reports

import (
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/controllers"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer       controllers.Renderer
	ReportsUsecase controllers.ReportsUsecase
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Create(ctx controllers.Context) {
	var ipt entities.ReportCreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidJSON, errors.WithStack(err))
		return
	}

	rpt, err := ctrl.config.ReportsUsecase.Create(&ipt)
	if err != nil {
		if errors.Is(err, entities.ErrInvalidParameter) {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidParameter, errors.WithStack(err))
			return
		}
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}

	ctrl.config.Renderer.Created(ctx, rpt)
}
