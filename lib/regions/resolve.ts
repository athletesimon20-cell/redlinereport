import type { NextRequest } from "next/server";
import { REGION_COOKIE, regionFromCountry, isRegionCode, type RegionCode } from "./config";

export const DETECTED_REGION_COOKIE = "region-detected";

/**
 * Single source of truth for resolving a request's region, shared by proxy.ts
 * and the /go/[slug] redirect route so region logic never diverges between them.
 * Precedence: explicit user override cookie > Vercel edge geolocation header > DEFAULT.
 */
export function resolveRegionFromRequest(request: NextRequest, searchParamOverride?: string | null): RegionCode {
  if (isRegionCode(searchParamOverride)) return searchParamOverride;

  const override = request.cookies.get(REGION_COOKIE)?.value;
  if (isRegionCode(override)) return override;

  // Set automatically by Vercel's edge network in production; absent in local dev.
  const country = request.headers.get("x-vercel-ip-country");
  return regionFromCountry(country);
}
