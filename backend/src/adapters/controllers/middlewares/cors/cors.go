package cors

import (
	"strings"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
)

type CORS struct {
	config *Config
}

type Config struct {
	Renderer     controllers.Renderer
	AllowOrigins []string
	AllowMethods []string
	AllowHeaders []string
}

func New(cfg *Config) *CORS {
	return &CORS{config: cfg}
}

func (c *CORS) Apply(ctx controllers.Context) {
	req := ctx.GetRequest()
	if req.Header.Get("Origin") == "" {
		ctx.Next()
		return
	}

	// FIXME: validate origin

	ctx.Header("Access-Control-Allow-Origin", strings.Join(c.config.AllowOrigins, ","))
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
