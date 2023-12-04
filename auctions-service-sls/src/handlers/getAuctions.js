import * as AWS from 'aws-sdk';
// import middy from '@middy/core';
// import httpJsonBodyParser from '@middy/http-json-body-parser';
// import httpEventNormalizer from '@middy/http-event-normalizer';
// import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME;

async function getAuctions(event, context) {
  let auctions;

  try {
    const results = await dynamoDB.scan({
        TableName
    }).promise();

    auctions = results.Items;
  } catch (err) {
    console.error(err);
    throw new createError.InternalServerError(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auctions),
  };
}

export const handler = getAuctions;
// export const handler = middy(getAuctions)
//   .use(httpJsonBodyParser())
//   .use(httpEventNormalizer())
//   .use(httpErrorHandler());


