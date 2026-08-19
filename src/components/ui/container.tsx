import type { ReactNode } from "react";

/**
 * Widths align with the header/footer rails so page content sits on the same
 * measure as the chrome above and below it.
 */
const widths = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-[100rem]",
} as const;

export function Container({
  children,
  size = "default",
  className = "",
}: {
  children: ReactNode;
  size?: keyof typeof widths;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full ${widths[size]} px-4 sm:px-6 ${className}`.trim()}>
      {children}
    </div>
  );
}
