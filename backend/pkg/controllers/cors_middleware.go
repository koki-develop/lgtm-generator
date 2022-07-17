package controllers

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type CORSMiddleware struct {
	Renderer    *Renderer
	AllowOrigin string
}

func NewCORSMiddleware(origin string) *CORSMiddleware {
	return &CORSMiddleware{AllowOrigin: origin}
}

func (m *CORSMiddleware) Apply(ctx *gin.Context) {
	org := ctx.Request.Header.Get("origin")
	if org == "" {
		ctx.Next()
		return
	}

	if !m.validateOrigin(org) {
		m.Renderer.Forbidden(ctx)
		ctx.Abort()
		return
	}

	ctx.Header("Access-Control-Allow-Origin", org)
	ctx.Header("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Origin,Content-Length,Content-Type,Accept-Encoding")

	if ctx.Request.Method == http.MethodOptions {
		m.Renderer.NoContent(ctx)
		ctx.Abort()
		return
	}
}

func (m *CORSMiddleware) validateOrigin(org string) bool {
	if strings.Contains(m.AllowOrigin, "*") {
		pref, suff := func() (string, string) {
			s := strings.Split(m.AllowOrigin, "*")
			return s[0], s[1]
		}()
		if strings.HasPrefix(org, pref) && strings.HasSuffix(org, suff) {
			return true
		}
	} else {
		if org == m.AllowOrigin {
			return true
		}
	}

	return false
}
