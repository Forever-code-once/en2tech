import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Square, 2px-bordered, uppercase. Solid forest is the primary action; hover
 * empties the fill so the border carries it — the same swap the plates use.
 */
const base =
  "label inline-flex items-center justify-center gap-2.5 border-2 transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45";

const variants = {
  primary:
    "border-forest-800 bg-forest-800 text-paper-200 hover:bg-transparent hover:text-forest-800",
  secondary:
    "border-forest-800 bg-transparent text-forest-800 hover:bg-forest-800 hover:text-paper-200",
  accent:
    "border-clay-600 bg-clay-600 text-paper-100 hover:bg-transparent hover:text-clay-600",
  ghost:
    "border-paper-400 bg-transparent text-ink-soft hover:border-forest-800 hover:text-forest-800",
} as const;

const sizes = {
  sm: "px-4 py-2.5",
  md: "px-6 py-3.5",
  lg: "px-8 py-4",
} as const;

type Shared = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Shared & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: Shared & ComponentProps<"button">) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
