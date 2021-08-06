package notifier

import (
	"fmt"
	"strings"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
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

	blocks := []slack.Block{
		slack.NewDividerBlock(),

		&slack.SectionBlock{
			Type: slack.MBTSection,
			Text: &slack.TextBlockObject{
				Type: slack.PlainTextType,
				Text: fmt.Sprintf("ReportType - %s", rpt.Type),
			},
		},

		slack.NewImageBlock(
			imgurl,
			"LGTM",
			"",
			&slack.TextBlockObject{Type: slack.PlainTextType, Text: rpt.LGTMID},
		),

		&slack.SectionBlock{
			Type: slack.MBTSection,
			Text: &slack.TextBlockObject{
				Type: slack.PlainTextType,
				Text: strings.NewReplacer("\r", "", "\n", "  ").Replace(rpt.Text),
			},
		},

		slack.NewDividerBlock(),
	}
	if err := n.config.Slack.PostMessage(n.config.Channel, blocks...); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
