import { Fragment } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { StampBadge } from "@/components/ui/stamp-badge";
import { BuyBox } from "@/components/buy-box/buy-box";
import { formatSpecValue, type SpecFieldDef } from "@/lib/specs/categories";
import { cn } from "@/lib/utils";
import type { AnyProduct } from "@/lib/content/products";

function groupFields(fields: SpecFieldDef[]) {
  const groups = new Map<string, SpecFieldDef[]>();
  for (const field of fields) {
    const key = field.group ?? "Specs";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(field);
  }
  return Array.from(groups.entries());
}

function bestValue(products: AnyProduct[], field: SpecFieldDef): number | undefined {
  if (field.type !== "number" || field.higherIsBetter === undefined) return undefined;
  const values = products
    .map((p) => p.specs[field.key])
    .filter((v): v is number => typeof v === "number");
  if (values.length < 2) return undefined;
  return field.higherIsBetter ? Math.max(...values) : Math.min(...values);
}

export function CompareTable({
  products,
  specFields,
}: {
  products: AnyProduct[];
  specFields: SpecFieldDef[];
}) {
  if (products.length < 2) {
    return (
      <div className="border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-mono text-sm uppercase tracking-wide text-muted">
          Pick at least two to compare.
        </p>
      </div>
    );
  }

  const groups = groupFields(specFields);

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-b border-border bg-surface">
            <th className="w-40 px-4 py-4 text-left align-bottom font-mono text-[11px] uppercase tracking-wide text-muted">
              &nbsp;
            </th>
            {products.map((product) => (
              <th key={product.slug} className="min-w-[220px] px-4 py-4 text-left align-bottom">
                <Link href={product.permalink} className="group block">
                  <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{product.brand}</p>
                  <p className="font-display text-lg leading-tight group-hover:text-accent">{product.title}</p>
                </Link>
                <div className="mt-2 flex items-center gap-2">
                  <StampBadge rating={product.rating.overall} size="sm" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map(([groupName, fields]) => (
            <Fragment key={groupName}>
              <tr className="bg-surface/60">
                <td
                  colSpan={products.length + 1}
                  className="px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted"
                >
                  {groupName}
                </td>
              </tr>
              {fields.map((field) => {
                const best = bestValue(products, field);
                return (
                  <tr key={field.key} className="border-b border-border/60">
                    <td className="px-4 py-3 font-mono text-xs text-muted">
                      {field.label}
                      {field.unit ? ` (${field.unit})` : ""}
                    </td>
                    {products.map((product) => {
                      const raw = product.specs[field.key];
                      const isBest = best !== undefined && raw === best;
                      return (
                        <td
                          key={product.slug}
                          className={cn(
                            "px-4 py-3 font-mono text-sm",
                            isBest ? "font-bold text-accent" : "text-foreground/85"
                          )}
                        >
                          <span className="inline-flex items-center gap-1.5">
                            {isBest && <Trophy className="h-3.5 w-3.5" aria-hidden="true" />}
                            {formatSpecValue(raw, field)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </Fragment>
          ))}
          <tr>
            <td className="px-4 py-5">&nbsp;</td>
            {products.map((product) => (
              <td key={product.slug} className="px-4 py-5 align-top">
                <BuyBox
                  slug={product.slug}
                  title={product.title}
                  brand={product.brand}
                  price={product.price}
                  regionalPricing={product.regionalPricing}
                  variant="card"
                  className="max-w-none"
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
