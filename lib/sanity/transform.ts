import type { GearCategory } from "@/lib/taxonomy";

const TYPE_TO_CATEGORY: Record<string, GearCategory> = {
  helmetReview: "helmets",
  jacketReview: "jackets",
  gloveReview: "gloves",
  bootReview: "boots",
  communicatorReview: "communicators",
  luggageReview: "luggage",
  suitReview: "suits",
};

export function categoryFromType(sanityType: string): GearCategory | undefined {
  return TYPE_TO_CATEGORY[sanityType];
}

export function permalinkFor(sanityType: string, slug: string): string {
  const category = categoryFromType(sanityType);
  return category ? `/gear/${category}/${slug}` : `/bikes/${slug}`;
}

interface RawAffiliateLink {
  vendor?: string;
  region?: string;
  url?: string;
}

export function groupAffiliateLinks(raw: RawAffiliateLink[] | null | undefined): Record<string, Record<string, string>> {
  const grouped: Record<string, Record<string, string>> = {};
  for (const link of raw ?? []) {
    if (!link?.vendor || !link?.region || !link?.url) continue;
    grouped[link.vendor] ??= {};
    grouped[link.vendor][link.region] = link.url;
  }
  return grouped;
}

interface RawRegionalPrice {
  region?: string;
  amount?: number;
  currency?: string;
}

export function groupRegionalPricing(
  raw: RawRegionalPrice[] | null | undefined
): Record<string, { amount: number; currency: string }> | undefined {
  const entries = (raw ?? []).filter((r): r is Required<RawRegionalPrice> => Boolean(r?.region && r.amount && r.currency));
  if (entries.length === 0) return undefined;
  const grouped: Record<string, { amount: number; currency: string }> = {};
  for (const entry of entries) grouped[entry.region] = { amount: entry.amount, currency: entry.currency };
  return grouped;
}

export function initialsFromName(name: string | undefined): string {
  if (!name) return "??";
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
