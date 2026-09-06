import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REGION_COOKIE } from "@/lib/regions/config";
import { resolveRegionFromRequest, DETECTED_REGION_COOKIE } from "@/lib/regions/resolve";

// Next.js 16 renamed Middleware to Proxy; this file replaces the old middleware.ts.
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  const hasOverride = request.cookies.has(REGION_COOKIE);
  const region = resolveRegionFromRequest(request);

  // Server code (e.g. the /go/[slug] redirect route) reads the resolved region off this header.
  response.headers.set("x-user-region", region);

  // Mirror the detection into a plain (non-httpOnly) cookie so client components can read the
  // auto-detected region without forcing every page into dynamic rendering. The user's own
  // manual choice (region-override) always takes precedence and is never overwritten here.
  if (!hasOverride) {
    response.cookies.set(DETECTED_REGION_COOKIE, region, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|static/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
