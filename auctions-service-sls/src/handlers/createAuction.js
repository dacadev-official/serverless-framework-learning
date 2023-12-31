import { v4 as uuid } from 'uuid';
import * as AWS from 'aws-sdk';
// import middy from '@middy/core';
// import httpJsonBodyParser from '@middy/http-json-body-parser';
// import httpEventNormalizer from '@middy/http-event-normalizer';
// import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

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

  try {
    await dynamoDB.put({
      TableName,
      Item: auction,
    }).promise();
  } catch (err) {
    console.error(err);
    throw new createError.InternalServerError(err);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;
// export const handler = middy(createAuction)
//   .use(httpJsonBodyParser())
//   .use(httpEventNormalizer())
//   .use(httpErrorHandler());


