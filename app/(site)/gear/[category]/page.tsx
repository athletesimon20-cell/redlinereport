import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product/product-card";
import { getGearByCategory } from "@/lib/content/products";
import { GEAR_CATEGORIES, GEAR_CATEGORY_LABELS, type GearCategory } from "@/lib/taxonomy";

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
  return { title: `${GEAR_CATEGORY_LABELS[category]} Reviews` };
}

export default async function GearCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isGearCategory(category)) notFound();

  const items = await getGearByCategory(category);
  const label = GEAR_CATEGORY_LABELS[category];

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Gear / {label}</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">{label}</h1>
      <p className="mt-3 text-lg text-foreground/75">{items.length} reviewed and rated.</p>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-mono text-sm uppercase tracking-wide text-muted">
            No {label.toLowerCase()} reviews yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
