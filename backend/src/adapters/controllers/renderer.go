package controllers

type Renderer interface {
	OK(ctx Context, obj interface{})
	BadRequest(ctx Context, err error)
	InternalServerError(ctx Context, err error)
}
