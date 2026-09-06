import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SpecCompareRow {
  name: string;
  value: number;
  highlight?: boolean;
}

export function SpecCompareInline({
  label,
  unit,
  rows,
}: {
  label: string;
  unit?: string;
  rows: SpecCompareRow[];
}) {
  const max = Math.max(...rows.map((r) => r.value));

  return (
    <div className="not-prose my-8 border border-border bg-surface p-4">
      <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        {label} comparison
      </p>
      <ul className="space-y-2.5">
        {rows.map((row) => (
          <li key={row.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
            <span
              className={
                "col-span-2 font-sans text-sm sm:col-span-1 " +
                (row.highlight ? "font-semibold text-foreground" : "text-foreground/80")
              }
            >
              {row.name}
            </span>
            <span className="col-start-2 row-start-1 font-mono text-sm tabular-nums text-muted sm:col-start-auto sm:row-start-auto">
              {row.value.toLocaleString("en-US")}
              {unit}
            </span>
            <div className="col-span-2 h-1.5 w-full overflow-hidden rounded-full bg-border/60 sm:col-span-1">
              <div
                className={"h-full rounded-full " + (row.highlight ? "bg-accent" : "bg-steel-500")}
                style={{ width: `${Math.max(6, (row.value / max) * 100)}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CompetitorCard({
  name,
  brand,
  verdict,
  href,
  hrefLabel = "Read the full review",
  children,
}: {
  name: string;
  brand?: string;
  verdict?: string;
  href?: string;
  hrefLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="not-prose my-8 border border-border bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-border pb-3">
        <div>
          {brand && (
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{brand}</p>
          )}
          <p className="font-display text-xl leading-tight">{name}</p>
        </div>
        {verdict && (
          <span className="rounded-full border border-accent/60 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wide text-accent">
            {verdict}
          </span>
        )}
      </div>
      <div className="mt-3 text-[0.95rem] leading-relaxed text-foreground/90 [&>p]:my-2">{children}</div>
      {href && (
        <Link
          href={href}
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wide text-accent hover:underline"
        >
          {hrefLabel} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
