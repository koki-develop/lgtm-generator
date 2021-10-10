package notifier

import (
	"github.com/koki-develop/lgtm-generator/backend/src/adapters/gateways"
	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type Notifier struct {
	config *Config
}

type Config struct {
	Slack       gateways.Slack
	Channel     string
	FileStorage gateways.FileStorage
}

func New(cfg *Config) *Notifier {
	return &Notifier{config: cfg}
}

func (n *Notifier) NotifyReport(rpt *entities.Report) error {
	imgurl, err := n.config.FileStorage.IssueSignedURL(rpt.LGTMID)
	if err != nil {
		return errors.WithStack(err)
	}

	if err := n.config.Slack.PostMessage(&slack.Msg{
		Channel: n.config.Channel,
		Attachments: []slack.Attachment{
			{
				Text:     rpt.Text,
				ImageURL: imgurl,
				Fields: []slack.AttachmentField{
					{
						Title: "LGTM ID",
						Value: rpt.LGTMID,
						Short: true,
					},
					{
						Title: "Report Type",
						Value: string(rpt.Type),
						Short: true,
					},
				},
			},
		},
	}); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
