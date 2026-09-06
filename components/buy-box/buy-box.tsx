"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useRegion } from "@/lib/regions/context";
import { formatPrice, resolveRegionalPrice } from "@/lib/currency/format";
import { buildGoHref } from "@/lib/affiliate/links";
import { cn } from "@/lib/utils";

export interface BuyBoxProps {
  slug: string;
  title: string;
  brand?: string;
  price: { amount: number; currency: string };
  regionalPricing?: Record<string, { amount: number; currency: string }>;
  vendor?: string;
  vendorLabel?: string;
  variant?: "inline" | "card" | "sticky";
  className?: string;
}

export function BuyBox({
  slug,
  title,
  brand,
  price,
  regionalPricing,
  vendor,
  vendorLabel,
  variant = "inline",
  className,
}: BuyBoxProps) {
  const { region } = useRegion();
  const resolved = resolveRegionalPrice(price, regionalPricing, region);
  const formatted = formatPrice(resolved, region);
  const href = buildGoHref({ slug }, vendor);

  if (variant === "sticky") {
    return (
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t-2 border-border bg-surface-raised px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.12)] md:hidden",
          className
        )}
      >
        <div className="min-w-0">
          <p className="truncate font-display text-sm leading-tight">{title}</p>
          <p className="font-mono text-base text-accent">{formatted}</p>
        </div>
        <Link
          href={href}
          prefetch={false}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wide text-accent-ink transition-transform active:scale-95"
        >
          {vendorLabel ?? "Check price"}
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "tag-card border-2 border-dashed border-border bg-surface p-5",
        variant === "card" ? "w-full max-w-xs" : "not-prose my-6 w-full max-w-sm",
        className
      )}
    >
      {brand && (
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">{brand}</p>
      )}
      <p className="font-display text-xl leading-tight text-balance">{title}</p>
      <p className="mt-2 font-mono text-2xl text-accent">{formatted}</p>
      <Link
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-ink-950 px-4 py-3 font-mono text-xs font-bold uppercase tracking-wide text-paper-100 transition-colors hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink dark:hover:bg-paper-100"
      >
        {vendorLabel ?? "Check price"} →
      </Link>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-wide text-muted">
        Affiliate link · price as of today
      </p>
    </motion.div>
  );
}
