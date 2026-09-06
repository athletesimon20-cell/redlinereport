import { cn } from "@/lib/utils";

interface ProductPlaceholderArtProps {
  label: string;
  brand: string;
  glyph?: string;
  className?: string;
}

/**
 * Stands in for real product photography: a stamped "spec plate" card rather
 * than an empty grey box, so listings still feel intentional before real
 * photos are dropped in via frontmatter `heroImage`.
 */
export function ProductPlaceholderArt({ label, brand, glyph, className }: ProductPlaceholderArtProps) {
  const initial = (glyph ?? label).trim().charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-surface",
        className
      )}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id="plate-grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M18 0H0V18" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#plate-grid)" className="text-foreground" />
      </svg>

      <span className="font-display select-none text-[7rem] leading-none text-foreground/[0.08] sm:text-[9rem]">
        {initial}
      </span>

      <div className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {brand}
      </div>
      <div className="absolute right-3 top-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
        {label}
      </div>

      {/* Caution-stripe motif: red + white, always — a fixed motorsport
          signal rather than a theme-dependent color. */}
      <div
        className="absolute inset-x-0 bottom-0 h-2.5"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--color-red-600) 0 10px, #ffffff 10px 20px)",
        }}
      />
    </div>
  );
}
