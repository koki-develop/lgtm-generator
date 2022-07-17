package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ErrorResponse struct {
	Code ErrCode `json:"code"`
}

type Renderer struct{}

func NewRenderer() *Renderer {
	return &Renderer{}
}

func (r *Renderer) OK(ctx *gin.Context, obj interface{}) {
	ctx.JSON(http.StatusOK, obj)
}

func (r *Renderer) NoContent(ctx *gin.Context) {
	ctx.Status(http.StatusNoContent)
}

func (r *Renderer) BadRequest(ctx *gin.Context, code ErrCode) {
	r.renderError(ctx, http.StatusBadRequest, code)
}

func (r *Renderer) Forbidden(ctx *gin.Context) {
	r.renderError(ctx, http.StatusForbidden, ErrCodeForbidden)
}

func (r *Renderer) InternalServerError(ctx *gin.Context, err error) {
	fmt.Printf("error: %+v\n", err)
	r.renderError(ctx, http.StatusInternalServerError, ErrCodeInternalServerError)
}

func (r *Renderer) renderError(ctx *gin.Context, status int, code ErrCode) {
	ctx.JSON(status, &ErrorResponse{Code: code})
}
