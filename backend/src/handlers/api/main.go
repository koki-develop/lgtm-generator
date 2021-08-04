package main

import (
	"context"
	"net/http"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
)

var ginLambda *ginadapter.GinLambda

func main() {
	lambda.Start(handler)
}

func handler(ctx context.Context, req events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	return ginLambda.ProxyWithContext(ctx, req)
}

func init() {
	r := gin.Default()

	v1 := r.Group("/v1")
	{
		v1.GET("/h", func(ctx *gin.Context) {
			ctx.JSON(http.StatusOK, map[string]int{
				"status": http.StatusOK,
			})
		})
	}

	ginLambda = ginadapter.New(r)
}
