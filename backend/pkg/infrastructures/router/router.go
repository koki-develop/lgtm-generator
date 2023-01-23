package router

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/controllers"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/dynamodb"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/imagesearch"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/lgtmgen"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/s3"
	"github.com/koki-develop/lgtm-generator/backend/pkg/repositories"
	"github.com/slack-go/slack"
	gintracer "gopkg.in/DataDog/dd-trace-go.v1/contrib/gin-gonic/gin"
)

func New() *gin.Engine {
	r := gin.New()
	r.Use(gintracer.Middleware("lgtm-generator-backend"))

	engine := imagesearch.New(os.Getenv("GOOGLE_API_KEY"), os.Getenv("GOOGLE_CUSTOM_SEARCH_ENGINE_ID"))
	slackClient := slack.New(os.Getenv("SLACK_API_TOKEN"))
	db := dynamodb.New()
	g := lgtmgen.New()
	bucket := fmt.Sprintf("lgtm-generator-backend-%s-images", os.Getenv("STAGE"))
	s3client := s3.New(bucket)

	// middleware
	{
		logger := controllers.NewLoggerMiddleware()
		errresp := controllers.NewErrorResponseLoggerMiddleware(slackClient, fmt.Sprintf("lgtm-generator-backend-%s-errors", os.Getenv("STAGE")))
		cors := controllers.NewCORSMiddleware(os.Getenv("ALLOW_ORIGIN"))

		r.Use(gin.Recovery())
		r.Use(logger.Apply())
		r.Use(errresp.Apply)
		r.Use(cors.Apply)
	}

	// health
	{
		ctrl := controllers.NewHealthController()
		r.GET("/h", ctrl.Standard)
		r.GET("/v1/h", ctrl.Standard)
	}

	v1 := r.Group("/v1")

	// images
	{
		ctrl := controllers.NewImagesController(engine)
		v1.GET("/images", ctrl.Search)
	}

	// lgtms
	{
		repo := repositories.NewLGTMsRepository(s3client, db)
		ctrl := controllers.NewLGTMsController(g, slackClient, fmt.Sprintf("lgtm-generator-backend-%s-lgtms", os.Getenv("STAGE")), repo)
		v1.GET("/lgtms", ctrl.FindAll)
		v1.POST("/lgtms", ctrl.Create)
	}

	// reports
	{
		repo := repositories.NewReportsRepository(db, fmt.Sprintf("lgtm-generator-backend-%s", os.Getenv("STAGE")))
		ctrl := controllers.NewReportsController(slackClient, fmt.Sprintf("lgtm-generator-backend-%s-reports", os.Getenv("STAGE")), repo)
		v1.POST("/reports", ctrl.Create)
	}

	{
		rdr := controllers.NewRenderer()
		r.NoRoute(rdr.NotFound)
	}

	return r
}
