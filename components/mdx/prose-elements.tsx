import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

export const proseElements = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="font-display mt-14 mb-4 border-t border-border pt-6 text-3xl leading-tight text-balance first:mt-0 first:border-t-0 first:pt-0 sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="font-display mt-10 mb-3 text-xl leading-tight text-balance sm:text-2xl" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <h4 className="mt-8 mb-2 font-mono text-xs font-bold uppercase tracking-[0.12em] text-muted" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="my-4 text-[1.05rem] leading-relaxed text-foreground/90" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="my-4 ml-5 list-disc space-y-1.5 text-[1.05rem] leading-relaxed text-foreground/90 marker:text-accent" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="my-4 ml-5 list-decimal space-y-1.5 text-[1.05rem] leading-relaxed text-foreground/90 marker:font-mono marker:text-muted" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li className="pl-1" {...props} />,
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return <Link href={href} className="font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent" {...props} />;
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline decoration-accent/40 underline-offset-2 hover:decoration-accent"
        {...props}
      />
    );
  },
  strong: (props: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-foreground" {...props} />,
  em: (props: ComponentPropsWithoutRef<"em">) => <em className="italic" {...props} />,
  hr: () => <hr className="my-10 border-dashed border-border" />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="my-6 border-l-2 border-accent pl-4 italic text-foreground/80" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="not-prose my-8 overflow-x-auto border border-border">
      <table className="w-full border-collapse font-mono text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<"thead">) => <thead className="bg-surface" {...props} />,
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border-b border-border px-3 py-2 text-left text-xs font-bold uppercase tracking-wide text-muted" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-border/60 px-3 py-2 text-foreground/90" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded-sm bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-foreground" {...props} />
  ),
};
