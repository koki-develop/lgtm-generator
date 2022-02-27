package infrastructures

import (
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/guregu/dynamo"
	infiface "github.com/koki-develop/lgtm-generator/backend/src/infrastructures/iface"
)

type GureguDynamoDB dynamo.DB
type GureguDynamoDBTable dynamo.Table
type GureguDynamoDBQuery dynamo.Query
type GureguDynamoDBPut dynamo.Put
type GureguDynamoDBUpdate dynamo.Update
type GureguDynamoDBDelete dynamo.Delete

/*
 * db
 */

func NewGureguDynamoDB() *GureguDynamoDB {
	awscfg := &aws.Config{Region: aws.String("us-east-1")}

	if os.Getenv("STAGE") == "local" {
		awscfg.Endpoint = aws.String("http://dynamodb:8000")
		awscfg.Credentials = credentials.NewStaticCredentials("DUMMY_AWS_ACCESS_KEY_ID", "DUMMY_AWS_SECRET_ACCESS_KEY", "")
	}

	sess := session.Must(session.NewSession(awscfg))
	return (*GureguDynamoDB)(dynamo.New(sess))
}

func (db *GureguDynamoDB) guregu() *dynamo.DB {
	return (*dynamo.DB)(db)
}

func (db *GureguDynamoDB) Table(name string) infiface.DynamoDBTable {
	return dynamoDBTableFromGuregu(db.guregu().Table(name))
}

/*
 * table
 */

func dynamoDBTableFromGuregu(tbl dynamo.Table) GureguDynamoDBTable {
	return (GureguDynamoDBTable)(tbl)
}

func (tbl GureguDynamoDBTable) guregu() dynamo.Table {
	return (dynamo.Table)(tbl)
}

func (tbl GureguDynamoDBTable) Get(name string, value interface{}) infiface.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(tbl.guregu().Get(name, value))
}

func (tbl GureguDynamoDBTable) Put(item interface{}) infiface.DynamoDBPut {
	return dynamoDBPutFromGuregu(tbl.guregu().Put(item))
}

func (tbl GureguDynamoDBTable) Update(hashKey string, value interface{}) infiface.DynamoDBUpdate {
	return dynamoDBUpdateFromGuregu(tbl.guregu().Update(hashKey, value))
}

func (tbl GureguDynamoDBTable) Delete(hashKey string, value interface{}) infiface.DynamoDBDelete {
	return dynamoDBDeleteFromGuregu(tbl.guregu().Delete(hashKey, value))
}

/*
 * query
 */

func dynamoDBQueryFromGuregu(q *dynamo.Query) *GureguDynamoDBQuery {
	return (*GureguDynamoDBQuery)(q)
}

func (q *GureguDynamoDBQuery) guregu() *dynamo.Query {
	return (*dynamo.Query)(q)
}

func (q *GureguDynamoDBQuery) All(out interface{}) error {
	return q.guregu().All(out)
}

func (q *GureguDynamoDBQuery) Index(name string) infiface.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(q.guregu().Index(name))
}

func (q *GureguDynamoDBQuery) Order(order infiface.DynamoDBOrder) infiface.DynamoDBQuery {
	var dynamoorder dynamo.Order
	switch order {
	case infiface.DynamoDBOrderAsc:
		dynamoorder = dynamo.Ascending
	case infiface.DynamoDBOrderDesc:
		dynamoorder = dynamo.Descending
	}

	return dynamoDBQueryFromGuregu(q.guregu().Order(dynamoorder))
}

func (q *GureguDynamoDBQuery) Limit(limit int64) infiface.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(q.guregu().Limit(limit))
}

func (q *GureguDynamoDBQuery) StartFrom(key infiface.LastEvaluatedKey) infiface.DynamoDBQuery {
	return dynamoDBQueryFromGuregu(q.guregu().StartFrom(dynamo.PagingKey(key)))
}

/*
 * put
 */

func dynamoDBPutFromGuregu(p *dynamo.Put) *GureguDynamoDBPut {
	return (*GureguDynamoDBPut)(p)
}

func (p *GureguDynamoDBPut) guregu() *dynamo.Put {
	return (*dynamo.Put)(p)
}

func (p *GureguDynamoDBPut) Run() error {
	return p.guregu().Run()
}

/*
 * update
 */

func dynamoDBUpdateFromGuregu(u *dynamo.Update) infiface.DynamoDBUpdate {
	return (*GureguDynamoDBUpdate)(u)
}

func (u *GureguDynamoDBUpdate) guregu() *dynamo.Update {
	return (*dynamo.Update)(u)
}

func (u *GureguDynamoDBUpdate) Run() error {
	return u.guregu().Run()
}

func (u *GureguDynamoDBUpdate) Range(name string, value interface{}) infiface.DynamoDBUpdate {
	return dynamoDBUpdateFromGuregu(u.guregu().Range(name, value))
}

func (u *GureguDynamoDBUpdate) Set(path string, value interface{}) infiface.DynamoDBUpdate {
	return dynamoDBUpdateFromGuregu(u.guregu().Set(path, value))
}

/*
 * delete
 */

func dynamoDBDeleteFromGuregu(d *dynamo.Delete) infiface.DynamoDBDelete {
	return (*GureguDynamoDBDelete)(d)
}

func (d *GureguDynamoDBDelete) guregu() *dynamo.Delete {
	return (*dynamo.Delete)(d)
}

func (d *GureguDynamoDBDelete) Run() error {
	return d.guregu().Run()
}

func (d *GureguDynamoDBDelete) Range(name string, value interface{}) infiface.DynamoDBDelete {
	return dynamoDBDeleteFromGuregu(d.guregu().Range(name, value))
}
