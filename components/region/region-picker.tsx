"use client";

import { Globe } from "lucide-react";
import { useRegion } from "@/lib/regions/context";
import { REGION_CONFIG, SUPPORTED_REGIONS, type RegionCode } from "@/lib/regions/config";

export function RegionPicker({ className }: { className?: string }) {
  const { region, setRegion } = useRegion();

  return (
    <label className={"flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-muted " + (className ?? "")}>
      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">Region</span>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value as RegionCode)}
        className="cursor-pointer appearance-none bg-transparent pr-1 text-foreground/80 outline-none hover:text-accent"
        aria-label="Choose your region for local pricing and dealer links"
      >
        {SUPPORTED_REGIONS.map((code) => (
          <option key={code} value={code} className="bg-surface text-foreground">
            {REGION_CONFIG[code].label}
          </option>
        ))}
      </select>
    </label>
  );
}
