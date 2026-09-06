import { StampBadge } from "@/components/ui/stamp-badge";

interface AuthorInfo {
  name: string;
  role?: string;
  initials: string;
}

export function ReviewHeader({
  eyebrow,
  title,
  brand,
  excerpt,
  rating,
  author,
  publishedAt,
}: {
  eyebrow: string;
  title: string;
  brand: string;
  excerpt: string;
  rating: number;
  author: AuthorInfo;
  publishedAt: string;
}) {
  const person = author;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="mx-auto max-w-4xl px-4 pt-10 sm:px-6 sm:pt-14">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-wide text-muted">{brand}</p>
          <h1 className="font-display mt-1 text-4xl leading-[0.98] text-balance sm:text-5xl">{title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-foreground/75">{excerpt}</p>
        </div>
        <StampBadge rating={rating} size="md" className="shrink-0" />
      </div>

      <div className="mt-8 flex items-center gap-3 border-t border-dashed border-border pt-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950 font-mono text-xs font-bold text-paper-100 dark:bg-accent dark:text-accent-ink">
          {person.initials}
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold">{person.name}</p>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted">
            {person.role} · {date}
          </p>
        </div>
      </div>
    </header>
  );
}
