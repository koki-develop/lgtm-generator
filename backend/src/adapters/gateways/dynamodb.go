package gateways

type Order string

const (
	OrderAsc  = "ASC"
	OrderDesc = "DESC"
)

type DynamoDB interface {
	Table(name string) DynamoDBTable
}

type DynamoDBTable interface {
	Get(name string, value interface{}) DynamoDBQuery
	Put(item interface{}) DynamoDBPut
}

type DynamoDBQuery interface {
	All(out interface{}) error
	Index(name string) DynamoDBQuery
	Order(order Order) DynamoDBQuery
	Limit(limit int64) DynamoDBQuery
}

type DynamoDBPut interface {
	Run() error
}

type DynamoDBUpdate interface {
	Run() error
	Set(path string, value interface{}) DynamoDBUpdate
}
