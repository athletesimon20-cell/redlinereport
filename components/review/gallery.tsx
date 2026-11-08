import Image from "next/image";

interface GalleryItem {
  image?: { src: string; width: number; height: number };
  caption?: string;
}

export function Gallery({ items, productTitle }: { items?: GalleryItem[]; productTitle: string }) {
  const photos = (items ?? []).filter((item): item is Required<GalleryItem> => Boolean(item?.image?.src));
  if (photos.length === 0) return null;

  return (
    <div className="mx-auto mt-4 max-w-4xl px-4 sm:px-6">
      <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
        More photos
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {photos.map((item, i) => (
          <figure key={i} className="group relative aspect-square overflow-hidden border border-border bg-surface">
            <Image
              src={item.image.src}
              alt={item.caption ?? `${productTitle} — photo ${i + 1}`}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {item.caption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-ink-950/80 px-2 py-1 font-mono text-[10px] leading-tight text-paper-100">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
