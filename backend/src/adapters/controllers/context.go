package controllers

type Context interface {
	Next()
	Abort()
	JSON(code int, obj interface{})
	Status(code int)
	ShouldBindQuery(obj interface{}) error
	ShouldBindJSON(obj interface{}) error
}
