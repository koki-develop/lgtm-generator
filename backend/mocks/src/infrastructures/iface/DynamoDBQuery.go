// Code generated by mockery. DO NOT EDIT.

package mocks

import (
	iface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
	mock "github.com/stretchr/testify/mock"
)

// DynamoDBQuery is an autogenerated mock type for the DynamoDBQuery type
type DynamoDBQuery struct {
	mock.Mock
}

// All provides a mock function with given fields: out
func (_m *DynamoDBQuery) All(out interface{}) error {
	ret := _m.Called(out)

	var r0 error
	if rf, ok := ret.Get(0).(func(interface{}) error); ok {
		r0 = rf(out)
	} else {
		r0 = ret.Error(0)
	}

	return r0
}

// Index provides a mock function with given fields: name
func (_m *DynamoDBQuery) Index(name string) iface.DynamoDBQuery {
	ret := _m.Called(name)

	var r0 iface.DynamoDBQuery
	if rf, ok := ret.Get(0).(func(string) iface.DynamoDBQuery); ok {
		r0 = rf(name)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(iface.DynamoDBQuery)
		}
	}

	return r0
}

// Limit provides a mock function with given fields: limit
func (_m *DynamoDBQuery) Limit(limit int64) iface.DynamoDBQuery {
	ret := _m.Called(limit)

	var r0 iface.DynamoDBQuery
	if rf, ok := ret.Get(0).(func(int64) iface.DynamoDBQuery); ok {
		r0 = rf(limit)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(iface.DynamoDBQuery)
		}
	}

	return r0
}

// Order provides a mock function with given fields: order
func (_m *DynamoDBQuery) Order(order iface.DynamoDBOrder) iface.DynamoDBQuery {
	ret := _m.Called(order)

	var r0 iface.DynamoDBQuery
	if rf, ok := ret.Get(0).(func(iface.DynamoDBOrder) iface.DynamoDBQuery); ok {
		r0 = rf(order)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(iface.DynamoDBQuery)
		}
	}

	return r0
}

// StartFrom provides a mock function with given fields: key
func (_m *DynamoDBQuery) StartFrom(key iface.LastEvaluatedKey) iface.DynamoDBQuery {
	ret := _m.Called(key)

	var r0 iface.DynamoDBQuery
	if rf, ok := ret.Get(0).(func(iface.LastEvaluatedKey) iface.DynamoDBQuery); ok {
		r0 = rf(key)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).(iface.DynamoDBQuery)
		}
	}

	return r0
}
