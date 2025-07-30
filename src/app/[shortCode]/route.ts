import { db } from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { redirect } from "next/navigation";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await ctx.params;
  const result = await db.send(
    new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: { shortCode },
    })
  );
  const item = result.Item;

  if (
    !item ||
    (item.expireAt && Math.floor(Date.now() / 1000) > item.expireAt)
  ) {
    return new Response("URL expired or not found", { status: 404 });
  }
  return redirect(item.originalUrl);
}
