import { REGION_CONFIG, type RegionCode } from "@/lib/regions/config";

interface PriceLike {
  amount: number;
  currency: string;
  asOf?: string;
}

/** Resolves a product's price for a region: regional override if present, else the base USD price. */
export function resolveRegionalPrice(
  base: PriceLike,
  regionalPricing: Record<string, PriceLike> | undefined,
  region: RegionCode
): PriceLike {
  return regionalPricing?.[region] ?? base;
}

export function formatPrice(price: PriceLike, region: RegionCode): string {
  const locale = REGION_CONFIG[region].locale;
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: price.currency,
      maximumFractionDigits: price.amount % 1 === 0 ? 0 : 2,
    }).format(price.amount);
  } catch {
    return `$${price.amount.toFixed(0)}`;
  }
}
