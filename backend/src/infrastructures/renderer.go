package infrastructures

import (
	"fmt"
	"net/http"
	"os"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type Renderer struct {
	config *RendererConfig
}

type RendererConfig struct {
	SlackAPI SlackAPI
}

func NewRenderer(cfg *RendererConfig) *Renderer {
	return &Renderer{config: cfg}
}

func (rdr *Renderer) OK(ctx controllers.Context, obj interface{}) {
	ctx.JSON(http.StatusOK, obj)
}

func (rdr *Renderer) Created(ctx controllers.Context, obj interface{}) {
	ctx.JSON(http.StatusCreated, obj)
}

func (rdr *Renderer) BadRequest(ctx controllers.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusBadRequest, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) InternalServerError(ctx controllers.Context, err error) {
	fmt.Printf("error: %+v\n", err)
	if _, _, err := rdr.config.SlackAPI.PostMessage(fmt.Sprintf("lgtm-generator-backend-%s-errors", os.Getenv("STAGE")), slack.MsgOptionText(err.Error(), true)); err != nil {
		fmt.Printf("error: %+v\n", errors.WithStack(err))
	}

	ctx.JSON(http.StatusInternalServerError, map[string]string{
		"code": string(entities.ErrCodeInternalServerError),
	})
}
