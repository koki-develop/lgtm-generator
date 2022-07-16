package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/imagesearch"
)

type ImagesController struct {
	Renderer          *Renderer
	ImageSearchEngine imagesearch.Engine
}

func NewImagesController(engine imagesearch.Engine) *ImagesController {
	return &ImagesController{
		Renderer:          NewRenderer(),
		ImageSearchEngine: engine,
	}
}

func (ctrl *ImagesController) Search(ctx *gin.Context) {
	var ipt entities.ImagesSearchInput
	if err := ctx.ShouldBindQuery(&ipt); err != nil {
		ctrl.Renderer.BadRequest(ctx)
		return
	}
	if !ipt.Valid() {
		ctrl.Renderer.BadRequest(ctx)
		return
	}

	imgs, err := ctrl.ImageSearchEngine.Search(ipt.Query)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.OK(ctx, imgs)
}
