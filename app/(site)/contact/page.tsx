import type { Metadata } from "next";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Redline Report team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Contact</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Get in touch</h1>
      <p className="mt-4 text-lg leading-relaxed text-foreground/75">
        Got gear you think we should test, a correction on a review, or a partnership
        question? Send us a note.
      </p>

      <a
        href="mailto:hello@redlinereport.example"
        className="mt-8 inline-flex items-center gap-2 bg-ink-950 px-6 py-3 font-mono text-sm font-bold uppercase tracking-wide text-paper-100 transition-colors hover:bg-accent hover:text-accent-ink dark:bg-accent dark:text-accent-ink dark:hover:bg-paper-100"
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        hello@redlinereport.example
      </a>

      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-muted">
        Placeholder address — swap in your real inbox before launch.
      </p>
    </div>
  );
}
