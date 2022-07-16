package images

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/imagesearch"
)

type ImagesController struct {
	ImageSearchEngine imagesearch.Engine
}

func New(engine imagesearch.Engine) *ImagesController {
	return &ImagesController{
		ImageSearchEngine: engine,
	}
}

func (ctrl *ImagesController) Search(ctx *gin.Context) {
	var ipt entities.ImagesSearchInput
	if err := ctx.ShouldBindQuery(&ipt); err != nil {
		ctx.JSON(http.StatusBadRequest, map[string]string{"message": "invalid json"})
		return
	}
	if !ipt.Valid() {
		ctx.JSON(http.StatusBadRequest, map[string]string{"message": "invalid input"})
		return
	}

	imgs, err := ctrl.ImageSearchEngine.Search(ipt.Query)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, map[string]string{"message": "internal server error"})
		return
	}

	ctx.JSON(http.StatusOK, imgs)
}
