"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import type { Gear, Bike } from "@/lib/content/products";
import { GEAR_CATEGORY_LABELS, BIKE_TYPE_LABELS } from "@/lib/taxonomy";
import { ProductPlaceholderArt } from "./product-placeholder-art";
import { useRegion } from "@/lib/regions/context";
import { formatPrice, resolveRegionalPrice } from "@/lib/currency/format";

function isGear(product: Gear | Bike): product is Gear {
  return product.type === "gear";
}

export function ProductCard({ product, index = 0 }: { product: Gear | Bike; index?: number }) {
  const { region } = useRegion();
  const label = isGear(product) ? GEAR_CATEGORY_LABELS[product.category] : BIKE_TYPE_LABELS[product.bikeType];
  const price = resolveRegionalPrice(product.price, product.regionalPricing, region);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
    >
      <Link href={product.permalink} className="group tag-card block border border-border bg-surface transition-colors hover:border-accent">
        <div className="relative aspect-[4/3] overflow-hidden">
          {product.heroImage ? (
            <Image
              src={product.heroImage.src}
              alt={product.title}
              fill
              placeholder={product.heroImage.blurDataURL ? "blur" : undefined}
              blurDataURL={product.heroImage.blurDataURL}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <ProductPlaceholderArt label={label} brand={product.brand} className="absolute inset-0 aspect-auto" />
          )}
          <div className="absolute left-3 bottom-3 rounded-full bg-ink-950/85 px-2.5 py-1 font-mono text-[11px] font-bold text-red-600">
            {product.rating.overall.toFixed(1)}★
          </div>
        </div>
        <div className="p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{product.brand}</p>
          <h3 className="font-display mt-0.5 text-lg leading-tight text-balance transition-colors group-hover:text-accent">
            {product.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-snug text-foreground/70">{product.excerpt}</p>
          <p className="mt-3 font-mono text-sm text-foreground/80">{formatPrice(price, region)}</p>
        </div>
      </Link>
    </motion.div>
  );
}
