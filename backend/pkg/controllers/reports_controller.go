package controllers

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/entities"
	"github.com/koki-develop/lgtm-generator/backend/pkg/repositories"
	"github.com/slack-go/slack"
)

type ReportsController struct {
	Renderer          *Renderer
	SlackAPI          *slack.Client
	SlackChannel      string
	ReportsRepository *repositories.ReportsRepository
}

func NewReportsController(slackAPI *slack.Client, slackChannel string, repo *repositories.ReportsRepository) *ReportsController {
	return &ReportsController{
		Renderer:          NewRenderer(),
		SlackAPI:          slackAPI,
		SlackChannel:      slackChannel,
		ReportsRepository: repo,
	}
}

func (ctrl *ReportsController) Create(ctx *gin.Context) {
	var ipt entities.ReportCreateInput
	if err := ctx.ShouldBindJSON(&ipt); err != nil {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidJSON)
		return
	}
	if !ipt.Valid() {
		ctrl.Renderer.BadRequest(ctx, ErrCodeInvalidInput)
		return
	}

	rpt, err := ctrl.ReportsRepository.Create(ipt.LGTMID, ipt.Type, ipt.Text)
	if err != nil {
		ctrl.Renderer.InternalServerError(ctx, err)
		return
	}

	ctrl.Renderer.Created(ctx, rpt)

	if _, _, err := ctrl.SlackAPI.PostMessage(ctrl.SlackChannel, slack.MsgOptionAttachments(
		slack.Attachment{
			Color:    "#ff8c00",
			Title:    rpt.Text,
			ThumbURL: fmt.Sprintf("%s/%s", os.Getenv("IMAGES_BASE_URL"), rpt.LGTMID),
			Fields: []slack.AttachmentField{
				{Title: "LGTM ID", Value: rpt.LGTMID, Short: true},
				{Title: "Report Type", Value: string(rpt.Type), Short: true},
			},
		},
	)); err != nil {
		fmt.Printf("failed to post message: %+v\n", err)
	}
}
