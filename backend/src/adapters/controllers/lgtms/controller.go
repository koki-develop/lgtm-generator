package lgtms

import (
	"regexp"

	"github.com/pkg/errors"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/utils"
)

type Controller struct {
	config *ControllerConfig
}

type ControllerConfig struct {
	Renderer        controllers.Renderer
	LGTMsRepository controllers.LGTMsRepository
}

func NewController(cfg *ControllerConfig) *Controller {
	return &Controller{config: cfg}
}

func (ctrl *Controller) Index(ctx controllers.Context) {
	lgtms, err := ctrl.config.LGTMsRepository.FindAll()
	if err != nil {
		ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
		return
	}
	ctrl.config.Renderer.OK(ctx, lgtms)
}

type CreateInput struct {
	ContentType string  `json:"content_type"`
	Base64      *string `json:"base64"`
}

func (ctrl *Controller) Create(ctx controllers.Context) {
	var ipt CreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidJSON, errors.WithStack(err))
		return
	}

	if ipt.ContentType == "" {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeContentTypeIsEmpty, errors.New("content type is empty"))
		return
	}
	if !regexp.MustCompile(`\Aimage/.+\z`).Match([]byte(ipt.ContentType)) {
		ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidContentType, errors.Errorf("invalid content type: %s", ipt.ContentType))
		return
	}

	if ipt.Base64 != nil {
		if *ipt.Base64 == "" {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeBase64IsEmpty, errors.New("base64 is empty"))
			return
		}
		src, err := utils.Base64Decode(*ipt.Base64)
		if err != nil {
			ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeInvalidBase64, errors.WithStack(err))
			return
		}
		lgtm, err := ctrl.config.LGTMsRepository.Create(src, ipt.ContentType)
		if err != nil {
			if errors.Is(err, entities.ErrUnsupportedImageFormat) {
				ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeUnsupportedImageFormat, errors.WithStack(err))
				return
			}
			ctrl.config.Renderer.InternalServerError(ctx, errors.WithStack(err))
			return
		}
		ctrl.config.Renderer.Created(ctx, lgtm)
		return
	}

	ctrl.config.Renderer.BadRequest(ctx, entities.ErrCodeImageSourceIsEmpty, errors.New("image source is empty"))
}
