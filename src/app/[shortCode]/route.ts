import { db } from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { redirect } from "next/navigation";
import { respond } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  ctx: { params: Promise<{ shortCode: string }> }
) {
  const acceptHeader = request.headers.get("accept") ?? "";
  const isBrowser = acceptHeader.includes("text/html");

  try {
    const { shortCode } = await ctx.params;

    const { Item: item } = await db.send(
      new GetCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: { shortCode },
      })
    );

    if (!item) return respond(404, "URL not found", isBrowser);

    const now = Math.floor(Date.now() / 1000);

    if (item.expireAt && now > item.expireAt)
      return respond(410, "URL has expired", isBrowser);

    return NextResponse.redirect(item.originalUrl, 302);
  } catch (err) {
    return respond(
      500,
      "Internal Server Error",
      isBrowser,
      err instanceof Error ? err.message : null
    );
  }
}
