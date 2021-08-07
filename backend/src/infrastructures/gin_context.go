package infrastructures

import (
	"github.com/aws/aws-lambda-go/events"
	"github.com/awslabs/aws-lambda-go-api-proxy/core"
	"github.com/gin-gonic/gin"
)

type GinContext struct {
	*gin.Context
}

func NewContextFromGin(ctx *gin.Context) *GinContext {
	return &GinContext{
		Context: ctx,
	}
}

func (ctx *GinContext) GetAPIGatewayProxyRequestContext() (events.APIGatewayProxyRequestContext, bool) {
	return core.GetAPIGatewayContextFromContext(ctx.Context.Request.Context())
}

func (ctx *GinContext) GetRequestID() string {
	apigwctx, ok := ctx.GetAPIGatewayProxyRequestContext()
	if !ok {
		panic("api gateway proxy request context not found")
	}
	if apigwctx.RequestID == "" {
		panic("request id not found")
	}
	return apigwctx.RequestID
}
