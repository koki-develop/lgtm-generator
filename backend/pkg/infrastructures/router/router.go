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
)

func New() *gin.Engine {
	r := gin.Default()

	// cors
	{
		m := controllers.NewCORSMiddleware(os.Getenv("ALLOW_ORIGIN"))
		r.Use(m.Apply)
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
		engine := imagesearch.New(os.Getenv("GOOGLE_API_KEY"), os.Getenv("GOOGLE_CUSTOM_SEARCH_ENGINE_ID"))
		ctrl := controllers.NewImagesController(engine)
		v1.GET("/images", ctrl.Search)
	}

	// lgtms
	{
		g := lgtmgen.New()
		bucket := fmt.Sprintf("lgtm-generator-backend-%s-images", os.Getenv("STAGE"))
		s3client := s3.New(bucket)
		db := dynamodb.New()

		repo := repositories.NewLGTMsRepository(s3client, db)
		ctrl := controllers.NewLGTMsController(g, repo)
		v1.GET("/lgtms", ctrl.FindAll)
		v1.POST("/lgtms", ctrl.Create)
	}

	return r
}
