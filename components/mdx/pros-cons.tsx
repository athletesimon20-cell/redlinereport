import type { ReactNode } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="not-prose my-4 list-none border-l-2 border-accent pl-4">
      <p className="flex items-start gap-2 font-display text-lg leading-tight">
        <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
        {title}
      </p>
      <div className="prose-content mt-1.5 text-[0.95rem] leading-relaxed text-foreground/90 [&>p]:my-2">
        {children}
      </div>
    </li>
  );
}

export function Con({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="not-prose my-4 list-none border-l-2 border-danger pl-4">
      <p className="flex items-start gap-2 font-display text-lg leading-tight">
        <X className="mt-1 h-4 w-4 shrink-0 text-danger" aria-hidden="true" />
        {title}
      </p>
      <div className="prose-content mt-1.5 text-[0.95rem] leading-relaxed text-foreground/90 [&>p]:my-2">
        {children}
      </div>
    </li>
  );
}

export function ProsList({ children }: { children: ReactNode }) {
  return <ul className="not-prose my-6">{children}</ul>;
}

export function ConsList({ children }: { children: ReactNode }) {
  return <ul className="not-prose my-6">{children}</ul>;
}

function Aside({
  label,
  tone,
  children,
}: {
  label: string;
  tone: "amber" | "ink";
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "mt-2 rounded-sm border border-dashed px-3 py-2 font-mono text-[0.8rem] leading-relaxed",
        tone === "amber"
          ? "border-accent/50 bg-accent/[0.08] text-foreground/90"
          : "border-border bg-surface text-foreground/80"
      )}
    >
      <span className="mr-1.5 font-bold uppercase tracking-wide text-muted">{label} —</span>
      {children}
    </p>
  );
}

export function Story({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 border-l border-border pl-3 font-sans text-[0.9rem] italic leading-relaxed text-muted">
      {children}
    </p>
  );
}

export function SilverLining({ children }: { children: ReactNode }) {
  return <Aside label="Silver lining" tone="amber">{children}</Aside>;
}

export function Alternative({ children }: { children: ReactNode }) {
  return <Aside label="Alternative option" tone="ink">{children}</Aside>;
}
