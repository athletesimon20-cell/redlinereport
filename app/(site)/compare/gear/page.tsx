import type { Metadata } from "next";
import { CategoryTile } from "@/components/home/category-tile";
import { getGearCategoryCounts } from "@/lib/content/products";
import { GEAR_CATEGORIES, GEAR_CATEGORY_LABELS } from "@/lib/taxonomy";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare Motorcycle Gear",
  description:
    "Compare motorcycle helmets, jackets, gloves, boots, luggage and suits head to head within each category.",
  path: "/compare/gear",
});

export default async function CompareGearHub() {
  const counts = await getGearCategoryCounts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Compare / Gear</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Which category?</h1>
      <p className="mt-3 text-lg text-foreground/75">
        We only compare within a category — pick one to get started.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {GEAR_CATEGORIES.map((category, i) => (
          <CategoryTile
            key={category}
            href={`/compare/gear/${category}`}
            label={GEAR_CATEGORY_LABELS[category]}
            count={counts[category] ?? 0}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
