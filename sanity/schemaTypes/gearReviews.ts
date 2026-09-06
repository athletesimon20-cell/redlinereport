import { defineField, defineType, type FieldDefinition } from "sanity";
import { sharedReviewFields, reviewPreview } from "./shared";

function gearReviewType(name: string, title: string, specFields: FieldDefinition[]) {
  return defineType({
    name,
    title,
    type: "document",
    groups: [
      { name: "content", title: "Content", default: true },
      { name: "specs", title: "Specs" },
    ],
    fields: [
      ...sharedReviewFields().map((f) => ({ ...f, group: "content" })),
      ...specFields.map((f) => ({ ...f, group: "specs" })),
    ],
    preview: reviewPreview,
  });
}

export const helmetReview = gearReviewType("helmetReview", "Helmet Review", [
  defineField({ name: "weightGrams", title: "Weight (g)", type: "number" }),
  defineField({ name: "shellMaterial", type: "string" }),
  defineField({ name: "certification", title: "Certification (e.g. ECE 22.06, DOT)", type: "string" }),
  defineField({ name: "fieldOfViewHorizontal", title: "Horizontal field of view (°)", type: "number" }),
  defineField({ name: "ventPorts", title: "Vent ports", type: "number" }),
  defineField({ name: "pinlockIncluded", title: "Pinlock included", type: "boolean" }),
  defineField({ name: "sizes", type: "string" }),
]);

export const jacketReview = gearReviewType("jacketReview", "Jacket Review", [
  defineField({ name: "material", type: "string" }),
  defineField({ name: "armorRating", type: "string" }),
  defineField({ name: "waterproof", type: "boolean" }),
  defineField({ name: "ventilationPanels", type: "number" }),
  defineField({ name: "weightGrams", title: "Weight (g)", type: "number" }),
  defineField({ name: "sizes", type: "string" }),
]);

export const gloveReview = gearReviewType("gloveReview", "Glove Review", [
  defineField({ name: "material", type: "string" }),
  defineField({ name: "knuckleProtection", type: "string" }),
  defineField({ name: "waterproof", type: "boolean" }),
  defineField({ name: "touchscreenCompatible", type: "boolean" }),
  defineField({ name: "sizes", type: "string" }),
]);

export const bootReview = gearReviewType("bootReview", "Boot Review", [
  defineField({ name: "material", type: "string" }),
  defineField({ name: "ankleProtection", type: "string" }),
  defineField({ name: "waterproof", type: "boolean" }),
  defineField({ name: "soleType", type: "string" }),
  defineField({ name: "sizes", type: "string" }),
]);

export const communicatorReview = gearReviewType("communicatorReview", "Communicator Review", [
  defineField({ name: "intercomRiders", title: "Intercom riders", type: "number" }),
  defineField({ name: "rangeMeters", title: "Range (m)", type: "number" }),
  defineField({ name: "batteryLifeHours", title: "Battery life (hrs)", type: "number" }),
  defineField({ name: "waterproofRating", type: "string" }),
  defineField({ name: "meshTech", title: "Mesh intercom", type: "boolean" }),
]);

export const luggageReview = gearReviewType("luggageReview", "Luggage Review", [
  defineField({ name: "capacityLiters", title: "Capacity (L)", type: "number" }),
  defineField({ name: "material", type: "string" }),
  defineField({
    name: "mountingType",
    title: "Mounting type (e.g. Quick-release hard mount, Strap-on soft luggage)",
    type: "string",
  }),
  defineField({ name: "waterproof", type: "boolean" }),
  defineField({ name: "lockable", type: "boolean" }),
  defineField({ name: "weightGrams", title: "Weight (g)", type: "number" }),
]);

export const suitReview = gearReviewType("suitReview", "Suit Review (Racing/ADV)", [
  defineField({ name: "suitType", title: "Type (e.g. One-piece, Two-piece)", type: "string" }),
  defineField({ name: "material", type: "string" }),
  defineField({ name: "armorRating", title: "Armor rating (e.g. CE Level 2)", type: "string" }),
  defineField({ name: "humpIncluded", title: "Race hump included", type: "boolean" }),
  defineField({ name: "waterproof", type: "boolean" }),
  defineField({ name: "weightGrams", title: "Weight (g)", type: "number" }),
  defineField({ name: "sizes", type: "string" }),
]);

export const gearReviewTypes = [
  helmetReview,
  jacketReview,
  gloveReview,
  bootReview,
  communicatorReview,
  luggageReview,
  suitReview,
];
