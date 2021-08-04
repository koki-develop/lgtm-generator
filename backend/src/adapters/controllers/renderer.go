package controllers

type Renderer interface {
	OK(ctx Context, obj interface{})
}
