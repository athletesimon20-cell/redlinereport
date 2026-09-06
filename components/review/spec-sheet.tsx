import type { SpecFieldDef } from "@/lib/specs/categories";
import { formatSpecValue } from "@/lib/specs/categories";

export function SpecSheet({
  specs,
  fields,
}: {
  specs: Record<string, string | number | boolean>;
  fields: SpecFieldDef[];
}) {
  const present = fields.filter((f) => specs[f.key] !== undefined);
  if (present.length === 0) return null;

  return (
    <div className="border border-border bg-surface p-4">
      <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        Spec plate
      </p>
      <dl className="divide-y divide-border/70">
        {present.map((field) => (
          <div key={field.key} className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0">
            <dt className="font-mono text-xs text-muted">{field.label}</dt>
            <dd className="font-mono text-sm text-foreground">
              {formatSpecValue(specs[field.key], field)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
