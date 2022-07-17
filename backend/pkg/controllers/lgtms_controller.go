package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/lgtmgen"
	"github.com/koki-develop/lgtm-generator/backend/pkg/repositories"
)

type LGTMsController struct {
	Renderer        *Renderer
	LGTMGenerator   *lgtmgen.LGTMGenerator
	LGTMsRepository *repositories.LGTMsRepository
}

func NewLGTMsController(g *lgtmgen.LGTMGenerator, repo *repositories.LGTMsRepository) *LGTMsController {
	return &LGTMsController{
		Renderer:        NewRenderer(),
		LGTMGenerator:   g,
		LGTMsRepository: repo,
	}
}

func (ctrl *LGTMsController) FindAll(ctx *gin.Context) {
	lgtms, err := ctrl.LGTMsRepository.FindAll()
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.OK(ctx, lgtms)
}

func (ctrl *LGTMsController) Create(ctx *gin.Context) {
	var ipt entities.LGTMCreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidJSON)
		return
	}
	if !ipt.Valid() {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidInput)
		return
	}

	img, ok, err := ctrl.LGTMGenerator.GenerateFromURL(ipt.URL)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}
	if !ok {
		ctrl.Renderer.BadRequest(ctx, ErrCodeUnsupportedImageFormat)
		return
	}

	lgtm, err := ctrl.LGTMsRepository.Create(img)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.Created(ctx, lgtm)
}
