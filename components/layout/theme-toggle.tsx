"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};
// True only once the client has hydrated — matches the SSR render (false) first,
// then flips right after, without a manual useEffect+setState hydration-guard.
const useHasMounted = () => useSyncExternalStore(subscribe, () => true, () => false);

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHasMounted();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-accent hover:text-accent"
      aria-label="Toggle dark mode"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
