package infrastructures

import (
	"net/http"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
)

type Renderer struct{}

func NewRenderer() *Renderer {
	return &Renderer{}
}

func (rdr *Renderer) OK(ctx controllers.Context, obj interface{}) {
	ctx.JSON(http.StatusOK, obj)
}

func (rdr *Renderer) BadRequest(ctx controllers.Context) {
	ctx.JSON(http.StatusBadRequest, map[string]string{
		"code": "BAD_REQUEST",
	})
}

func (rdr *Renderer) InternalServerError(ctx controllers.Context) {
	ctx.JSON(http.StatusInternalServerError, map[string]string{
		"code": "INTERNAL_SERVER_ERROR",
	})
}
