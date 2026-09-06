import { defineField, defineType } from "sanity";

// One Sanity object type per body shortcode from the old MDX system. Each is
// insertable from the "+" menu inside a review's body field in the Studio.

export const proBlock = defineType({
  name: "proBlock",
  title: "Pro",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "story", title: "Story (optional anecdote)", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: `Pro: ${title}`, subtitle: "proBlock" }),
  },
});

export const conBlock = defineType({
  name: "conBlock",
  title: "Con",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "silverLining", title: "Silver lining (optional)", type: "text", rows: 2 }),
    defineField({ name: "alternative", title: "Alternative option (optional)", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "title" },
    prepare: ({ title }) => ({ title: `Con: ${title}`, subtitle: "conBlock" }),
  },
});

export const figureBlock = defineType({
  name: "figureBlock",
  title: "Figure (photo)",
  type: "object",
  fields: [
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "alt",
      title: "Description (used as placeholder text if no photo yet)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "caption", type: "string" }),
    defineField({ name: "credit", type: "string" }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
    prepare: ({ title, media }) => ({ title: `Figure: ${title}`, media }),
  },
});

export const calloutBlock = defineType({
  name: "calloutBlock",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      options: { list: ["tip", "warning", "info"] },
      initialValue: "info",
    }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  preview: {
    select: { subtitle: "body" },
    prepare: ({ subtitle }) => ({ title: "Callout", subtitle }),
  },
});

export const pullQuoteBlock = defineType({
  name: "pullQuoteBlock",
  title: "Pull Quote",
  type: "object",
  fields: [defineField({ name: "text", type: "text", rows: 2, validation: (r) => r.required() })],
  preview: {
    select: { title: "text" },
    prepare: ({ title }) => ({ title: `“${title}”` }),
  },
});

export const specCompareRow = defineType({
  name: "specCompareRow",
  title: "Row",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "value", type: "number", validation: (r) => r.required() }),
    defineField({ name: "highlight", title: "Highlight (this is the reviewed product)", type: "boolean" }),
  ],
  preview: {
    select: { title: "name", subtitle: "value" },
  },
});

export const specCompareBlock = defineType({
  name: "specCompareBlock",
  title: "Inline Spec Comparison",
  type: "object",
  fields: [
    defineField({ name: "label", title: "What's being compared (e.g. Weight)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "unit", title: "Unit (e.g. g, hp)", type: "string" }),
    defineField({ name: "rows", type: "array", of: [{ type: "specCompareRow" }], validation: (r) => r.min(2) }),
  ],
  preview: {
    select: { title: "label" },
    prepare: ({ title }) => ({ title: `Spec comparison: ${title}` }),
  },
});

export const competitorCardBlock = defineType({
  name: "competitorCardBlock",
  title: "Competitor Comparison",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "brand", type: "string" }),
    defineField({ name: "verdict", title: "Short verdict tag (e.g. Choose for X)", type: "string" }),
    defineField({ name: "body", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "linkedReview",
      title: "Link to our own review of this product (optional)",
      type: "reference",
      to: [
        { type: "helmetReview" },
        { type: "jacketReview" },
        { type: "gloveReview" },
        { type: "bootReview" },
        { type: "communicatorReview" },
        { type: "luggageReview" },
        { type: "suitReview" },
        { type: "bikeReview" },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "brand" },
  },
});

export const buyBoxBlock = defineType({
  name: "buyBoxBlock",
  title: "Buy Box",
  type: "object",
  fields: [
    defineField({
      name: "vendor",
      title: "Vendor (optional — leave blank for the primary link)",
      type: "string",
    }),
    defineField({ name: "label", title: "Button label override (optional)", type: "string" }),
    defineField({
      name: "priceOverride",
      title: "Price override (optional — for a specific variant, e.g. a pricier Carbon trim)",
      type: "number",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Buy Box (uses this review's own price & links)" }),
  },
});

export const bodyObjectTypes = [
  proBlock,
  conBlock,
  figureBlock,
  calloutBlock,
  pullQuoteBlock,
  specCompareRow,
  specCompareBlock,
  competitorCardBlock,
  buyBoxBlock,
];
