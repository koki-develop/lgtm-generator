package infrastructures

import (
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
	"github.com/kou-pg-0131/lgtm-generator/backend/src/adapters/gateways"
)

type GureguDynamoDB dynamo.DB
type GureguDynamoDBTable dynamo.Table
type GureguDynamoDBQuery dynamo.Query
type GureguDynamoDBPut dynamo.Put

func NewGureguDynamoDB() *GureguDynamoDB {
	sess := session.Must(session.NewSession(&aws.Config{Region: aws.String("us-east-1")}))
	return (*GureguDynamoDB)(dynamo.New(sess))
}

func (db *GureguDynamoDB) guregu() *dynamo.DB {
	return (*dynamo.DB)(db)
}

func (db *GureguDynamoDB) Table(name string) gateways.DynamoDBTable {
	return dynamoDBTableFromGuregu(db.guregu().Table(name))
}

func dynamoDBTableFromGuregu(tbl dynamo.Table) GureguDynamoDBTable {
	return (GureguDynamoDBTable)(tbl)
}

func (tbl GureguDynamoDBTable) guregu() dynamo.Table {
	return (dynamo.Table)(tbl)
}

func (tbl GureguDynamoDBTable) Get(name string, value interface{}) gateways.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(tbl.guregu().Get(name, value))
}

func (tbl GureguDynamoDBTable) Put(item interface{}) gateways.DynamoDBPut {
	return dynamoDBPutFromGuregu(tbl.guregu().Put(item))
}

func dynamoDBQueryFromGuregu(q *dynamo.Query) *GureguDynamoDBQuery {
	return (*GureguDynamoDBQuery)(q)
}

func (q *GureguDynamoDBQuery) guregu() *dynamo.Query {
	return (*dynamo.Query)(q)
}

func (q *GureguDynamoDBQuery) All(out interface{}) error {
	return q.guregu().All(out)
}

func (q *GureguDynamoDBQuery) Index(name string) gateways.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(q.guregu().Index(name))
}

func (q *GureguDynamoDBQuery) Order(order gateways.Order) gateways.DynamoDBQuery {
	var dynamoorder dynamo.Order
	switch order {
	case gateways.OrderAsc:
		dynamoorder = dynamo.Ascending
	case gateways.OrderDesc:
		dynamoorder = dynamo.Descending
	}

	return dynamoDBQueryFromGuregu(q.guregu().Order(dynamoorder))
}

func (q *GureguDynamoDBQuery) Limit(limit int64) gateways.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(q.guregu().Limit(limit))
}

func (p *GureguDynamoDBPut) guregu() *dynamo.Put {
	return (*dynamo.Put)(p)
}

func dynamoDBPutFromGuregu(p *dynamo.Put) *GureguDynamoDBPut {
	return (*GureguDynamoDBPut)(p)
}

func (p *GureguDynamoDBPut) Run() error {
	return p.guregu().Run()
}
