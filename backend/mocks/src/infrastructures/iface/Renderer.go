// Code generated by mockery. DO NOT EDIT.

package mocks

import (
	entities "github.com/koki-develop/lgtm-generator/backend/src/entities"
	iface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"

	mock "github.com/stretchr/testify/mock"
)

// Renderer is an autogenerated mock type for the Renderer type
type Renderer struct {
	mock.Mock
}

// BadRequest provides a mock function with given fields: ctx, code, err
func (_m *Renderer) BadRequest(ctx iface.Context, code entities.ErrCode, err error) {
	_m.Called(ctx, code, err)
}

// Created provides a mock function with given fields: ctx, obj
func (_m *Renderer) Created(ctx iface.Context, obj interface{}) {
	_m.Called(ctx, obj)
}

// Forbidden provides a mock function with given fields: ctx, code, err
func (_m *Renderer) Forbidden(ctx iface.Context, code entities.ErrCode, err error) {
	_m.Called(ctx, code, err)
}

// InternalServerError provides a mock function with given fields: ctx, err
func (_m *Renderer) InternalServerError(ctx iface.Context, err error) {
	_m.Called(ctx, err)
}

// NoContent provides a mock function with given fields: ctx
func (_m *Renderer) NoContent(ctx iface.Context) {
	_m.Called(ctx)
}

// NotFound provides a mock function with given fields: ctx, code, err
func (_m *Renderer) NotFound(ctx iface.Context, code entities.ErrCode, err error) {
	_m.Called(ctx, code, err)
}

// OK provides a mock function with given fields: ctx, obj
func (_m *Renderer) OK(ctx iface.Context, obj interface{}) {
	_m.Called(ctx, obj)
}
