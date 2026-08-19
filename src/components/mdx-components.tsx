import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Element overrides for MDX note bodies. Headings stay in the mono display
 * voice; running text uses the sans companion, because mono at paragraph
 * length is punishing to read.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 scroll-mt-32 font-mono text-2xl uppercase leading-tight text-fg"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 scroll-mt-32 font-mono text-lg uppercase leading-tight text-fg"
      {...props}
    />
  ),
  p: (props) => <p className="mt-5 text-fg-dim" {...props} />,
  ul: (props) => <ul className="mt-5 space-y-2.5" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2.5 pl-5" {...props} />,
  li: (props) => <li className="text-fg-dim marker:text-phos" {...props} />,
  strong: (props) => <strong className="font-medium text-fg" {...props} />,
  em: (props) => <em className="text-fg italic" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-2 border-phos bg-shell py-4 pl-6 pr-4 text-fg"
      {...props}
    />
  ),
  hr: () => <hr className="rule my-12 border-0" />,
  code: (props) => (
    <code
      className="border border-grid bg-shell px-1.5 py-0.5 font-mono text-[0.85em] text-phos"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto border border-grid bg-shell p-5 font-mono text-sm leading-relaxed [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-fg"
      {...props}
    />
  ),
  a: ({ href = "", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "text-phos underline decoration-phos-dim underline-offset-[3px] transition-colors hover:decoration-phos";

    if (isInternal) {
      return (
        <Link href={href} className={className} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...rest}
      >
        {children}
      </a>
    );
  },
};
