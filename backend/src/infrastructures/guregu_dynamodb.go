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
