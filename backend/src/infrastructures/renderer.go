package infrastructures

import (
	"fmt"
	"net/http"
	"os"

	"github.com/koki-develop/lgtm-generator/backend/src/adapters/controllers"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
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

func (rdr *Renderer) NoContent(ctx controllers.Context) {
	ctx.Status(http.StatusNoContent)
}

func (rdr *Renderer) BadRequest(ctx controllers.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusBadRequest, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) NotFound(ctx controllers.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusNotFound, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) Forbidden(ctx controllers.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusForbidden, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) InternalServerError(ctx controllers.Context, err error) {
	fmt.Printf("error: %+v\n", err)
	if err := rdr.config.SlackAPI.PostMessage(&slack.Msg{
		Channel: fmt.Sprintf("lgtm-generator-backend-%s-errors", os.Getenv("STAGE")),
		Text:    ":red_circle: *ERROR*",
		Attachments: []slack.Attachment{
			{
				Color: "#ff0000",
				Text:  fmt.Sprintf("%+v", err),
			},
		},
	},
	); err != nil {
		fmt.Printf("error: %+v\n", errors.WithStack(err))
	}

	ctx.JSON(http.StatusInternalServerError, map[string]string{
		"code": string(entities.ErrCodeInternalServerError),
	})
}
