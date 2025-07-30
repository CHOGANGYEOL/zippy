import { db } from "@/lib/db";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextResponse } from "next/server";

const EXPIRE_AFTER_DAYS = 7 as const;

export async function POST(req: Request) {
  const { originalUrl, shortCode } = await req.json();

  const now = Date.now();
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

  return NextResponse.json({ success: true });
}

export async function GET() {
  try {
    const result = await db.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
      })
    );

    return NextResponse.json({
      items: result.Items ?? [],
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        message: "Failed to scan table",
      },
      { status: 500 }
    );
  }
}
