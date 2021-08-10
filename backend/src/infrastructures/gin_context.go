package infrastructures

import (
	"net/http"

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

func (ctx *GinContext) GetRequest() *http.Request {
	return ctx.Context.Request
}
