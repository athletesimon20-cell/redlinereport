import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPicker } from "@/components/compare/product-picker";
import { CompareTable } from "@/components/compare/compare-table";
import { getGearByCategory } from "@/lib/content/products";
import { gearCategorySpecs } from "@/lib/specs/categories";
import { GEAR_CATEGORIES, GEAR_CATEGORY_LABELS, type GearCategory } from "@/lib/taxonomy";
import { buildMetadata } from "@/lib/seo";

function isGearCategory(value: string): value is GearCategory {
  return (GEAR_CATEGORIES as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return GEAR_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isGearCategory(category)) return {};
  const label = GEAR_CATEGORY_LABELS[category];
  // Canonical ignores ?items=... so every selection counts as the same page.
  return buildMetadata({
    title: `Compare ${label}`,
    description: `Compare motorcycle ${label.toLowerCase()} side by side — pick up to four and line up the specs that matter.`,
    path: `/compare/gear/${category}`,
  });
}

export default async function CompareGearCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ items?: string }>;
}) {
  const { category } = await params;
  if (!isGearCategory(category)) notFound();

  const { items } = await searchParams;
  const selectedSlugs = items ? items.split(",").filter(Boolean) : [];
  const allItems = await getGearByCategory(category);
  const selected = allItems.filter((item) => selectedSlugs.includes(item.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
        Compare / {GEAR_CATEGORY_LABELS[category]}
      </p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">
        {GEAR_CATEGORY_LABELS[category]} compare
      </h1>
      <p className="mt-3 text-lg text-foreground/75">Pick up to four to line up side by side.</p>

      <div className="mt-8">
        <ProductPicker items={allItems} selectedSlugs={selectedSlugs} />
      </div>

      <div className="mt-8">
        <CompareTable products={selected} specFields={gearCategorySpecs[category]} />
      </div>
    </div>
  );
}
