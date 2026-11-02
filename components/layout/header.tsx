"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { RegionPicker } from "@/components/region/region-picker";
import { LogoHorizontal } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/gear", label: "Gear" },
  { href: "/bikes", label: "Bikes" },
  { href: "/legacy", label: "Legacy" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" onClick={() => setOpen(false)} aria-label="Redline Report home" className="shrink-0">
          <LogoHorizontal className="h-5 sm:h-6 lg:h-7" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:text-accent",
                  active ? "text-accent" : "text-foreground/75"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <RegionPicker />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 font-mono text-sm font-bold uppercase tracking-wide text-foreground/85"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-3">
                <RegionPicker />
                <ThemeToggle />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
