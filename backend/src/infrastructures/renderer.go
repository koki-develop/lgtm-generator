package infrastructures

import (
	"fmt"
	"net/http"
	"os"

	"github.com/koki-develop/lgtm-generator/backend/src/adapters/gateways"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type Renderer struct {
	config *RendererConfig
}

type RendererConfig struct {
	SlackAPI gateways.SlackAPI
}

func NewRenderer(cfg *RendererConfig) *Renderer {
	return &Renderer{config: cfg}
}

func (rdr *Renderer) OK(ctx infiface.Context, obj interface{}) {
	ctx.JSON(http.StatusOK, obj)
}

func (rdr *Renderer) Created(ctx infiface.Context, obj interface{}) {
	ctx.JSON(http.StatusCreated, obj)
}

func (rdr *Renderer) NoContent(ctx infiface.Context) {
	ctx.Status(http.StatusNoContent)
}

func (rdr *Renderer) BadRequest(ctx infiface.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusBadRequest, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) NotFound(ctx infiface.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusNotFound, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) Forbidden(ctx infiface.Context, code entities.ErrCode, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusForbidden, map[string]string{
		"code": string(code),
	})
}

func (rdr *Renderer) InternalServerError(ctx infiface.Context, err error) {
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
