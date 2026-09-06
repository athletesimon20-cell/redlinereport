"use client";

import { createContext, useCallback, useContext, useState, useSyncExternalStore, type ReactNode } from "react";
import { REGION_COOKIE, REGION_CONFIG, isRegionCode, type RegionCode } from "./config";
import { DETECTED_REGION_COOKIE } from "./resolve";

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function writeCookie(name: string, value: string) {
  document.cookie = `${name}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

// No real external "change" events to subscribe to (cookies don't emit them) —
// user-driven changes go through setRegion below, which updates local state
// directly rather than relying on this store to notice.
function subscribe() {
  return () => {};
}

function getSnapshot(): RegionCode {
  const override = readCookie(REGION_COOKIE);
  const detected = readCookie(DETECTED_REGION_COOKIE);
  return isRegionCode(override) ? override : isRegionCode(detected) ? detected : "DEFAULT";
}

function getServerSnapshot(): RegionCode {
  return "DEFAULT";
}

interface RegionContextValue {
  region: RegionCode;
  setRegion: (region: RegionCode) => void;
  /** false until the client has read cookies once; avoids a hydration flash for consumers that care */
  ready: boolean;
}

const RegionContext = createContext<RegionContextValue>({
  region: "DEFAULT",
  setRegion: () => {},
  ready: false,
});

export function RegionProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore guarantees the first client render matches the server
  // snapshot ("DEFAULT"), then swaps to the real cookie-derived value right
  // after hydration — the React-endorsed way to read client-only state
  // without a manual useEffect+setState hydration-guard.
  const cookieRegion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [override, setOverride] = useState<RegionCode | null>(null);
  const region = override ?? cookieRegion;

  const setRegion = useCallback((next: RegionCode) => {
    writeCookie(REGION_COOKIE, next);
    setOverride(next);
  }, []);

  return (
    <RegionContext.Provider value={{ region, setRegion, ready: true }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}

export function useRegionConfig() {
  const { region } = useRegion();
  return REGION_CONFIG[region];
}
