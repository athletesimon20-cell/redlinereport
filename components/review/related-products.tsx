import { ProductCard } from "@/components/product/product-card";
import type { AnyProduct } from "@/lib/content/products";

export function RelatedProducts({ items }: { items: AnyProduct[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Keep reading</p>
      <h2 className="font-display mt-2 text-2xl leading-tight sm:text-3xl">Related reviews</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <ProductCard key={item.slug} product={item} index={i} />
        ))}
      </div>
    </section>
  );
}
