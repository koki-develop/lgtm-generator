package infrastructures

import (
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type SlackAPI interface {
	PostMessage(channelID string, options ...slack.MsgOption) (string, string, error)
}

type Slack struct {
	api SlackAPI
}

type SlackConfig struct {
	AccessToken string
}

func NewSlack(cfg *SlackConfig) *Slack {
	return &Slack{api: slack.New(cfg.AccessToken)}
}

func (c *Slack) PostMessage(ch string, blocks ...slack.Block) error {
	if _, _, err := c.api.PostMessage(ch, slack.MsgOptionBlocks(blocks...)); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
