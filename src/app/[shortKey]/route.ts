import { db } from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { redirect } from "next/navigation";

export async function GET(
  _: Request,
  { params }: { params: { shortKey: string } }
) {
  const { shortKey } = params;
  const result = await db.send(
    new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: { shortKey },
    })
  );
  const item = result.Item;
  if (!item || (item.expireAt && Date.now() > item.expireAt)) {
    return new Response("URL expired or not found", { status: 404 });
  }
  return redirect(item.originalUrl);
}
