import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Element overrides for MDX note bodies. Headings take the slab display face;
 * running text stays in Public Sans at a comfortable measure.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 scroll-mt-32 font-display text-3xl leading-tight font-bold text-bright"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 scroll-mt-32 font-display text-xl leading-tight font-bold text-bright"
      {...props}
    />
  ),
  p: (props) => (
    <p className="measure mt-5 text-[1.0625rem] leading-[1.7] text-muted" {...props} />
  ),
  ul: (props) => <ul className="measure mt-5 space-y-2.5" {...props} />,
  ol: (props) => <ol className="measure mt-5 list-decimal space-y-2.5 pl-5" {...props} />,
  li: (props) => (
    <li
      className="text-[1.0625rem] leading-[1.7] text-muted marker:text-volt-400"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-600 text-bright" {...props} />,
  em: (props) => <em className="text-bright" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="measure mt-8 border-l-4 border-volt-500 bg-surface py-5 pl-6 pr-5 font-display text-xl leading-relaxed text-bright"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-0" />,
  code: (props) => (
    <code
      className="border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.875em] text-volt-300"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto border border-line bg-raised p-5 font-mono text-sm leading-relaxed text-bright [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-bright"
      {...props}
    />
  ),
  a: ({ href = "", children, ...rest }) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    const className =
      "text-volt-400 underline decoration-2 underline-offset-[3px] transition-colors hover:text-volt-300";

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
