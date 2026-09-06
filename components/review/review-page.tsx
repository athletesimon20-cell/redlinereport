import Image from "next/image";
import { Check, X } from "lucide-react";
import { ReviewHeader } from "./review-header";
import { SpecSheet } from "./spec-sheet";
import { RelatedProducts } from "./related-products";
import { Gallery } from "./gallery";
import { ProductPlaceholderArt } from "@/components/product/product-placeholder-art";
import { BuyBox } from "@/components/buy-box/buy-box";
import { RenderBody } from "@/components/portable-text/render-body";
import { getRelated, type AnyProduct } from "@/lib/content/products";
import type { SpecFieldDef } from "@/lib/specs/categories";

export async function ReviewPage({
  product,
  eyebrow,
  specFields,
}: {
  product: AnyProduct;
  eyebrow: string;
  specFields: SpecFieldDef[];
}) {
  const related = await getRelated(product, 3);

  return (
    <article className="pb-20">
      <ReviewHeader
        eyebrow={eyebrow}
        title={product.title}
        brand={product.brand}
        excerpt={product.excerpt}
        rating={product.rating.overall}
        author={product.author}
        publishedAt={product.publishedAt}
      />

      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        {product.heroImage ? (
          <div className="relative aspect-[16/9] overflow-hidden border border-border">
            <Image
              src={product.heroImage.src}
              alt={product.title}
              fill
              placeholder={product.heroImage.blurDataURL ? "blur" : undefined}
              blurDataURL={product.heroImage.blurDataURL}
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <ProductPlaceholderArt label={eyebrow} brand={product.brand} className="border border-border" />
        )}
      </div>

      <Gallery items={product.gallery} />

      <div className="mx-auto mt-12 grid max-w-4xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_280px] lg:gap-12">
        <div className="min-w-0 prose-content pb-16 lg:pb-0">
          <RenderBody body={product.body} product={product} />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <BuyBox
            slug={product.slug}
            title={product.title}
            brand={product.brand}
            price={product.price}
            regionalPricing={product.regionalPricing}
            variant="card"
          />

          <div className="border border-border bg-surface p-4">
            <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
              At a glance
            </p>
            <ul className="space-y-1.5">
              {product.pros.slice(0, 2).map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  {pro}
                </li>
              ))}
              {product.cons.slice(0, 1).map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-foreground/85">
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
                  {con}
                </li>
              ))}
            </ul>
          </div>

          <SpecSheet specs={product.specs} fields={specFields} />
        </aside>
      </div>

      <RelatedProducts items={related} />

      <BuyBox
        slug={product.slug}
        title={product.title}
        price={product.price}
        regionalPricing={product.regionalPricing}
        variant="sticky"
      />
    </article>
  );
}
