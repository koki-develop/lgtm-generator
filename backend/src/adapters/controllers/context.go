package controllers

type Context interface {
	JSON(code int, obj interface{})
	ShouldBindQuery(obj interface{}) error
	ShouldBindJSON(obj interface{}) error
	GetRequestID() string
}
