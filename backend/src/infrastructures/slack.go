package infrastructures

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type SlackPostMessageResponse struct {
	OK    bool   `json:"ok"`
	Error string `json:"error"`
}

type SlackClient struct {
	config *SlackClientConfig
}

type SlackClientConfig struct {
	AccessToken string
	HTTPAPI     infiface.HTTPAPI
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
	req.Header.Set("Content-Type", "application/json")

	httpresp, err := c.config.HTTPAPI.Do(req)
	if err != nil {
		return errors.WithStack(err)
	}
	defer httpresp.Body.Close()

	b, err := io.ReadAll(httpresp.Body)
	if err != nil {
		return errors.WithStack(err)
	}

	if httpresp.StatusCode != http.StatusOK {
		return errors.New(string(b))
	}

	var resp SlackPostMessageResponse
	if err := json.Unmarshal(b, &resp); err != nil {
		return errors.WithStack(err)
	}

	if !resp.OK {
		return errors.New(resp.Error)
	}

	return nil
}
