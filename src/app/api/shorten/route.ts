import { db } from "@/lib/db";
import { isRateLimited } from "@/lib/memoryRateLimiter";
import { generateShortCode } from "@/utils/common";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

const EXPIRE_AFTER_DAYS = 7 as const;

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip))
    return NextResponse.json("Too many request", { status: 429 });

  const { originalUrl } = await req.json();

  const now = Date.now();
  const shortCode = generateShortCode();
  const expireAt = now + EXPIRE_AFTER_DAYS * 24 * 60 * 60 * 1000;
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

  return NextResponse.json({ success: true, shortCode });
}
