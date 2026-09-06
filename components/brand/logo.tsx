import { cn } from "@/lib/utils";

/**
 * Redline Report wordmark, per design_handoff_redline_logo (turn 5, "Struck").
 * Ratios/colors are defined in the .rr-* classes in globals.css — scale these
 * only via font-size (inherited from a parent text-* class or inline style).
 */

/** Stacked lockup — REDLINE over Report, red strike through REDLINE only. Primary usage. */
export function LogoLockup({ className }: { className?: string }) {
  return (
    <div className={cn("rr-lockup", className)}>
      <span className="rr-strikeline">
        <span className="rr-heavy">Redline</span>
        <span className="rr-strike" aria-hidden="true" />
      </span>
      <span className="rr-light">Report</span>
    </div>
  );
}

/** Single-line lockup for the header/nav and other small/tight spots. */
export function LogoHorizontal({ className }: { className?: string }) {
  return (
    <span className={cn("rr-horizontal", className)}>
      Redline<span className="rr-light"> Report</span>
      <span className="rr-strike" aria-hidden="true" />
    </span>
  );
}

/** Square "R" mark — avatar/app-icon usage. `small` drops the strike per the handoff (<24px). */
export function LogoMark({ small, className }: { small?: boolean; className?: string }) {
  return (
    <div className={cn("rr-mark", small && "rr-mark--small", className)} aria-hidden="true">
      <span>R</span>
    </div>
  );
}
