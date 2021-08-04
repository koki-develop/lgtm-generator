package gateways

type DynamoDB interface {
	Table(name string) DynamoDBTable
}

type DynamoDBTable interface {
	Get(name string, value interface{}) DynamoDBQuery
}

type DynamoDBQuery interface {
	All(out interface{}) error
	Index(name string) DynamoDBQuery
}
