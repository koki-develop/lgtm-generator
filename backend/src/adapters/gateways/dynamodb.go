package gateways

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
}

type DynamoDBQuery interface {
	All(out interface{}) error
	Index(name string) DynamoDBQuery
	Order(order DynamoDBOrder) DynamoDBQuery
	Limit(limit int64) DynamoDBQuery
}

type DynamoDBPut interface {
	Run() error
}

type DynamoDBUpdate interface {
	Run() error
	Range(name string, value interface{}) DynamoDBUpdate
	Set(path string, value interface{}) DynamoDBUpdate
}
