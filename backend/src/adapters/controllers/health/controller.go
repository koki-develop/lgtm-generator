package health

import (
	"net/http"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/infrastructures"
)

type Controller struct {
	renderer controllers.Renderer
}

func NewController() *Controller {
	return &Controller{
		renderer: infrastructures.NewRenderer(),
	}
}

func (ctrl *Controller) Standard(ctx controllers.Context) {
	ctrl.renderer.OK(ctx, map[string]int{
		"status": http.StatusOK,
	})
}
