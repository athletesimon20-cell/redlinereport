import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { initialsFromName } from "@/lib/sanity/transform";

export interface Author {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  specialty?: string;
  initials: string;
}

interface RawAuthor {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  avatarUrl?: string;
  specialty?: string;
}

const ALL_AUTHORS_QUERY = `*[_type == "author"] | order(name asc) {
  name,
  "slug": slug.current,
  role,
  bio,
  specialty,
  "avatarUrl": avatar.asset->url
}`;

export const getAllAuthors = cache(async (): Promise<Author[]> => {
  const authors = await client.fetch<RawAuthor[]>(ALL_AUTHORS_QUERY, {}, { next: { revalidate: 300, tags: ["authors"] } });
  return authors.map((a) => ({ ...a, initials: initialsFromName(a.name) }));
});
