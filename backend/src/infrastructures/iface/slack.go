package iface

import "github.com/slack-go/slack"

type SlackAPI interface {
	PostMessage(msg *slack.Msg) error
}
