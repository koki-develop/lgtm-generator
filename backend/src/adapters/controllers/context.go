package controllers

type Context interface {
	JSON(code int, obj interface{})
	Query(key string) string
}
