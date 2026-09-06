import type { ReactNode } from "react";
import Image from "next/image";
import { Info, TriangleAlert, Lightbulb, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

export function Figure({
  src,
  alt,
  caption,
  credit,
}: {
  src?: string;
  alt: string;
  caption?: string;
  credit?: string;
}) {
  return (
    <figure className="not-prose my-8">
      {src ? (
        <div className="relative overflow-hidden rounded-sm border border-border">
          <Image src={src} alt={alt} width={1200} height={800} className="h-auto w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[3/2] w-full flex-col items-center justify-center gap-2 border border-dashed border-border bg-surface px-6 text-center">
          <Camera className="h-6 w-6 text-muted" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wide text-muted">Photo pending</p>
          <p className="max-w-sm font-sans text-sm text-muted">{alt}</p>
        </div>
      )}
      {(caption || credit) && (
        <figcaption className="mt-2 flex items-baseline justify-between gap-3 font-mono text-xs text-muted">
          <span>{caption}</span>
          {credit && <span className="shrink-0 opacity-70">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

const CALLOUT_STYLES = {
  tip: { icon: Lightbulb, cls: "border-accent/50 bg-accent/[0.08]" },
  warning: { icon: TriangleAlert, cls: "border-danger/50 bg-danger/[0.08]" },
  info: { icon: Info, cls: "border-border bg-surface" },
} as const;

export function Callout({
  type = "info",
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES;
  children: ReactNode;
}) {
  const { icon: Icon, cls } = CALLOUT_STYLES[type];
  return (
    <div className={cn("not-prose my-6 flex gap-3 rounded-sm border px-4 py-3", cls)}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div className="text-[0.95rem] leading-relaxed [&>p]:my-1.5">{children}</div>
    </div>
  );
}

export function PullQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="not-prose relative my-10 border-y-2 border-border py-6 pl-2">
      <span className="font-display absolute -left-1 -top-4 text-6xl leading-none text-accent/40" aria-hidden="true">
        &ldquo;
      </span>
      <p className="font-display text-balance pl-8 text-2xl leading-tight sm:text-3xl">{children}</p>
    </blockquote>
  );
}
