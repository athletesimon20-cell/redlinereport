"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function CategoryTile({
  href,
  label,
  count,
  index = 0,
}: {
  href: string;
  label: string;
  count: number;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.24) }}
    >
      <Link
        href={href}
        className="group flex items-center justify-between gap-3 border border-border bg-surface px-5 py-4 transition-colors hover:border-accent hover:bg-accent/[0.06]"
      >
        <span className="font-display text-lg leading-none transition-colors group-hover:text-accent sm:text-xl">
          {label}
        </span>
        <span className="font-mono text-xs text-muted">{count} tested</span>
      </Link>
    </motion.div>
  );
}
