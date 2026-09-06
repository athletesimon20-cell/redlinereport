import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <span className="stamp flex h-28 w-28 items-center justify-center font-display text-3xl text-accent">
        404
      </span>
      <h1 className="font-display mt-8 text-4xl leading-tight sm:text-5xl">Wrong turn.</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/75">
        This page isn&rsquo;t in our garage. It may have been moved, renamed, or never existed
        in the first place.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 bg-ink-950 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-paper-100 transition-colors hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink dark:hover:bg-paper-100"
      >
        Back to the homepage
      </Link>
    </div>
  );
}
