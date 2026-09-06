// GROQ query fragments. Projections deliberately reshape Sanity's explicit,
// editor-friendly fields (and array-of-object "records") back into the flat
// `specs` / `affiliateLinks` / `regionalPricing` shape the rest of the app
// already expects (see lib/sanity/transform.ts for the array->Record step
// done in JS after fetch) — so components never needed to change.

export const GEAR_TYPES = [
  "helmetReview",
  "jacketReview",
  "gloveReview",
  "bootReview",
  "communicatorReview",
  "luggageReview",
  "suitReview",
] as const;

const SPECS_BY_TYPE: Record<string, string> = {
  helmetReview: `"specs": {weightGrams, shellMaterial, certification, fieldOfViewHorizontal, ventPorts, pinlockIncluded, sizes}`,
  jacketReview: `"specs": {material, armorRating, waterproof, ventilationPanels, weightGrams, sizes}`,
  gloveReview: `"specs": {material, knuckleProtection, waterproof, touchscreenCompatible, sizes}`,
  bootReview: `"specs": {material, ankleProtection, waterproof, soleType, sizes}`,
  communicatorReview: `"specs": {intercomRiders, rangeMeters, batteryLifeHours, waterproofRating, meshTech}`,
  luggageReview: `"specs": {capacityLiters, material, mountingType, waterproof, lockable, weightGrams}`,
  suitReview: `"specs": {suitType, material, armorRating, humpIncluded, waterproof, weightGrams, sizes}`,
  bikeReview: `bikeType, "specs": {engineCc, horsepower, torqueNm, weightKg, seatHeightMm, fuelCapacityLiters, "priceUSD": price.amount}`,
};

function conditionalSpecs(types: readonly string[]) {
  return types.map((t) => `_type == "${t}" => { ${SPECS_BY_TYPE[t]} }`).join(",\n  ");
}

const COMMON_PROJECTION = `
  _id,
  _type,
  title,
  "slug": slug.current,
  brand,
  model,
  excerpt,
  legacy,
  "heroImage": heroImage.asset->{
    "src": url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
    "blurDataURL": metadata.lqip
  },
  "gallery": gallery[]{
    "image": image.asset->{"src": url, "width": metadata.dimensions.width, "height": metadata.dimensions.height},
    caption
  },
  rating{overall, "breakdown": breakdown[]{label, value}},
  pros,
  cons,
  price{amount, currency, "asOf": asOf},
  "regionalPricingRaw": regionalPricing[]{region, amount, currency},
  "affiliateLinksRaw": affiliateLinks[]{vendor, region, url},
  "relatedSlugs": relatedReviews[]->slug.current,
  "author": author->{
    name,
    role,
    bio,
    "avatarUrl": avatar.asset->url
  },
  publishedAt,
  "updatedAt": _updatedAt,
  seoDescription,
  "body": body[]{
    ...,
    _type == "figureBlock" => {
      ...,
      "imageUrl": image.asset->url
    },
    _type == "competitorCardBlock" => {
      ...,
      "linkedReviewSlug": linkedReview->slug.current,
      "linkedReviewType": linkedReview->_type
    }
  }
`;

export const ALL_GEAR_QUERY = `
*[_type in [${GEAR_TYPES.map((t) => `"${t}"`).join(", ")}] && defined(slug.current) && legacy != true] | order(publishedAt desc) {
  ${COMMON_PROJECTION},
  ${conditionalSpecs(GEAR_TYPES)}
}`;

export const ALL_BIKES_QUERY = `
*[_type == "bikeReview" && defined(slug.current) && legacy != true] | order(publishedAt desc) {
  ${COMMON_PROJECTION},
  ${SPECS_BY_TYPE.bikeReview}
}`;

// Legacy/discontinued gear and bikes together — kept out of the regular
// listings and compare tool (see the `legacy != true` filters above) and
// surfaced only on the dedicated /legacy page instead.
export const ALL_LEGACY_QUERY = `
*[_type in [${[...GEAR_TYPES, "bikeReview"].map((t) => `"${t}"`).join(", ")}] && defined(slug.current) && legacy == true] | order(publishedAt desc) {
  ${COMMON_PROJECTION},
  ${conditionalSpecs(GEAR_TYPES)},
  _type == "bikeReview" => { ${SPECS_BY_TYPE.bikeReview} }
}`;

export const PRODUCT_BY_SLUG_QUERY = `
*[_type in [${[...GEAR_TYPES, "bikeReview"].map((t) => `"${t}"`).join(", ")}] && slug.current == $slug][0] {
  ${COMMON_PROJECTION},
  ${conditionalSpecs(GEAR_TYPES)},
  _type == "bikeReview" => { ${SPECS_BY_TYPE.bikeReview} }
}`;

// Singleton fetch — see sanity/schemaTypes/siteStory.ts and structure.ts.
export const SITE_STORY_QUERY = `
*[_type == "siteStory"][0] {
  founderName,
  founderTitle,
  founderBio,
  "founderPhoto": founderPhoto.asset->{
    "src": url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height,
    "blurDataURL": metadata.lqip
  },
  originStoryHeading,
  originStory
}`;
