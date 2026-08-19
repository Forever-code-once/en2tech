import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

/**
 * Framed photograph.
 *
 * The imagery is the only source of colour on the page, so it is deliberately
 * NOT muted into the background: `photo-bright` pushes saturation and contrast
 * slightly, and the only grading is a soft fade at the very bottom edge so a
 * caption can sit over it without a flat scrim across the whole frame.
 *
 * Static imports give Next the intrinsic dimensions and a generated blur
 * placeholder for free — no CLS, no hand-maintained width/height pairs.
 */
export function Photo({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  aspect = "aspect-[4/3]",
  caption,
  className = "",
  fadeBottom = false,
}: {
  src: StaticImageData;
  /** Describes what is happening, not "photo of…". Empty only if decorative. */
  alt: string;
  priority?: boolean;
  sizes?: string;
  aspect?: string;
  caption?: ReactNode;
  className?: string;
  fadeBottom?: boolean;
}) {
  return (
    <figure className={`group relative ${className}`.trim()}>
      <div
        className={`relative ${aspect} overflow-hidden rounded-2xl border border-line bg-surface`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder="blur"
          className={`photo-bright object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${
            fadeBottom ? "photo-fade-bottom" : ""
          }`}
        />

        {/* Volt edge-light that rises on hover — ties the photo to the accent
            without tinting the image itself. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:ring-volt-400/35"
        />
      </div>

      {caption ? (
        <figcaption className="label mt-4 text-faint">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
