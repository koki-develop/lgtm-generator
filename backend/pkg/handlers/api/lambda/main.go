package main

import (
	"context"

	ddlambda "github.com/DataDog/datadog-lambda-go"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/router"

	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

var ginLambda *ginadapter.GinLambda

func main() {
	tracer.Start()
	defer tracer.Stop()

	lambda.Start(ddlambda.WrapFunction(handler, &ddlambda.Config{DebugLogging: true}))
}

func handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func init() {
	r := router.New()

	ginLambda = ginadapter.New(r)
}
