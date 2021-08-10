package controllers

import "net/http"

type Context interface {
	Next()
	Abort()
	JSON(code int, obj interface{})
	Header(key, value string)
	Status(code int)
	ShouldBindQuery(obj interface{}) error
	ShouldBindJSON(obj interface{}) error
	GetRequest() *http.Request
}
