package middlewares

import (
	"strings"

	"github.com/koki-develop/lgtm-generator/backend/src/entities"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	"github.com/pkg/errors"
)

type CORSMiddleware struct {
	config *CORSMiddlewareConfig
}

type CORSMiddlewareConfig struct {
	Renderer     infiface.Renderer
	AllowOrigins []string
	AllowMethods []string
	AllowHeaders []string
}

func NewCORSMiddleware(cfg *CORSMiddlewareConfig) *CORSMiddleware {
	return &CORSMiddleware{config: cfg}
}

func (c *CORSMiddleware) Apply(ctx infiface.Context) {
	req := ctx.GetRequest()
	org := req.Header.Get("Origin")
	if org == "" {
		ctx.Next()
		return
	}

	if !c.validateOrigin(org) {
		c.config.Renderer.Forbidden(ctx, entities.ErrCodeForbidden, errors.Errorf("not allowed origin: %s", org))
		ctx.Abort()
		return
	}

	ctx.Header("Access-Control-Allow-Origin", org)
	ctx.Header("Access-Control-Allow-Methods", strings.Join(c.config.AllowMethods, ","))
	ctx.Header("Access-Control-Allow-Headers", strings.Join(c.config.AllowHeaders, ","))

	if req.Method == "OPTIONS" {
		c.config.Renderer.NoContent(ctx)
		ctx.Abort()
		return
	} else {
		ctx.Next()
		return
	}
}

func (c *CORSMiddleware) validateOrigin(org string) bool {
	for _, allowOrg := range c.config.AllowOrigins {
		if strings.Contains(allowOrg, "*") {
			pref, suff := func() (string, string) {
				s := strings.Split(allowOrg, "*")
				return s[0], s[1]
			}()
			if strings.HasPrefix(org, pref) && strings.HasSuffix(org, suff) {
				return true
			}
		} else {
			if org == allowOrg {
				return true
			}
		}
	}

	return false
}
