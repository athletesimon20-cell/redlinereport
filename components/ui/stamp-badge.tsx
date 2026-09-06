import { cn } from "@/lib/utils";

interface StampBadgeProps {
  rating: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  sm: { box: "h-16 w-16", num: "text-lg", label: "text-[7px]" },
  md: { box: "h-24 w-24", num: "text-2xl", label: "text-[8px]" },
  lg: { box: "h-32 w-32", num: "text-4xl", label: "text-[9px]" },
};

function verdictLabel(rating: number) {
  if (rating >= 9) return "FIELD TESTED";
  if (rating >= 7) return "RECOMMENDED";
  if (rating >= 5) return "MIXED VERDICT";
  return "PROCEED WITH CAUTION";
}

export function StampBadge({ rating, label, size = "md", className }: StampBadgeProps) {
  const s = SIZES[size];
  const tone = rating >= 7 ? "text-accent" : "text-danger";

  return (
    <div
      className={cn(
        "stamp flex flex-col items-center justify-center font-mono uppercase leading-none",
        s.box,
        tone,
        className
      )}
      role="img"
      aria-label={`Verdict: ${rating.toFixed(1)} out of 10, ${label ?? verdictLabel(rating)}`}
    >
      <span className={cn("font-display tracking-wide", s.num)}>{rating.toFixed(1)}</span>
      <span className="opacity-80">/10</span>
      <span className={cn("mt-1 px-1 text-center font-semibold tracking-[0.12em]", s.label)}>
        {label ?? verdictLabel(rating)}
      </span>
    </div>
  );
}
