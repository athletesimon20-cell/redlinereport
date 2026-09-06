import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Rider / Author",
  type: "document",
  description:
    "A tester who reviews gear or bikes. Shows up both as the byline on their reviews and in the rider roster on the About page — add or delete one here to change both at once.",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({ name: "avatar", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({
      name: "specialty",
      title: "Specialty",
      description: 'What they ride/test most, e.g. "Track days & sportbikes"',
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
