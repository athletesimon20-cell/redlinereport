import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { getLegacyItems } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Legacy Gear & Bikes",
  description: "Reviews of discontinued motorcycle gear and motorcycles no longer in production.",
};

export default async function LegacyPage() {
  const items = await getLegacyItems();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Legacy</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Out of production, not out of mind</h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/75">
        Reviews of gear and bikes that have since been discontinued — kept here for reference,
        second-hand shoppers, and anyone chasing a specific model.
      </p>

      {items.length === 0 ? (
        <div className="mt-10 border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-mono text-sm uppercase tracking-wide text-muted">
            Nothing archived here yet.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <ProductCard key={item.slug} product={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
