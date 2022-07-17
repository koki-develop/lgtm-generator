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
		repo := repositories.NewLGTMsRepository()
		ctrl := controllers.NewLGTMsController(repo)
		v1.GET("/lgtms", ctrl.FindAll)
	}

	return r
}
