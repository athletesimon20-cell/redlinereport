"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Ride it, wear it, break it in",
    body: "Every product goes through real commutes, weekend blasts, and at least one ride we wish we'd skipped — rain included.",
  },
  {
    n: "02",
    title: "Log every pro and con",
    body: "We document what worked, what didn't, and how it compares to what we've tested before — not what the spec sheet promises.",
  },
  {
    n: "03",
    title: "Stamp the verdict",
    body: "A rating only ships once we'd actually recommend it to a riding buddy — or tell them exactly why we wouldn't.",
  },
];

export function HowWeTest() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Methodology</p>
        <h2 className="font-display mt-2 max-w-lg text-3xl leading-tight text-balance sm:text-4xl">
          How a review earns its stamp
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border-t-2 border-border pt-4"
            >
              <span className="font-mono text-sm text-accent">{step.n}</span>
              <h3 className="font-display mt-2 text-xl leading-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
