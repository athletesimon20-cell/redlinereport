import type { MetadataRoute } from "next";
import { getAllGear, getAllBikes, getLegacyItems } from "@/lib/content/products";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/gear",
    "/bikes",
    "/legacy",
    "/compare",
    "/compare/gear",
    "/compare/bikes",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [gear, bikes, legacy] = await Promise.all([getAllGear(), getAllBikes(), getLegacyItems()]);

  const productRoutes = [...gear, ...bikes, ...legacy].map((item) => ({
    url: `${SITE_URL}${item.permalink}`,
    lastModified: item.updatedAt ?? item.publishedAt,
  }));

  return [...staticRoutes, ...productRoutes];
}
