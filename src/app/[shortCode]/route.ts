import { db } from "@/lib/db";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { redirect } from "next/navigation";
import { CommonResponse } from "../api/types";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  ctx: { params: Promise<{ shortCode: string }> }
) {
  const { shortCode } = await ctx.params;
  const { Item: item } = await db.send(
    new GetCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME,
      Key: { shortCode },
    })
  );

  if (
    !item ||
    (item.expireAt && Math.floor(Date.now() / 1000) > item.expireAt)
  ) {
    return NextResponse.json(
      {
        code: 404,
        message: "URL expired or not found",
        data: null,
      } satisfies CommonResponse,
      { status: 404 }
    );
  }
  return redirect(item.originalUrl);
}
