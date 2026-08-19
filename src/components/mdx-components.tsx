import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Element overrides for MDX note bodies. Headings take the slab display face;
 * running text stays in Public Sans at a comfortable measure.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 scroll-mt-32 font-slab text-3xl leading-tight font-bold text-forest-800"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 scroll-mt-32 font-slab text-xl leading-tight font-bold text-forest-800"
      {...props}
    />
  ),
  p: (props) => (
    <p className="measure mt-5 text-[1.0625rem] leading-[1.7] text-ink-soft" {...props} />
  ),
  ul: (props) => <ul className="measure mt-5 space-y-2.5" {...props} />,
  ol: (props) => <ol className="measure mt-5 list-decimal space-y-2.5 pl-5" {...props} />,
  li: (props) => (
    <li
      className="text-[1.0625rem] leading-[1.7] text-ink-soft marker:text-clay-600"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-600 text-ink" {...props} />,
  em: (props) => <em className="text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="measure mt-8 border-l-4 border-clay-600 bg-paper-100 py-5 pl-6 pr-5 font-slab text-xl leading-relaxed text-forest-800"
      {...props}
    />
  ),
  hr: () => <hr className="rule-2 my-12 border-0" />,
  code: (props) => (
    <code
      className="border border-paper-400 bg-paper-100 px-1.5 py-0.5 font-mono text-[0.875em] text-clay-700"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto border-2 border-forest-800 bg-forest-800 p-5 font-mono text-sm leading-relaxed text-paper-200 [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-paper-200"
      {...props}
    />
  ),
  a: ({ href = "", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "text-clay-600 underline decoration-2 underline-offset-[3px] transition-colors hover:text-clay-700";

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
