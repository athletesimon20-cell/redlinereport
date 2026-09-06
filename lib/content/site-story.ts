import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { SITE_STORY_QUERY } from "@/lib/sanity/queries";
import type { PortableTextBody } from "./products";

export interface SiteStory {
  founderName?: string;
  founderTitle?: string;
  founderBio?: string;
  founderPhoto?: { src: string; width: number; height: number; blurDataURL?: string };
  originStoryHeading?: string;
  originStory?: PortableTextBody;
}

export const getSiteStory = cache(async (): Promise<SiteStory | undefined> => {
  const story = await client.fetch<SiteStory | null>(SITE_STORY_QUERY, {}, { next: { revalidate: 300, tags: ["site-story"] } });
  return story ?? undefined;
});
