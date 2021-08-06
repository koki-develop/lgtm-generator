package gateways

import "github.com/slack-go/slack"

type Slack interface {
	PostMessage(ch string, blocks ...slack.Block) error
}
