import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Gear & Bikes",
  description: "Put helmets against helmets, jackets against jackets, or bike against bike.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Compare tool</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Put it side by side</h1>
      <p className="mt-3 max-w-xl text-lg text-foreground/75">
        We keep gear and bikes in separate tables — a helmet and a motorcycle don&rsquo;t share
        much of a spec sheet.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/compare/gear"
          className="group border-2 border-border bg-surface p-8 transition-colors hover:border-accent"
        >
          <p className="font-display text-2xl">Compare Gear</p>
          <p className="mt-2 text-sm text-foreground/70">Helmet vs. helmet, jacket vs. jacket, and more.</p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide text-accent">
            Choose a category <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>

        <Link
          href="/compare/bikes"
          className="group border-2 border-border bg-surface p-8 transition-colors hover:border-accent"
        >
          <p className="font-display text-2xl">Compare Bikes</p>
          <p className="mt-2 text-sm text-foreground/70">Engine, weight, seat height, and price — head to head.</p>
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wide text-accent">
            Start comparing <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </div>
  );
}
