import type { RegionCode } from "@/lib/regions/config";

export interface AffiliateLinkedProduct {
  slug: string;
  permalink: string;
  affiliateLinks: Record<string, Record<string, string>>;
}

export const DEFAULT_VENDOR = "primary";

/**
 * Resolution order: exact region for the vendor -> vendor's DEFAULT -> primary vendor's
 * DEFAULT -> the product's own page (never a dead link). This is the one place link
 * resolution happens, reused by the BuyBox's href builder and the /go/[slug] route itself.
 */
export function resolveAffiliateLink(
  product: AffiliateLinkedProduct,
  vendor: string | undefined,
  region: RegionCode
): string {
  const vendorKey = vendor && product.affiliateLinks[vendor] ? vendor : DEFAULT_VENDOR;
  const vendorLinks = product.affiliateLinks[vendorKey];

  if (vendorLinks) {
    if (vendorLinks[region]) return vendorLinks[region];
    if (vendorLinks.DEFAULT) return vendorLinks.DEFAULT;
  }

  const primaryLinks = product.affiliateLinks[DEFAULT_VENDOR];
  if (primaryLinks?.DEFAULT) return primaryLinks.DEFAULT;

  return product.permalink;
}

/** Builds the internal redirect URL every on-page CTA should point at, never a raw vendor URL. */
export function buildGoHref(product: { slug: string }, vendor?: string): string {
  const params = vendor && vendor !== DEFAULT_VENDOR ? `?vendor=${encodeURIComponent(vendor)}` : "";
  return `/go/${product.slug}${params}`;
}
