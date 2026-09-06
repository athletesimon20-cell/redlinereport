import type { Metadata } from "next";
import Image from "next/image";
import { getAllAuthors } from "@/lib/content/authors";
import { getSiteStory } from "@/lib/content/site-story";
import { RenderRichText } from "@/components/portable-text/render-rich-text";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are and how we test motorcycle gear and bikes.",
};

function initialsFrom(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AboutPage() {
  const [authors, story] = await Promise.all([getAllAuthors(), getSiteStory()]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">About</p>
      <h1 className="font-display mt-2 text-4xl leading-tight sm:text-5xl">Ridden before it&rsquo;s rated.</h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground/80">
        <p>
          Redline Report started with a simple complaint: most gear reviews read like the
          spec sheet with better adjectives. We wanted a place that tells you what a helmet
          actually feels like at hour four of a track day, not just its shell material.
        </p>
        <p>
          Every review on this site is written after real use — commutes, weekend rides, and
          the occasional downpour we didn&rsquo;t plan for. We log the pros and cons before we
          ever touch a rating, and a verdict only gets stamped once we&rsquo;d actually
          recommend the product to a riding buddy.
        </p>
        <p>
          Some links on this site are affiliate links — if you buy through one, we may earn a
          small commission at no extra cost to you. It never changes the verdict. We&rsquo;d
          rather send you to a competitor&rsquo;s product than pretend something we didn&rsquo;t
          like is good.
        </p>
      </div>

      {story?.founderName && (
        <div className="mt-14 border-t border-dashed border-border pt-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Founder</p>
          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
            {story.founderPhoto ? (
              <div className="relative h-28 w-28 shrink-0 overflow-hidden border border-border">
                <Image
                  src={story.founderPhoto.src}
                  alt={story.founderName}
                  fill
                  placeholder={story.founderPhoto.blurDataURL ? "blur" : undefined}
                  blurDataURL={story.founderPhoto.blurDataURL}
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            ) : (
              <span className="flex h-28 w-28 shrink-0 items-center justify-center bg-ink-950 font-mono text-2xl font-bold text-paper-100 dark:bg-accent dark:text-accent-ink">
                {initialsFrom(story.founderName)}
              </span>
            )}
            <div>
              <p className="font-display text-2xl leading-tight">{story.founderName}</p>
              {story.founderTitle && (
                <p className="font-mono text-xs uppercase tracking-wide text-muted">{story.founderTitle}</p>
              )}
              {story.founderBio && (
                <p className="mt-3 text-base leading-relaxed text-foreground/80">{story.founderBio}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {story?.originStory && story.originStory.length > 0 && (
        <div className="mt-14 border-t border-dashed border-border pt-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Our story</p>
          <h2 className="font-display mt-2 text-2xl leading-tight sm:text-3xl">
            {story.originStoryHeading ?? "How Redline Report started"}
          </h2>
          <div className="mt-4">
            <RenderRichText value={story.originStory} />
          </div>
        </div>
      )}

      {authors.length > 0 && (
        <div className="mt-14 border-t border-dashed border-border pt-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">Riders</p>
          <h2 className="font-display mt-2 text-2xl leading-tight sm:text-3xl">Who tests the gear</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {authors.map((author) => (
              <div key={author.slug} className="border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  {author.avatarUrl ? (
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <Image src={author.avatarUrl} alt={author.name} fill sizes="40px" className="object-cover" />
                    </div>
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink-950 font-mono text-sm font-bold text-paper-100 dark:bg-accent dark:text-accent-ink">
                      {author.initials}
                    </span>
                  )}
                  <div>
                    <p className="font-semibold leading-tight">{author.name}</p>
                    <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{author.role}</p>
                  </div>
                </div>
                {author.specialty && (
                  <p className="mt-3 font-mono text-xs uppercase tracking-wide text-accent">{author.specialty}</p>
                )}
                {author.bio && <p className="mt-2 text-sm leading-relaxed text-foreground/75">{author.bio}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
