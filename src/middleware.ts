import { NextRequest, NextResponse } from "next/server";
import { CommonResponse } from "./app/api/types";

const ALLOWED_ORIGINS = [process.env.BASE_URL];

if (process.env.NODE_ENV !== "production")
  ALLOWED_ORIGINS.push("http://localhost:4000");

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin");

  if (!origin || !ALLOWED_ORIGINS.includes(origin))
    return NextResponse.json(
      {
        code: 403,
        data: null,
        message: "CORS blocked",
      } satisfies CommonResponse,
      { status: 403 }
    );

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
