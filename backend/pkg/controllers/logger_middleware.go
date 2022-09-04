package controllers

import (
	"fmt"
	"time"

	"github.com/awslabs/aws-lambda-go-api-proxy/core"
	"github.com/gin-gonic/gin"
)

type LoggerMiddleware struct{}

func NewLoggerMiddleware() *LoggerMiddleware {
	return &LoggerMiddleware{}
}

type logParams struct {
	Timestamp           time.Time
	APIGatewayRequestID string
	ClientIP            string
	ResponseStatusCode  int
	RequestPath         string
	RequestMethod       string
}

func (m *LoggerMiddleware) Apply() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		p := ctx.Request.URL.Path
		q := ctx.Request.URL.RawQuery
		if q != "" {
			p = p + "?" + q
		}

		params := logParams{
			Timestamp:           time.Now(),
			APIGatewayRequestID: "local",
			ClientIP:            ctx.ClientIP(),
			RequestPath:         p,
			RequestMethod:       ctx.Request.Method,
		}

		apigwctx, ok := core.GetAPIGatewayContextFromContext(ctx.Request.Context())
		if ok {
			params.APIGatewayRequestID = apigwctx.RequestID
			params.ClientIP = apigwctx.Identity.SourceIP
		}

		ctx.Next()

		params.ResponseStatusCode = ctx.Writer.Status()

		fmt.Printf(
			"%s | %s | %s | %d | %s %s |  \n",
			params.Timestamp.Format(time.RFC3339),
			params.APIGatewayRequestID,
			params.ClientIP,
			params.ResponseStatusCode,
			params.RequestMethod, params.RequestPath,
		)
	}
}
