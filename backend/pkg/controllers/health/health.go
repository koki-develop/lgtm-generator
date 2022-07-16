package health

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HealthController struct{}

func New() *HealthController {
	return &HealthController{}
}

func (ctrl *HealthController) Standard(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, map[string]string{"status": "ok"})
}
