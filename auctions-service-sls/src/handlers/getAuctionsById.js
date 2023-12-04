import * as AWS from 'aws-sdk';
// import middy from '@middy/core';
// import httpJsonBodyParser from '@middy/http-json-body-parser';
// import httpEventNormalizer from '@middy/http-event-normalizer';
// import httpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.AUCTIONS_TABLE_NAME;

async function getAuctionsById(event, context) {
  const { id } = event.pathParameters;
  let auction;

  try {
    const result = await dynamoDB.get({
      TableName,
      Key: { id },
    }).promise();

    auction = result.Item;
  } catch (err) {
    console.error(err);
    throw new createError.InternalServerError(err);
  }

  if (!auction) {
    throw new createError.NotFound(`Auction with ID "${id}" not found!`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(auction),
  };
}

export const handler = getAuctionsById;
// export const handler = middy(getAuctionsById)
  // .use(httpJsonBodyParser())
  // .use(httpEventNormalizer())
  // .use(httpErrorHandler());


