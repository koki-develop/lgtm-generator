package gateways

import "github.com/aws/aws-sdk-go/service/dynamodb"

type LastEvaluatedKey map[string]*dynamodb.AttributeValue

type DynamoDBOrder string

const (
	DynamoDBOrderAsc  = "ASC"
	DynamoDBOrderDesc = "DESC"
)

type DynamoDB interface {
	Table(name string) DynamoDBTable
}

type DynamoDBTable interface {
	Get(name string, value interface{}) DynamoDBQuery
	Put(item interface{}) DynamoDBPut
	Update(hashKey string, value interface{}) DynamoDBUpdate
	Delete(hashKey string, value interface{}) DynamoDBDelete
}

type DynamoDBQuery interface {
	All(out interface{}) error
	Index(name string) DynamoDBQuery
	Order(order DynamoDBOrder) DynamoDBQuery
	Limit(limit int64) DynamoDBQuery
	StartFrom(key LastEvaluatedKey) DynamoDBQuery
}

type DynamoDBPut interface {
	Run() error
}

type DynamoDBUpdate interface {
	Run() error
	Range(name string, value interface{}) DynamoDBUpdate
	Set(path string, value interface{}) DynamoDBUpdate
}

type DynamoDBDelete interface {
	Run() error
	Range(name string, value interface{}) DynamoDBDelete
}
