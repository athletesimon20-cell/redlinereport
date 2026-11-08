import type { Metadata } from "next";
import { ProductPicker } from "@/components/compare/product-picker";
import { CompareTable } from "@/components/compare/compare-table";
import { getAllBikes } from "@/lib/content/products";
import { bikeSpecs } from "@/lib/specs/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Compare Motorcycles",
  description:
    "Compare motorcycles side by side — engine, power, weight, seat height and price, up to four bikes at once.",
  path: "/compare/bikes",
});

export default async function CompareBikesPage({
  searchParams,
}: {
  searchParams: Promise<{ items?: string }>;
}) {
  const { items } = await searchParams;
  const selectedSlugs = items ? items.split(",").filter(Boolean) : [];
  const allBikes = await getAllBikes();
  const selected = allBikes.filter((item) => selectedSlugs.includes(item.slug));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Compare / Bikes</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Motorcycle compare</h1>
      <p className="mt-3 text-lg text-foreground/75">Pick up to four to line up side by side.</p>

      <div className="mt-8">
        <ProductPicker items={allBikes} selectedSlugs={selectedSlugs} />
      </div>

      <div className="mt-8">
        <CompareTable products={selected} specFields={bikeSpecs} />
      </div>
    </div>
  );
}
