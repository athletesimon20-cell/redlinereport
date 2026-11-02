"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LogoLockup } from "@/components/brand/logo";

const STATS = [
  { value: "100%", label: "Independently tested" },
  { value: "0", label: "Sponsored verdicts" },
  { value: "Every ride", label: "Rain, heat, and traffic" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 48px)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LogoLockup className="h-32 sm:h-44" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent"
        >
          Field-tested gear &amp; bike reviews
        </motion.p>

        <motion.h1
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          className="font-display mt-4 max-w-3xl text-5xl leading-[0.95] text-balance sm:text-7xl"
        >
          GEAR AND BIKES, TESTED TO THE LIMIT.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75"
        >
          Every helmet, jacket, and bike on this site has been ridden, worn, and rained on by
          our editors before we write a single word. No manufacturer copy, no black-box
          scores — just the verdict, stamped.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/gear"
            className="inline-flex items-center gap-2 bg-ink-950 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-paper-100 transition-colors hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink dark:hover:bg-paper-100"
          >
            Browse Gear <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/bikes"
            className="inline-flex items-center gap-2 border-2 border-border px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Browse Bikes
          </Link>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid max-w-2xl grid-cols-3 gap-4 border-t border-dashed border-border pt-6"
        >
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl text-accent sm:text-3xl">{stat.value}</dd>
              <dd className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
