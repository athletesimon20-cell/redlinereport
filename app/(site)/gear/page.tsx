import type { Metadata } from "next";
import { CategoryTile } from "@/components/home/category-tile";
import { ProductCard } from "@/components/product/product-card";
import { getAllGear, getGearCategoryCounts } from "@/lib/content/products";
import { GEAR_CATEGORIES, GEAR_CATEGORY_LABELS } from "@/lib/taxonomy";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Motorcycle Gear Reviews",
  description:
    "Independently tested motorcycle helmets, jackets, gloves, boots, luggage, riding suits and communicators — with ratings, pros and cons, and specs.",
  path: "/gear",
});

export default async function GearHub() {
  const [counts, allGear] = await Promise.all([getGearCategoryCounts(), getAllGear()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Gear", path: "/gear" },
          ]),
          itemListJsonLd("Motorcycle gear reviews", allGear),
        ]}
      />
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Gear</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Every category, field-tested</h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/75">
        Pick a category to see what we&rsquo;d actually put on our own bike.
      </p>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {GEAR_CATEGORIES.map((category, i) => (
          <CategoryTile
            key={category}
            href={`/gear/${category}`}
            label={GEAR_CATEGORY_LABELS[category]}
            count={counts[category] ?? 0}
            index={i}
          />
        ))}
      </div>

      {allGear.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl leading-tight sm:text-3xl">All gear reviews</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allGear.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
