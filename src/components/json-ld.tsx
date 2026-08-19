/**
 * Renders a JSON-LD block. Content is serialized with JSON.stringify and the
 * `<` escaped, so a stray closing tag in data can never break out of the script.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\u003c"),
      }}
    />
  );
}
