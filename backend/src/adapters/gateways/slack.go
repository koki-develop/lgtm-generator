package gateways

import "github.com/slack-go/slack"

type Slack interface {
	PostMessage(channelID string, options ...slack.MsgOption) (string, string, error)
}
