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
