package controllers

type Renderer interface {
	OK(ctx Context, obj interface{})
	BadRequest(ctx Context)
	InternalServerError(ctx Context)
}
