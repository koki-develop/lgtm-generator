package controllers

import (
	"bytes"
	"fmt"
	"io"

	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
)

type ErrorResponseLoggerMiddleware struct{}

func NewErrorResponseLoggerMiddleware() *ErrorResponseLoggerMiddleware {
	return &ErrorResponseLoggerMiddleware{}
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
		fmt.Printf("error: %+v\n", errors.WithStack(err))
	}

	ctx.Next()

	status := ctx.Writer.Status()
	respbody := w.body.String()

	// TODO: slack 通知
	fmt.Printf("url: %s\nmethod: %s\nbody: %s\nstatus: %d\nresponse: %s\n", url, method, body, status, respbody)
}
