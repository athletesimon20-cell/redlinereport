import Link from "next/link";
import { LogoHorizontal } from "@/components/brand/logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-2">
            <LogoHorizontal className="text-[19px]" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-foreground/70">
              Gear and bikes, tested to the limit. Every review is ridden, worn, and rained on
              before we write a word — independent testing, no manufacturer copy.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted">Browse</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/gear" className="text-foreground/75 hover:text-accent">All Gear</Link></li>
              <li><Link href="/bikes" className="text-foreground/75 hover:text-accent">All Bikes</Link></li>
              <li><Link href="/legacy" className="text-foreground/75 hover:text-accent">Legacy</Link></li>
              <li><Link href="/compare" className="text-foreground/75 hover:text-accent">Compare Tool</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-muted">Site</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="text-foreground/75 hover:text-accent">About</Link></li>
              <li><Link href="/contact" className="text-foreground/75 hover:text-accent">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed border-border pt-6 font-mono text-[11px] uppercase tracking-wide text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Redline Report. Some links are affiliate links.</p>
          <p>Independent reviews · Prices shown may vary by region</p>
        </div>
      </div>
    </footer>
  );
}
