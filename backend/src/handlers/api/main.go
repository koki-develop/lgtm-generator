package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	ginadapter "github.com/awslabs/aws-lambda-go-api-proxy/gin"
	"github.com/gin-gonic/gin"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	healthctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/health"
	imgsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/images"
	lgtmsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/lgtms"
	rptsctrl "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers/reports"
	imgsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/images"
	lgtmsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/lgtms"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/notifier"
	rptsrepo "github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways/reports"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/infrastructures"
	imgsuc "github.com/kou-pg-0131/lgtm-generator/backend/src/usecases/images"
	lgtmsuc "github.com/kou-pg-0131/lgtm-generator/backend/src/usecases/lgtms"
	rptsuc "github.com/kou-pg-0131/lgtm-generator/backend/src/usecases/reports"
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

	s := infrastructures.NewSlackClient(&infrastructures.SlackClientConfig{
		AccessToken: os.Getenv("SLACK_ACCESS_TOKEN"),
		HTTPAPI:     http.DefaultClient,
	})
	rdr := infrastructures.NewRenderer(&infrastructures.RendererConfig{SlackAPI: s})
	imgse := infrastructures.NewGoogleImageSearchEngine(&infrastructures.GoogleImageSearchEngineConfig{
		APIKey:         os.Getenv("GOOGLE_API_KEY"),
		SearchEngineID: os.Getenv("GOOGLE_CUSTOM_SEARCH_ENGINE_ID"),
	})
	db := infrastructures.NewGureguDynamoDB()
	s3lgtms := infrastructures.NewS3(&infrastructures.S3Config{
		Bucket: fmt.Sprintf("lgtm-generator-backend-%s-lgtms", os.Getenv("STAGE")),
	})
	lgtmgen := infrastructures.NewLGTMGenerator()

	n := notifier.New(&notifier.Config{
		Slack:       s,
		Channel:     fmt.Sprintf("lgtm-generator-backend-%s-reports", os.Getenv("STAGE")),
		FileStorage: s3lgtms,
	})
	lgtmsrepo := lgtmsrepo.NewRepository(&lgtmsrepo.RepositoryConfig{
		LGTMGenerator: lgtmgen,
		DynamoDB:      db,
		DBPrefix:      fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
		FileStorage:   s3lgtms,
	})
	imgsrepo := imgsrepo.NewRepository(&imgsrepo.RepositoryConfig{
		ImageSearchEngine: imgse,
	})
	rptsrepo := rptsrepo.NewRepository(&rptsrepo.RepositoryConfig{
		DynamoDB: db,
		DBPrefix: fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")),
	})

	lgtmsuc := lgtmsuc.NewUsecase(&lgtmsuc.UsecaseConfig{
		LGTMsRepository: lgtmsrepo,
	})
	imgsuc := imgsuc.NewUsecase(&imgsuc.UsecaseConfig{
		ImagesRepository: imgsrepo,
	})
	rptsuc := rptsuc.NewUsecase(&rptsuc.UsecaseConfig{
		ReportsRepository: rptsrepo,
		LGTMsRepository:   lgtmsrepo,
		Notifier:          n,
	})

	v1 := r.Group("/v1")
	{
		ctrl := healthctrl.NewController(&healthctrl.ControllerConfig{
			Renderer: rdr,
		})
		v1.GET("/h", withContext(ctrl.Standard))
	}
	{
		ctrl := imgsctrl.NewController(&imgsctrl.ControllerConfig{
			Renderer:      rdr,
			ImagesUsecase: imgsuc,
		})
		v1.GET("/images", withContext(ctrl.Search))
	}
	{
		ctrl := lgtmsctrl.NewController(&lgtmsctrl.ControllerConfig{
			Renderer:     rdr,
			LGTMsUsecase: lgtmsuc,
		})
		v1.GET("/lgtms", withContext(ctrl.Index))
		v1.POST("/lgtms", withContext(ctrl.Create))
	}
	{
		ctrl := rptsctrl.NewController(&rptsctrl.ControllerConfig{
			Renderer:       rdr,
			ReportsUsecase: rptsuc,
		})
		v1.POST("/reports", withContext(ctrl.Create))
	}

	ginLambda = ginadapter.New(r)
}
