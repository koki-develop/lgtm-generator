package gateways

import "github.com/slack-go/slack"

type Slack interface {
	PostMessage(msg *slack.Msg) error
}
