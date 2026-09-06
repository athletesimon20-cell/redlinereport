import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewPage } from "@/components/review/review-page";
import { getAllGear, getGearBySlug } from "@/lib/content/products";
import { gearCategorySpecs } from "@/lib/specs/categories";
import { GEAR_CATEGORIES, GEAR_CATEGORY_LABELS, type GearCategory } from "@/lib/taxonomy";

function isGearCategory(value: string): value is GearCategory {
  return (GEAR_CATEGORIES as readonly string[]).includes(value);
}

export async function generateStaticParams() {
  const gear = await getAllGear();
  return gear.map((item) => ({ category: item.category, slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isGearCategory(category)) return {};
  const product = await getGearBySlug(category, slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.seo?.metaDescription ?? product.excerpt,
  };
}

export default async function GearReviewPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!isGearCategory(category)) notFound();

  const product = await getGearBySlug(category, slug);
  if (!product) notFound();

  return (
    <ReviewPage
      product={product}
      eyebrow={`Gear / ${GEAR_CATEGORY_LABELS[category]}`}
      specFields={gearCategorySpecs[category]}
    />
  );
}
