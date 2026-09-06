// Plain, framework-agnostic taxonomy — imported by sanity/schemaTypes (build-time,
// Studio schema) and by app/lib code (runtime) alike. Keep free of any Node-only
// imports so it's safe to bundle for the edge runtime (proxy.ts, /go/[slug] route).
//
// Adding a new gear category touches: this file, lib/specs/categories.ts (spec
// fields), sanity/schemaTypes/gearReviews.ts (document type), sanity/structure.ts
// (Studio sidebar), lib/sanity/queries.ts + lib/sanity/transform.ts (data layer).
// The frontend routes/nav/compare tool are generic and pick up new entries here
// automatically — no new route files needed.

export const GEAR_CATEGORIES = [
  "helmets",
  "jackets",
  "gloves",
  "boots",
  "communicators",
  "luggage",
  "suits",
] as const;

export type GearCategory = (typeof GEAR_CATEGORIES)[number];

export const GEAR_CATEGORY_LABELS: Record<GearCategory, string> = {
  helmets: "Helmets",
  jackets: "Jackets",
  gloves: "Gloves",
  boots: "Boots",
  communicators: "Communicators",
  luggage: "Luggage",
  suits: "Suits",
};

export const BIKE_TYPES = [
  "sport",
  "adventure",
  "naked",
  "cruiser",
  "touring",
  "dual-sport",
] as const;

export type BikeType = (typeof BIKE_TYPES)[number];

export const BIKE_TYPE_LABELS: Record<BikeType, string> = {
  sport: "Sport",
  adventure: "Adventure",
  naked: "Naked",
  cruiser: "Cruiser",
  touring: "Touring",
  "dual-sport": "Dual-Sport",
};
