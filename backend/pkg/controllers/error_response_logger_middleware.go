package controllers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	"github.com/slack-go/slack"
)

type ErrorResponseLoggerMiddleware struct {
	slackAPI *slack.Client
	channel  string
}

func NewErrorResponseLoggerMiddleware(slackAPI *slack.Client, channel string) *ErrorResponseLoggerMiddleware {
	return &ErrorResponseLoggerMiddleware{slackAPI: slackAPI, channel: channel}
}

type responseBodyWriter struct {
	gin.ResponseWriter
	body *bytes.Buffer
}

func (w responseBodyWriter) Write(b []byte) (int, error) {
	w.body.Write(b)
	return w.ResponseWriter.Write(b)
}

func (m *ErrorResponseLoggerMiddleware) Apply(ctx *gin.Context) {
	w := &responseBodyWriter{body: bytes.NewBufferString(""), ResponseWriter: ctx.Writer}
	ctx.Writer = w

	url := ctx.Request.URL.String()
	method := ctx.Request.Method
	body, err := io.ReadAll(ctx.Request.Body)
	if err == nil {
		ctx.Request.Body = io.NopCloser(bytes.NewBuffer(body))
	} else {
		body = []byte("failed to read body")
		fmt.Printf("failed to read body: %+v\n", errors.WithStack(err))
	}

	ctx.Next()

	status := ctx.Writer.Status()
	if status < 400 || status == 404 {
		return
	}

	reqbody := string(body)
	respbody := w.body.String()

	fmt.Printf("url: %s\nmethod: %s\nbody: %s\nstatus: %d\nresponse: %s\n", url, method, body, status, respbody)
	l, err := json.Marshal(map[string]interface{}{
		"url":             url,
		"method":          method,
		"request body":    reqbody,
		"response status": status,
		"response body":   respbody,
	})
	if err == nil {
		fmt.Println(string(l))
	} else {
		fmt.Printf("failed to marshal: %+v\n", err)
	}

	color := "#ff8c00"
	if status >= 500 {
		color = "#ff0000"
	}

	if _, _, err := m.slackAPI.PostMessage(m.channel, slack.MsgOptionAttachments(
		slack.Attachment{
			Title: "returned error response.",
			Color: color,
			Fields: []slack.AttachmentField{
				{Title: "url", Value: url, Short: true},
				{Title: "method", Value: method, Short: true},
				{Title: "request body", Value: reqbody, Short: false},
				{Title: "response status", Value: strconv.Itoa(status), Short: true},
				{Title: "response body", Value: respbody, Short: false},
			},
		},
	)); err != nil {
		fmt.Printf("failed to post message: %+v\n", err)
	}
}
