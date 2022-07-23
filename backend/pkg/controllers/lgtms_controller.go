package controllers

import (
	"fmt"
	"os"

	"github.com/pkg/errors"
	"github.com/slack-go/slack"

	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/lgtmgen"
	"github.com/koki-develop/lgtm-generator/backend/pkg/repositories"
)

type LGTMsController struct {
	Renderer        *Renderer
	LGTMGenerator   *lgtmgen.LGTMGenerator
	LGTMsRepository *repositories.LGTMsRepository
	SlackAPI        *slack.Client
	SlackChannel    string
}

func NewLGTMsController(g *lgtmgen.LGTMGenerator, slackAPI *slack.Client, slackChannel string, repo *repositories.LGTMsRepository) *LGTMsController {
	return &LGTMsController{
		Renderer:        NewRenderer(),
		LGTMGenerator:   g,
		LGTMsRepository: repo,
		SlackAPI:        slackAPI,
		SlackChannel:    slackChannel,
	}
}

func (ctrl *LGTMsController) FindAll(ctx *gin.Context) {
	var ipt entities.LGTMFindAllInput
	if err := ctx.ShouldBindQuery(&ipt); err != nil {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidQuery)
		return
	}

	if ipt.After == nil || *ipt.After == "" {
		lgtms, err := ctrl.LGTMsRepository.FindAll()
		if err != nil {
			ctrl.Renderer.InternalServerError(ctx, err)
			return
		}

		ctrl.Renderer.OK(ctx, lgtms)
		return
	}

	lgtm, ok, err := ctrl.LGTMsRepository.Find(*ipt.After)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}
	if !ok {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidQuery)
		return
	}

	lgtms, err := ctrl.LGTMsRepository.FindAllAfter(lgtm)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.OK(ctx, lgtms)
}

func (ctrl *LGTMsController) Create(ctx *gin.Context) {
	var ipt entities.LGTMCreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidJSON)
		return
	}
	if !ipt.Valid() {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidInput)
		return
	}

	img, ok, err := ctrl.generateFromInput(ipt)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}
	if !ok {
		ctrl.Renderer.BadRequest(ctx, ErrCodeUnsupportedImageFormat)
		return
	}

	lgtm, err := ctrl.LGTMsRepository.Create(img)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.Created(ctx, lgtm)

	// FIXME: Slack 通知する分、レスポンスタイムが長くなる
	//        SNS 等を使って非同期的に行うようにする
	if _, _, err := ctrl.SlackAPI.PostMessage(ctrl.SlackChannel, slack.MsgOptionAttachments(
		slack.Attachment{
			Color:    "#00bfff",
			Title:    "LGTM 画像が生成されました",
			ThumbURL: fmt.Sprintf("%s/%s", os.Getenv("IMAGES_BASE_URL"), lgtm.ID),
			Fields: []slack.AttachmentField{
				{Title: "LGTM ID", Value: lgtm.ID, Short: true},
				{Title: "Source", Value: ipt.Source()},
			},
		},
	)); err != nil {
		fmt.Printf("failed to post message: %+v\n", err)
	}
}

func (ctrl *LGTMsController) generateFromInput(ipt entities.LGTMCreateInput) (*entities.LGTMImage, bool, error) {
	switch ipt.From {
	case entities.LGTMCreateFromURL:
		return ctrl.LGTMGenerator.GenerateFromURL(ipt.URL)
	case entities.LGTMCreateFromBase64:
		return ctrl.LGTMGenerator.GenerateFromBase64(ipt.Base64, ipt.ContentType)
	default:
		return nil, false, errors.Errorf("unknown from: %s", ipt.From)
	}
}
