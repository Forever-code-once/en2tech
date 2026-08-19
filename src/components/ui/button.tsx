import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Pill buttons. The primary lights up on hover rather than darkening — on a
 * black ground, emphasis reads as more light, not less.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-600 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-45";

const variants = {
  primary:
    "bg-volt-400 text-void hover:bg-volt-300 hover:shadow-[0_0_36px_-8px_rgb(34_224_255/0.7)]",
  secondary:
    "border border-line-hi bg-raised/70 text-bright backdrop-blur-sm hover:border-volt-500 hover:bg-lifted",
  ghost:
    "border border-line text-muted hover:border-volt-500 hover:text-volt-300",
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
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
