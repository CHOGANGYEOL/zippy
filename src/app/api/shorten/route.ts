import { db } from "@/lib/db";
import { isRateLimited } from "@/utils/memoryRateLimiter";
import { generateShortCode } from "@/utils/common";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";
import { CommonResponse } from "../types";

const EXPIRE_AFTER_DAYS = 7 as const;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip))
      return NextResponse.json(
        {
          code: 429,
          message: "Too many requests",
          data: null,
        } satisfies CommonResponse,
        { status: 429 }
      );

    const { originalUrl } = await req.json();

    const now = Date.now();
    const shortCode = generateShortCode();
    const expireAt = Math.floor(now / 1000) + EXPIRE_AFTER_DAYS * 24 * 60 * 60;
    const createdAt = new Date(now).toISOString();

    await db.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
          shortCode,
          originalUrl,
          expireAt,
          createdAt,
        },
      })
    );

    return NextResponse.json({
      code: 0,
      message: "success",
      data: shortCode,
    } satisfies CommonResponse<string>);
  } catch (err) {
    return NextResponse.json(
      {
        code: 500,
        message: "Internal Server Error",
        data: err instanceof Error ? err.message : null,
      } satisfies CommonResponse,
      {
        status: 500,
      }
    );
  }
}
