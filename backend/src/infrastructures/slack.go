package infrastructures

import (
	"github.com/slack-go/slack"
)

type SlackAPI interface {
	PostMessage(channelID string, options ...slack.MsgOption) (string, string, error)
}
