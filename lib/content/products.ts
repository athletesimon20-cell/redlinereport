import { cache } from "react";
import { client } from "@/lib/sanity/client";
import { ALL_GEAR_QUERY, ALL_BIKES_QUERY, ALL_LEGACY_QUERY, PRODUCT_BY_SLUG_QUERY } from "@/lib/sanity/queries";
import {
  categoryFromType,
  permalinkFor,
  groupAffiliateLinks,
  groupRegionalPricing,
  initialsFromName,
} from "@/lib/sanity/transform";
import type { GearCategory, BikeType } from "@/lib/taxonomy";

export type PortableTextBody = { _type: string; _key: string; [key: string]: unknown }[];

interface Author {
  name: string;
  role?: string;
  bio?: string;
  initials: string;
  avatarUrl?: string;
}

interface BaseProduct {
  _id: string;
  slug: string;
  permalink: string;
  brand: string;
  model?: string;
  title: string;
  excerpt: string;
  legacy: boolean;
  heroImage?: { src: string; width: number; height: number; blurDataURL?: string };
  gallery?: { image: { src: string; width: number; height: number }; caption?: string }[];
  rating: { overall: number; breakdown?: { label: string; value: number }[] };
  pros: string[];
  cons: string[];
  specs: Record<string, string | number | boolean>;
  price: { amount: number; currency: string; asOf?: string };
  regionalPricing?: Record<string, { amount: number; currency: string }>;
  affiliateLinks: Record<string, Record<string, string>>;
  relatedSlugs?: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  seo?: { metaDescription?: string };
  body: PortableTextBody;
}

export interface Gear extends BaseProduct {
  type: "gear";
  category: GearCategory;
}

export interface Bike extends BaseProduct {
  type: "bike";
  bikeType: BikeType;
}

export type AnyProduct = Gear | Bike;

interface RawDoc {
  _id: string;
  _type: string;
  slug: string;
  brand: string;
  model?: string;
  title: string;
  excerpt: string;
  legacy?: boolean;
  heroImage?: BaseProduct["heroImage"];
  gallery?: BaseProduct["gallery"];
  rating: BaseProduct["rating"];
  pros: string[];
  cons: string[];
  specs: Record<string, string | number | boolean>;
  price: BaseProduct["price"];
  regionalPricingRaw?: { region?: string; amount?: number; currency?: string }[];
  affiliateLinksRaw?: { vendor?: string; region?: string; url?: string }[];
  relatedSlugs?: (string | null)[];
  author?: { name: string; role?: string; bio?: string; avatarUrl?: string };
  publishedAt: string;
  updatedAt?: string;
  seoDescription?: string;
  body: PortableTextBody;
  bikeType?: BikeType;
}

function mapDoc(raw: RawDoc): AnyProduct {
  const base: BaseProduct = {
    _id: raw._id,
    slug: raw.slug,
    permalink: permalinkFor(raw._type, raw.slug),
    brand: raw.brand,
    model: raw.model,
    title: raw.title,
    excerpt: raw.excerpt,
    legacy: Boolean(raw.legacy),
    heroImage: raw.heroImage,
    gallery: raw.gallery,
    rating: raw.rating,
    pros: raw.pros ?? [],
    cons: raw.cons ?? [],
    specs: raw.specs ?? {},
    price: raw.price,
    regionalPricing: groupRegionalPricing(raw.regionalPricingRaw),
    affiliateLinks: groupAffiliateLinks(raw.affiliateLinksRaw),
    relatedSlugs: (raw.relatedSlugs ?? []).filter((s): s is string => Boolean(s)),
    author: {
      name: raw.author?.name ?? "Redline Report",
      role: raw.author?.role,
      bio: raw.author?.bio,
      initials: initialsFromName(raw.author?.name),
      avatarUrl: raw.author?.avatarUrl,
    },
    publishedAt: raw.publishedAt,
    updatedAt: raw.updatedAt,
    seo: raw.seoDescription ? { metaDescription: raw.seoDescription } : undefined,
    body: raw.body ?? [],
  };

  const category = categoryFromType(raw._type);
  if (category) return { ...base, type: "gear", category };
  return { ...base, type: "bike", bikeType: raw.bikeType as BikeType };
}

const FETCH_OPTIONS = { next: { revalidate: 300, tags: ["reviews"] } };

export const getAllGear = cache(async (): Promise<Gear[]> => {
  const docs = await client.fetch<RawDoc[]>(ALL_GEAR_QUERY, {}, FETCH_OPTIONS);
  return docs.map(mapDoc).filter((p): p is Gear => p.type === "gear");
});

export const getAllBikes = cache(async (): Promise<Bike[]> => {
  const docs = await client.fetch<RawDoc[]>(ALL_BIKES_QUERY, {}, FETCH_OPTIONS);
  return docs.map(mapDoc).filter((p): p is Bike => p.type === "bike");
});

export async function getGearByCategory(category: GearCategory): Promise<Gear[]> {
  const gear = await getAllGear();
  return gear.filter((item) => item.category === category);
}

export async function getGearBySlug(category: GearCategory, slug: string): Promise<Gear | undefined> {
  const gear = await getAllGear();
  return gear.find((item) => item.category === category && item.slug === slug);
}

export async function getBikeBySlug(slug: string): Promise<Bike | undefined> {
  const bikes = await getAllBikes();
  return bikes.find((item) => item.slug === slug);
}

export const getProductBySlug = cache(async (slug: string): Promise<AnyProduct | undefined> => {
  const doc = await client.fetch<RawDoc | null>(PRODUCT_BY_SLUG_QUERY, { slug }, FETCH_OPTIONS);
  return doc ? mapDoc(doc) : undefined;
});

export async function getFeatured(limit = 3): Promise<AnyProduct[]> {
  const [gear, bikes] = await Promise.all([getAllGear(), getAllBikes()]);
  return [...gear, ...bikes].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, limit);
}

export async function getRelated(product: AnyProduct, limit = 3): Promise<AnyProduct[]> {
  if (!product.relatedSlugs?.length) return [];
  const [gear, bikes] = await Promise.all([getAllGear(), getAllBikes()]);
  const pool: AnyProduct[] = [...gear, ...bikes];
  return product.relatedSlugs
    .map((slug) => pool.find((item) => item.slug === slug))
    .filter((item): item is AnyProduct => Boolean(item))
    .slice(0, limit);
}

export const getLegacyItems = cache(async (): Promise<AnyProduct[]> => {
  const docs = await client.fetch<RawDoc[]>(ALL_LEGACY_QUERY, {}, FETCH_OPTIONS);
  return docs.map(mapDoc);
});

export async function getGearCategoryCounts(): Promise<Record<GearCategory, number>> {
  const gear = await getAllGear();
  const counts = {} as Record<GearCategory, number>;
  for (const item of gear) counts[item.category] = (counts[item.category] ?? 0) + 1;
  return counts;
}
