import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "redline-report",
  title: "Redline Report",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    // "siteStory" is a singleton (see sanity/structure.ts) — hide it from the
    // global "create new document" menu so editors can't accidentally spawn
    // a second one; it's only ever reached via the "About Page Content" item.
    newDocumentOptions: (prev) => prev.filter((template) => template.templateId !== "siteStory"),
  },
});
