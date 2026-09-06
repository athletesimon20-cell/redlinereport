import Link from "next/link";
import { GitCompareArrows } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { CategoryTile } from "@/components/home/category-tile";
import { HowWeTest } from "@/components/home/how-we-test";
import { ProductCard } from "@/components/product/product-card";
import { getFeatured, getAllBikes, getGearCategoryCounts } from "@/lib/content/products";
import { GEAR_CATEGORIES, GEAR_CATEGORY_LABELS } from "@/lib/taxonomy";

export default async function Home() {
  const [featured, gearCounts, bikes] = await Promise.all([
    getFeatured(6),
    getGearCategoryCounts(),
    getAllBikes(),
  ]);
  const bikeCount = bikes.length;

  return (
    <>
      <Hero />

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Latest field reports
              </p>
              <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">Fresh off the road</h2>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Browse by category</p>
        <h2 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">Find your gear</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {GEAR_CATEGORIES.map((category, i) => (
            <CategoryTile
              key={category}
              href={`/gear/${category}`}
              label={GEAR_CATEGORY_LABELS[category]}
              count={gearCounts[category] ?? 0}
              index={i}
            />
          ))}
          <CategoryTile href="/bikes" label="Motorcycles" count={bikeCount} index={GEAR_CATEGORIES.length} />
        </div>
      </section>

      <HowWeTest />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-start gap-6 border-2 border-dashed border-border bg-surface p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Compare tool</p>
            <h2 className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
              Can&rsquo;t decide? Put two side by side.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground/70">
              Compare helmet to helmet, jacket to jacket, or bike to bike on the specs that
              actually matter.
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex shrink-0 items-center gap-2 bg-ink-950 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-paper-100 transition-colors hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink dark:hover:bg-paper-100"
          >
            <GitCompareArrows className="h-4 w-4" aria-hidden="true" />
            Start Comparing
          </Link>
        </div>
      </section>
    </>
  );
}
