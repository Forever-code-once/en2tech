import type { ReactNode } from "react";

/**
 * Widths align with the header/footer rails (max-w-[110rem] at px-4/px-6) so
 * the vertical grid rules read as one continuous frame down the page.
 */
const widths = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-[110rem]",
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
