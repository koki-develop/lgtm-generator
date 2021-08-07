package infrastructures

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type SlackAPI interface {
	PostMessage(msg *slack.Msg) error
}

type SlackClient struct {
	config *SlackClientConfig
}

type SlackClientConfig struct {
	AccessToken string
	HTTPAPI     HTTPAPI
}

func NewSlackClient(cfg *SlackClientConfig) *SlackClient {
	return &SlackClient{
		config: cfg,
	}
}

func (c *SlackClient) PostMessage(msg *slack.Msg) error {
	p, err := json.Marshal(msg)
	if err != nil {
		return errors.WithStack(err)
	}

	req, err := http.NewRequest(http.MethodPost, "https://slack.com/api/chat.postMessage", bytes.NewReader(p))
	if err != nil {
		return errors.WithStack(err)
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", c.config.AccessToken))

	resp, err := c.config.HTTPAPI.Do(req)
	if err != nil {
		return errors.WithStack(err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		b, err := io.ReadAll(resp.Body)
		if err != nil {
			return errors.WithStack(err)
		}
		return errors.New(string(b))
	}

	return nil
}
