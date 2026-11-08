import type { Metadata } from "next";
import type { AnyProduct } from "@/lib/content/products";
import { GEAR_CATEGORY_LABELS } from "@/lib/taxonomy";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.redlinereport.press").replace(/\/$/, "");
export const SITE_NAME = "Redline Report";
export const CONTACT_EMAIL = "redlinereport.press@gmail.com";
export const SITE_DESCRIPTION =
  "Field-tested motorcycle helmet, jacket, glove, boot, luggage and bike reviews with honest verdicts and side-by-side comparisons.";

const DEFAULT_OG_IMAGE = {
  url: "/og-default.png",
  width: 1200,
  height: 630,
  alt: "Redline Report — field-tested motorcycle gear and bike reviews",
};

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** JSON.stringify for a <script type="application/ld+json">, escaping "<" so content can't close the tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

interface BuildMetadataInput {
  title: string;
  description: string;
  /** Path on this site, e.g. "/gear/helmets". Becomes the canonical URL. */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  /** Use the title exactly as given instead of appending " — Redline Report". */
  absoluteTitle?: boolean;
  article?: { publishedTime: string; modifiedTime?: string; authorName: string; section?: string };
}

const TITLE_SUFFIX = ` — ${SITE_NAME}`;

export function buildMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  absoluteTitle,
  article,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;
  // Google shows ~60 characters; drop the brand suffix on long review titles rather than have it cut off mid-word.
  const useAbsolute = absoluteTitle || fullTitle.length > 60;
  const shareTitle = useAbsolute ? title : fullTitle;

  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [image],
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [article.authorName],
            section: article.section,
          }
        : { type: "website" as const }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image.url],
    },
  };
}

export function productMetadata(product: AnyProduct, path: string): Metadata {
  const image = product.heroImage
    ? {
        url: product.heroImage.src,
        width: product.heroImage.width,
        height: product.heroImage.height,
        alt: product.title,
      }
    : undefined;

  return buildMetadata({
    title: product.title,
    description: product.seo?.metaDescription ?? product.excerpt,
    path,
    image,
    article: {
      publishedTime: product.publishedAt,
      modifiedTime: product.updatedAt,
      authorName: product.author.name,
      section: product.type === "gear" ? GEAR_CATEGORY_LABELS[product.category] : "Motorcycles",
    },
  });
}

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/icon.png"),
        email: CONTACT_EMAIL,
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": ORGANIZATION_ID },
      },
    ],
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function itemListJsonLd(name: string, items: { title: string; permalink: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(item.permalink),
      name: item.title,
    })),
  };
}

export function productBreadcrumbs(product: AnyProduct) {
  return product.type === "gear"
    ? [
        { name: "Home", path: "/" },
        { name: "Gear", path: "/gear" },
        { name: GEAR_CATEGORY_LABELS[product.category], path: `/gear/${product.category}` },
        { name: product.title, path: product.permalink },
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Bikes", path: "/bikes" },
        { name: product.title, path: product.permalink },
      ];
}

export function reviewJsonLd(product: AnyProduct) {
  const url = absoluteUrl(product.permalink);
  const productName = product.model ? `${product.brand} ${product.model}` : product.title;

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${url}#review`,
    url,
    name: product.title,
    description: product.seo?.metaDescription ?? product.excerpt,
    inLanguage: "en",
    datePublished: product.publishedAt,
    ...(product.updatedAt ? { dateModified: product.updatedAt } : {}),
    author: { "@type": "Person", name: product.author.name, url: absoluteUrl("/about") },
    publisher: { "@id": ORGANIZATION_ID },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.rating.overall,
      bestRating: 10,
      worstRating: 0,
    },
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: product.pros.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: product.cons.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
    },
    itemReviewed: {
      "@type": "Product",
      name: productName,
      description: product.excerpt,
      brand: { "@type": "Brand", name: product.brand },
      ...(product.heroImage ? { image: product.heroImage.src } : {}),
      offers: {
        "@type": "Offer",
        url,
        price: product.price.amount,
        priceCurrency: product.price.currency,
        ...(product.legacy ? { availability: "https://schema.org/Discontinued" } : {}),
      },
    },
  };
}
