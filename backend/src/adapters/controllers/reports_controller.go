package controllers

import (
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	uciface "github.com/koki-develop/lgtm-generator/backend/src/usecases/iface"
	"github.com/pkg/errors"
)

type ReportsController struct {
	config *ReportsControllerConfig
}

type ReportsControllerConfig struct {
	Renderer       infiface.Renderer
	ReportsUsecase uciface.ReportsUsecase
}

func NewReportsController(cfg *ReportsControllerConfig) *ReportsController {
	return &ReportsController{config: cfg}
}

func (ctrl *ReportsController) Create(ctx infiface.Context) {
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
