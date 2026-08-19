import type { ReactNode } from "react";

const widths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-[92rem]",
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
    <div className={`mx-auto w-full ${widths[size]} px-4 sm:px-8 ${className}`.trim()}>
      {children}
    </div>
  );
}
