package infrastructures

import (
	"github.com/gin-gonic/gin"
)

type GinContext struct {
	*gin.Context
}

func NewContextFromGin(ctx *gin.Context) *GinContext {
	return &GinContext{
		Context: ctx,
	}
}
