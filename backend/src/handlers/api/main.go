package main

import (
	"context"
	"fmt"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	healthctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/health"
	imgsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/images"
	lgtmsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/lgtms"
	imgsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/images"
	lgtmsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/lgtms"
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
	imgse := infrastructures.NewGoogleImageSearchEngine(&infrastructures.GoogleImageSearchEngineConfig{
		APIKey:         os.Getenv("GOOGLE_API_KEY"),
		SearchEngineID: os.Getenv("GOOGLE_CUSTOM_SEARCH_ENGINE_ID"),
	})
	db := infrastructures.NewGureguDynamoDB()
	s3 := infrastructures.NewS3(&infrastructures.S3Config{
		Bucket: fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
	})
	lgtmgen := infrastructures.NewLGTMGenerator()

	v1 := r.Group("/v1")
	{
		ctrl := healthctrl.NewController(&healthctrl.ControllerConfig{
			Renderer: rdr,
		})
		v1.GET("/h", withContext(ctrl.Standard))
	}
	{
		ctrl := imgsctrl.NewController(&imgsctrl.ControllerConfig{
			Renderer: rdr,
			ImagesRepository: imgsrepo.NewRepository(&imgsrepo.RepositoryConfig{
				ImageSearchEngine: imgse,
			}),
		})
		v1.GET("/images", withContext(ctrl.Search))
	}
	{
		ctrl := lgtmsctrl.NewController(&lgtmsctrl.ControllerConfig{
			Renderer: rdr,
			LGTMsRepository: lgtmsrepo.NewRepository(&lgtmsrepo.RepositoryConfig{
				LGTMGenerator: lgtmgen,
				DynamoDB:      db,
				DBPrefix:      fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
				FileStorage:   s3,
			}),
		})
		v1.GET("/lgtms", withContext(ctrl.Index))
		v1.POST("/lgtms", withContext(ctrl.Create))
	}

	ginLambda = ginadapter.New(r)
}
