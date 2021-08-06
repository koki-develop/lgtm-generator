package controllers

import "github.com/kou-pg-0131/lgtm-generator/backend/src/entities"

type Renderer interface {
	OK(ctx Context, obj interface{})
	BadRequest(ctx Context, code entities.ErrCode, err error)
	InternalServerError(ctx Context, err error)
}
