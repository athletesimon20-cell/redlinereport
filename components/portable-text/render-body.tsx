import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Pro, Con, Story, SilverLining, Alternative } from "@/components/mdx/pros-cons";
import { Figure, Callout, PullQuote } from "@/components/mdx/rich-content";
import { SpecCompareInline, CompetitorCard } from "@/components/mdx/comparisons";
import { BuyBox, type BuyBoxProps } from "@/components/buy-box/buy-box";
import { proseElements } from "@/components/mdx/prose-elements";
import { permalinkFor } from "@/lib/sanity/transform";
import type { PortableTextBody } from "@/lib/content/products";

interface RenderBodyProps {
  body: PortableTextBody;
  product: Pick<BuyBoxProps, "slug" | "title" | "brand" | "price" | "regionalPricing">;
}

export function RenderBody({ body, product }: RenderBodyProps) {
  const components: PortableTextComponents = {
    block: {
      h2: ({ children }) => proseElements.h2({ children }),
      h3: ({ children }) => proseElements.h3({ children }),
      h4: ({ children }) => proseElements.h4({ children }),
      normal: ({ children }) => proseElements.p({ children }),
      blockquote: ({ children }) => proseElements.blockquote({ children }),
    },
    list: {
      bullet: ({ children }) => proseElements.ul({ children }),
      number: ({ children }) => proseElements.ol({ children }),
    },
    listItem: {
      bullet: ({ children }) => proseElements.li({ children }),
      number: ({ children }) => proseElements.li({ children }),
    },
    marks: {
      strong: ({ children }) => proseElements.strong({ children }),
      em: ({ children }) => proseElements.em({ children }),
      link: ({ children, value }) => proseElements.a({ children, href: value?.href }),
    },
    types: {
      proBlock: ({ value }) => (
        <Pro title={value.title}>
          <p>{value.body}</p>
          {value.story && <Story>{value.story}</Story>}
        </Pro>
      ),
      conBlock: ({ value }) => (
        <Con title={value.title}>
          <p>{value.body}</p>
          {value.silverLining && <SilverLining>{value.silverLining}</SilverLining>}
          {value.alternative && <Alternative>{value.alternative}</Alternative>}
        </Con>
      ),
      figureBlock: ({ value }) => (
        <Figure src={value.imageUrl} alt={value.alt} caption={value.caption} credit={value.credit} />
      ),
      calloutBlock: ({ value }) => (
        <Callout type={value.type}>
          <p>{value.body}</p>
        </Callout>
      ),
      pullQuoteBlock: ({ value }) => <PullQuote>{value.text}</PullQuote>,
      specCompareBlock: ({ value }) => (
        <SpecCompareInline label={value.label} unit={value.unit} rows={value.rows ?? []} />
      ),
      competitorCardBlock: ({ value }) => (
        <CompetitorCard
          name={value.name}
          brand={value.brand}
          verdict={value.verdict}
          href={
            value.linkedReviewSlug && value.linkedReviewType
              ? permalinkFor(value.linkedReviewType, value.linkedReviewSlug)
              : undefined
          }
        >
          <p>{value.body}</p>
        </CompetitorCard>
      ),
      buyBoxBlock: ({ value }) => (
        <BuyBox
          slug={product.slug}
          title={product.title}
          brand={product.brand}
          price={
            value.priceOverride
              ? { amount: value.priceOverride, currency: product.price.currency }
              : product.price
          }
          regionalPricing={value.priceOverride ? undefined : product.regionalPricing}
          vendor={value.vendor || undefined}
          vendorLabel={value.label || undefined}
        />
      ),
    },
  };

  return <PortableText value={body} components={components} />;
}
