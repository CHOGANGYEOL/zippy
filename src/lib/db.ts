import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.DYNAMODB_REGION,
  credentials: {
    accessKeyId: process.env.DYNAMODB_ACCESS_KEY,
    secretAccessKey: process.env.DYNAMODB_SECRET_KEY,
  },
});

export const db = DynamoDBDocumentClient.from(client);
