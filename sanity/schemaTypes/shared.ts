import { defineField } from "sanity";

const REVIEW_REFS = [
  { type: "helmetReview" as const },
  { type: "jacketReview" as const },
  { type: "gloveReview" as const },
  { type: "bootReview" as const },
  { type: "communicatorReview" as const },
  { type: "luggageReview" as const },
  { type: "suitReview" as const },
  { type: "bikeReview" as const },
];

/** Fields every review type shares (gear categories + bikes). Spread into each document type. */
export function sharedReviewFields() {
  return [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "brand", type: "string", validation: (r) => r.required() }),
    defineField({ name: "model", type: "string" }),
    defineField({
      name: "excerpt",
      type: "text",
      rows: 2,
      description: "Shown on cards and in search results.",
      validation: (r) => r.required().max(240),
    }),
    defineField({
      name: "legacy",
      title: "Legacy / discontinued",
      description:
        "No longer in production. Moves this review out of the regular gear/bike listings and compare tool, into the Legacy section instead.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({ name: "heroImage", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      type: "array",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            { name: "image", type: "image", options: { hotspot: true } },
            { name: "caption", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "rating",
      type: "object",
      validation: (r) => r.required(),
      fields: [
        defineField({
          name: "overall",
          title: "Overall (0-10)",
          type: "number",
          validation: (r) => r.required().min(0).max(10),
        }),
        defineField({
          name: "breakdown",
          type: "array",
          of: [
            {
              type: "object",
              name: "ratingBreakdownItem",
              fields: [
                { name: "label", type: "string" },
                { name: "value", title: "Value (0-10)", type: "number", validation: (r) => r.min(0).max(10) },
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "pros",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "cons",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "price",
      type: "object",
      validation: (r) => r.required(),
      fields: [
        defineField({ name: "amount", type: "number", validation: (r) => r.required().positive() }),
        defineField({ name: "currency", type: "string", initialValue: "USD" }),
        defineField({ name: "asOf", type: "date" }),
      ],
    }),
    defineField({
      name: "regionalPricing",
      title: "Regional pricing overrides (optional)",
      type: "array",
      of: [
        {
          type: "object",
          name: "regionalPrice",
          fields: [
            { name: "region", type: "string", options: { list: ["US", "UK", "EU", "CA", "AU"] } },
            { name: "amount", type: "number" },
            { name: "currency", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "affiliateLinks",
      title: "Affiliate links",
      type: "array",
      description: "Add one row per vendor/region. Every vendor should have at least one row with region = DEFAULT.",
      validation: (r) => r.required().min(1),
      of: [
        {
          type: "object",
          name: "affiliateLink",
          fields: [
            { name: "vendor", type: "string", initialValue: "primary" },
            {
              name: "region",
              type: "string",
              options: { list: ["DEFAULT", "US", "UK", "EU", "CA", "AU"] },
              initialValue: "DEFAULT",
            },
            { name: "url", type: "url", validation: (r) => r.required() },
          ],
          preview: {
            select: { vendor: "vendor", region: "region", url: "url" },
            prepare: ({ vendor, region, url }) => ({ title: `${vendor} · ${region}`, subtitle: url }),
          },
        },
      ],
    }),
    defineField({
      name: "relatedReviews",
      type: "array",
      of: [{ type: "reference", to: REVIEW_REFS }],
    }),
    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", type: "datetime", initialValue: () => new Date().toISOString() }),
    defineField({
      name: "seoDescription",
      title: "SEO meta description (optional)",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Review body",
      type: "array",
      of: [
        { type: "block" },
        { type: "proBlock" },
        { type: "conBlock" },
        { type: "figureBlock" },
        { type: "calloutBlock" },
        { type: "pullQuoteBlock" },
        { type: "specCompareBlock" },
        { type: "competitorCardBlock" },
        { type: "buyBoxBlock" },
      ],
    }),
  ];
}

export const reviewPreview = {
  select: { title: "title", subtitle: "brand", media: "heroImage" },
};
