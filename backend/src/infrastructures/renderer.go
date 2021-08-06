package infrastructures

import (
	"fmt"
	"net/http"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
)

type Renderer struct{}

func NewRenderer() *Renderer {
	return &Renderer{}
}

func (rdr *Renderer) OK(ctx controllers.Context, obj interface{}) {
	ctx.JSON(http.StatusOK, obj)
}

func (rdr *Renderer) BadRequest(ctx controllers.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusBadRequest, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) InternalServerError(ctx controllers.Context, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusInternalServerError, map[string]string{
		"code": string(entities.ErrCodeInternalServerError),
	})
}
