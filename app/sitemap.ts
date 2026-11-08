import type { MetadataRoute } from "next";
import { getAllGear, getAllBikes, getLegacyItems } from "@/lib/content/products";
import { GEAR_CATEGORIES } from "@/lib/taxonomy";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [gear, bikes, legacy] = await Promise.all([getAllGear(), getAllBikes(), getLegacyItems()]);
  const products = [...gear, ...bikes, ...legacy];

  const lastModified = (item: { updatedAt?: string; publishedAt: string }) =>
    new Date(item.updatedAt ?? item.publishedAt);
  // Listing pages change when their newest review does — not on every request.
  const newest = (items: typeof products) =>
    items.length ? new Date(Math.max(...items.map((item) => lastModified(item).getTime()))) : undefined;

  const categoryRoutes = GEAR_CATEGORIES.filter((category) => gear.some((item) => item.category === category)).map(
    (category) => ({
      url: absoluteUrl(`/gear/${category}`),
      lastModified: newest(gear.filter((item) => item.category === category)),
    })
  );

  const staticRoutes = [
    { path: "", lastModified: newest(products) },
    { path: "/gear", lastModified: newest(gear) },
    { path: "/bikes", lastModified: newest(bikes) },
    { path: "/legacy", lastModified: newest(legacy) },
    { path: "/compare" },
    { path: "/compare/gear" },
    { path: "/compare/bikes" },
    { path: "/about" },
    { path: "/contact" },
  ].map(({ path, lastModified }) => ({ url: absoluteUrl(path), lastModified }));

  const productRoutes = products.map((item) => ({
    url: absoluteUrl(item.permalink),
    lastModified: lastModified(item),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
