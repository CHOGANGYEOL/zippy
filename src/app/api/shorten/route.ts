import { db } from "@/lib/db";
import { isRateLimited } from "@/utils/memoryRateLimiter";
import { generateShortCode } from "@/utils/common";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { jsonResponse } from "@/utils/response";

const EXPIRE_AFTER_DAYS = 7 as const;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) return jsonResponse(429, "Too many requests");

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

    return jsonResponse(200, "success", shortCode);
  } catch (err) {
    return jsonResponse(
      500,
      "Internal Server Error",
      err instanceof Error ? err.message : null
    );
  }
}
