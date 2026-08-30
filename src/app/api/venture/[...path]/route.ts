import { NextRequest, NextResponse } from "next/server";

// ─── Server-side proxy for cross-origin business API calls ─────
// This route proxies requests from the portfolio frontend to the
// TIXSYNC business backend, keeping the API key server-side only.
//
// The client calls: /api/venture/[...path]
// This server routes to: BUSINESS_API_URL/api/[...path]

const BUSINESS_API_URL = process.env.NEXT_PUBLIC_BUSINESS_API_URL || "https://tixsync-business-pixelcode254.vercel.app";
const BUSINESS_API_KEY = process.env.NEXT_PUBLIC_BUSINESS_API_KEY || "";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return proxyRequest(request, params.path);
}

async function proxyRequest(
  request: NextRequest,
  pathSegments: string[]
) {
  const path = pathSegments.join("/");
  const url = new URL(request.url);
  const targetUrl = `${BUSINESS_API_URL}/api/${path}${url.search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Attach API key for server-to-server auth
  if (BUSINESS_API_KEY) {
    headers["X-API-Key"] = BUSINESS_API_KEY;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const body = request.method !== "GET" && request.method !== "HEAD"
      ? await request.text()
      : undefined;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const contentType = response.headers.get("content-type") || "application/json";
    const data = await response.text();

    return new NextResponse(data, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Proxy error";
    console.error(`[VentureProxy] ${path}:`, message);
    return NextResponse.json(
      { error: "Failed to reach business API", detail: message },
      { status: 502 }
    );
  }
}
