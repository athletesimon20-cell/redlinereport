import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReviewPage } from "@/components/review/review-page";
import { getAllBikes, getBikeBySlug } from "@/lib/content/products";
import { bikeSpecs } from "@/lib/specs/categories";
import { BIKE_TYPE_LABELS } from "@/lib/taxonomy";
import { productMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const bikes = await getAllBikes();
  return bikes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getBikeBySlug(slug);
  if (!product) return {};
  return productMetadata(product, product.permalink);
}

export default async function BikeReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getBikeBySlug(slug);
  if (!product) notFound();

  return (
    <ReviewPage
      product={product}
      eyebrow={`Bikes / ${BIKE_TYPE_LABELS[product.bikeType]}`}
      specFields={bikeSpecs}
    />
  );
}
