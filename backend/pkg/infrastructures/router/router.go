package router

import (
	"os"

	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/controllers"
	"github.com/koki-develop/lgtm-generator/backend/pkg/infrastructures/imagesearch"
)

func New() *gin.Engine {
	r := gin.Default()

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
		ctrl := controllers.NewLGTMsController()
		v1.GET("/lgtms", ctrl.FindAll)
	}

	return r
}
