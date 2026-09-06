import { defineField, defineType } from "sanity";

/**
 * Singleton — exactly one of these documents ever exists (fixed _id "siteStory",
 * wired up in sanity/structure.ts). Backs the "About" page's founder bio and
 * origin-story sections.
 */
export const siteStory = defineType({
  name: "siteStory",
  title: "About Page Content",
  type: "document",
  groups: [
    { name: "founder", title: "Founder", default: true },
    { name: "story", title: "Origin Story" },
  ],
  fields: [
    defineField({
      name: "founderName",
      title: "Name",
      type: "string",
      group: "founder",
    }),
    defineField({
      name: "founderTitle",
      title: "Title",
      description: 'e.g. "Founder & Chief Executive"',
      type: "string",
      group: "founder",
      initialValue: "Founder",
    }),
    defineField({
      name: "founderPhoto",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      group: "founder",
    }),
    defineField({
      name: "founderBio",
      title: "Bio",
      description: "A few sentences — who you are and what you ride.",
      type: "text",
      rows: 4,
      group: "founder",
    }),
    defineField({
      name: "originStoryHeading",
      title: "Section heading",
      type: "string",
      group: "story",
      initialValue: "How Redline Report started",
    }),
    defineField({
      name: "originStory",
      title: "The story",
      type: "array",
      group: "story",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: { title: "founderName" },
    prepare: ({ title }) => ({ title: "About Page Content", subtitle: title }),
  },
});
