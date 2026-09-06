import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { proseElements } from "@/components/mdx/prose-elements";
import type { PortableTextBody } from "@/lib/content/products";

/**
 * Plain rich-text renderer (paragraphs, headings, lists, bold/italic, links) —
 * no custom review-only block types. Used for prose fields like the About
 * page's origin story that don't need Pro/Con/Figure/etc.
 */
export function RenderRichText({ value }: { value: PortableTextBody }) {
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
  };

  return <PortableText value={value} components={components} />;
}
