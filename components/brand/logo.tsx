import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Redline Report logo. Each lockup ships as a light-mode and a dark-mode PNG
 * (public/brand); globals.css shows the right one based on the `.dark` class.
 * Size with a height class (e.g. "h-7") — width follows the aspect ratio.
 */

interface ThemedLogoProps {
  name: "horizontal" | "stacked";
  width: number;
  height: number;
  /** Widest rendered width in CSS px — lets Next pick a right-sized file. */
  displayWidth: number;
  className?: string;
  priority?: boolean;
}

function ThemedLogo({ name, width, height, displayWidth, className, priority }: ThemedLogoProps) {
  const shared = { width, height, priority, sizes: `${displayWidth}px` };
  return (
    <>
      <Image
        {...shared}
        alt="Redline Report"
        src={`/brand/logo-${name}-light.png`}
        className={cn("rr-logo-light block w-auto shrink-0", className)}
      />
      <Image
        {...shared}
        alt="Redline Report"
        src={`/brand/logo-${name}-dark.png`}
        className={cn("rr-logo-dark w-auto shrink-0", className)}
      />
    </>
  );
}

/** Gauge + single-line wordmark for the header, footer, and other tight spots. */
export function LogoHorizontal({ className }: { className?: string }) {
  return <ThemedLogo name="horizontal" width={1200} height={103} displayWidth={330} className={className} priority />;
}

/** Gauge stacked over the wordmark — primary hero usage. */
export function LogoLockup({ className }: { className?: string }) {
  return <ThemedLogo name="stacked" width={900} height={508} displayWidth={320} className={className} priority />;
}
