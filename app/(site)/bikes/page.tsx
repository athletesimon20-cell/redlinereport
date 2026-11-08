import type { Metadata } from "next";
import { ProductCard } from "@/components/product/product-card";
import { getAllBikes } from "@/lib/content/products";
import { BIKE_TYPES, BIKE_TYPE_LABELS } from "@/lib/taxonomy";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Motorcycle Reviews",
  description:
    "Independent motorcycle reviews — adventure, dual-sport, touring and more — with real-world testing, specs, ratings and pricing.",
  path: "/bikes",
});

export default async function BikesPage() {
  const bikes = await getAllBikes();
  const counts = BIKE_TYPES.reduce<Record<string, number>>((acc, type) => {
    acc[type] = bikes.filter((b) => b.bikeType === type).length;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Bikes", path: "/bikes" },
          ]),
          itemListJsonLd("Motorcycle reviews", bikes),
        ]}
      />
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Bikes</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Motorcycles, ridden hard</h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/75">
        {bikes.length} machines tested across the riding styles that matter.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {BIKE_TYPES.filter((t) => counts[t] > 0).map((type) => (
          <span
            key={type}
            className="border border-border bg-surface px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-foreground/75"
          >
            {BIKE_TYPE_LABELS[type]} ({counts[type]})
          </span>
        ))}
      </div>

      {bikes.length === 0 ? (
        <div className="mt-10 border border-dashed border-border bg-surface p-10 text-center">
          <p className="font-mono text-sm uppercase tracking-wide text-muted">
            No bike reviews yet — check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike, i) => (
            <ProductCard key={bike.slug} product={bike} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
