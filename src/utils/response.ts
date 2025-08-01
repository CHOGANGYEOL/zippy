import { CommonResponse } from "@/app/api/types";
import { NextResponse } from "next/server";

export function jsonResponse<T = unknown>(
  status: number,
  message: string,
  data: T | null = null
) {
  return NextResponse.json(
    {
      code: status,
      message,
      data,
    } satisfies CommonResponse<T>,
    { status }
  );
}

export function respond<T>(
  status: number,
  message: string,
  isBrowser: boolean,
  data: T | null = null
) {
  if (isBrowser) {
    const html = `
      <html>
        <head><title>${status} Error</title></head>
        <body style="font-family:sans-serif;text-align:center;margin-top:5rem;">
          <h1>${status} - ${message}</h1>
          ${data ? `<pre>${data}</pre>` : ""}
        </body>
      </html>
    `.trim();

    return new Response(html, {
      status,
      headers: { "Content-Type": "text/html" },
    });
  }

  return jsonResponse(status, message, data);
}
