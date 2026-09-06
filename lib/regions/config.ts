export const SUPPORTED_REGIONS = [
  "US",
  "UK",
  "EU",
  "CA",
  "AU",
  "DEFAULT",
] as const;

export type RegionCode = (typeof SUPPORTED_REGIONS)[number];

export const REGION_CONFIG: Record<RegionCode, { label: string; currency: string; locale: string }> = {
  US: { label: "United States", currency: "USD", locale: "en-US" },
  UK: { label: "United Kingdom", currency: "GBP", locale: "en-GB" },
  EU: { label: "European Union", currency: "EUR", locale: "de-DE" },
  CA: { label: "Canada", currency: "CAD", locale: "en-CA" },
  AU: { label: "Australia", currency: "AUD", locale: "en-AU" },
  DEFAULT: { label: "Everywhere else", currency: "USD", locale: "en-US" },
};

/** ISO 3166-1 alpha-2 country -> RegionCode. Unmapped countries fall back to DEFAULT. */
const COUNTRY_TO_REGION: Record<string, RegionCode> = {
  US: "US",
  GB: "UK",
  CA: "CA",
  AU: "AU",
  // Eurozone + broader EU
  DE: "EU",
  FR: "EU",
  ES: "EU",
  IT: "EU",
  NL: "EU",
  BE: "EU",
  AT: "EU",
  IE: "EU",
  PT: "EU",
  PL: "EU",
  SE: "EU",
  DK: "EU",
  FI: "EU",
};

export function regionFromCountry(countryCode: string | undefined | null): RegionCode {
  if (!countryCode) return "DEFAULT";
  return COUNTRY_TO_REGION[countryCode.toUpperCase()] ?? "DEFAULT";
}

export function isRegionCode(value: string | undefined | null): value is RegionCode {
  return !!value && (SUPPORTED_REGIONS as readonly string[]).includes(value);
}

export const REGION_COOKIE = "region-override";
