package main

import (
	"context"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/health"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/infrastructures"
)

var ginLambda *ginadapter.GinLambda

func withContext(h func(ctx controllers.Context)) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		h(infrastructures.NewContextFromGin(ctx))
	}
}

func main() {
	lambda.Start(handler)
}

func handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func init() {
	r := gin.Default()

	rdr := infrastructures.NewRenderer()

	v1 := r.Group("/v1")
	{
		ctrl := health.NewController(&health.ControllerConfig{Renderer: rdr})
		v1.GET("/h", withContext(ctrl.Standard))
	}

	ginLambda = ginadapter.New(r)
}
