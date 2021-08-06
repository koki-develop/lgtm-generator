package infrastructures

import (
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
	c.api.PostMessage(ch, slack.MsgOptionBlocks(blocks...))
	return nil
}
