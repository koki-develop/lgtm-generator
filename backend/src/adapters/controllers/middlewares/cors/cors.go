package cors

import (
	"strings"

	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/controllers"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/entities"
	"github.com/pkg/errors"
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
	org := req.Header.Get("Origin")
	if org == "" {
		ctx.Next()
		return
	}

	if !c.validateOrigin(org, c.config.AllowOrigins) {
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

func (c *CORS) validateOrigin(org string, allowOrgs []string) bool {
	for _, allowOrg := range allowOrgs {
		if strings.Contains(org, "*") {
			pref, suff := func() (string, string) {
				s := strings.Split(org, "*")
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
