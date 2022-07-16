package router

import (
	"github.com/gin-gonic/gin"
	"github.com/koki-develop/lgtm-generator/backend/pkg/controllers/health"
)

func New() *gin.Engine {
	r := gin.Default()

	{
		ctrl := health.New()
		r.GET("/h", ctrl.Standard)
		r.GET("/v1/h", ctrl.Standard)
	}

	return r
}
