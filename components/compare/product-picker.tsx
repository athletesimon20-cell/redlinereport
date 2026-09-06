"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_ITEMS = 4;

export function ProductPicker({
  items,
  selectedSlugs,
}: {
  items: { slug: string; title: string; brand: string }[];
  selectedSlugs: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggle(slug: string) {
    const current = new Set(selectedSlugs);
    if (current.has(slug)) {
      current.delete(slug);
    } else {
      if (current.size >= MAX_ITEMS) return;
      current.add(slug);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (current.size > 0) {
      params.set("items", Array.from(current).join(","));
    } else {
      params.delete("items");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const selected = selectedSlugs.includes(item.slug);
        const disabled = !selected && selectedSlugs.length >= MAX_ITEMS;
        return (
          <button
            key={item.slug}
            type="button"
            onClick={() => toggle(item.slug)}
            disabled={disabled}
            className={cn(
              "flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
              selected
                ? "border-accent bg-accent text-accent-ink"
                : "border-border bg-surface text-foreground/75 hover:border-accent hover:text-accent",
              disabled && "cursor-not-allowed opacity-40 hover:border-border hover:text-foreground/75"
            )}
          >
            {selected ? <Check className="h-3 w-3" aria-hidden="true" /> : <Plus className="h-3 w-3" aria-hidden="true" />}
            {item.brand} {item.title}
          </button>
        );
      })}
      {items.length === 0 && (
        <p className="font-mono text-xs uppercase tracking-wide text-muted">
          Nothing to compare here yet.
        </p>
      )}
    </div>
  );
}
