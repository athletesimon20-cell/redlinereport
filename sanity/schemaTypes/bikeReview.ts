import { defineField, defineType } from "sanity";
import { sharedReviewFields, reviewPreview } from "./shared";

export const bikeReview = defineType({
  name: "bikeReview",
  title: "Bike Review",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "specs", title: "Specs" },
  ],
  fields: [
    ...sharedReviewFields().map((f) => ({ ...f, group: "content" })),
    defineField({
      name: "bikeType",
      type: "string",
      group: "specs",
      options: { list: ["sport", "adventure", "naked", "cruiser", "touring", "dual-sport"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "engineCc", title: "Engine displacement (cc)", type: "number", group: "specs" }),
    defineField({ name: "horsepower", title: "Horsepower (hp)", type: "number", group: "specs" }),
    defineField({ name: "torqueNm", title: "Torque (Nm)", type: "number", group: "specs" }),
    defineField({ name: "weightKg", title: "Wet weight (kg)", type: "number", group: "specs" }),
    defineField({ name: "seatHeightMm", title: "Seat height (mm)", type: "number", group: "specs" }),
    defineField({ name: "fuelCapacityLiters", title: "Fuel capacity (L)", type: "number", group: "specs" }),
  ],
  preview: reviewPreview,
});
