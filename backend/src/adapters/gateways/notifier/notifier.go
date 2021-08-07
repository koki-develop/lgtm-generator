package notifier

import (
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

// FIXME: 通知フォーマット修正
func (n *Notifier) NotifyReport(rpt *entities.Report) error {
	_, err := n.config.FileStorage.IssueSignedURL(rpt.LGTMID)
	if err != nil {
		return errors.WithStack(err)
	}

	if _, _, err := n.config.Slack.PostMessage(n.config.Channel, slack.MsgOptionText(rpt.Text, false)); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
