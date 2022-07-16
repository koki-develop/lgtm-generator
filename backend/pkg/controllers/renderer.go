package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Renderer struct{}

func NewRenderer() *Renderer {
	return &Renderer{}
}

func (r *Renderer) OK(ctx *gin.Context, obj interface{}) {
	ctx.JSON(http.StatusOK, obj)
}

func (r *Renderer) BadRequest(ctx *gin.Context) {
	ctx.JSON(http.StatusBadRequest, map[string]string{"message": "bad request"})
}

func (r *Renderer) InternalServerError(ctx *gin.Context, err error) {
	fmt.Printf("error: %+v\n", err)
	ctx.JSON(http.StatusInternalServerError, map[string]string{"message": "internal server error"})
}
