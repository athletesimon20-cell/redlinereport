import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProductBySlug } from "@/lib/content/products";
import { resolveAffiliateLink } from "@/lib/affiliate/links";
import { resolveRegionFromRequest } from "@/lib/regions/resolve";

/**
 * Single seam every on-page affiliate CTA routes through instead of linking
 * to vendor URLs directly. This is the one place to wire in real click
 * tracking later without touching BuyBox or any MDX content.
 */
function trackAffiliateClick(params: { slug: string; vendor: string; region: string }) {
  // Stub: swap for real analytics (e.g. a server-side event) once affiliate accounts exist.
  console.log("[affiliate-click]", params);
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return NextResponse.redirect(new URL("/", request.url), { status: 307 });
  }

  const { searchParams } = new URL(request.url);
  const vendor = searchParams.get("vendor") ?? "primary";
  const region = resolveRegionFromRequest(request, searchParams.get("region"));

  const destination = resolveAffiliateLink(product, vendor, region);
  trackAffiliateClick({ slug, vendor, region });

  const isExternal = /^https?:\/\//.test(destination);
  return NextResponse.redirect(isExternal ? destination : new URL(destination, request.url), {
    status: 307,
  });
}
