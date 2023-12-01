import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME;

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const date = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createAt: date.toISOString(),
  };

  await dynamoDB.put({
    TableName,
    Item: auction,

  }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;


