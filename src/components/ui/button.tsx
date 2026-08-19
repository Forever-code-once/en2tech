import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * Square, ruled, uppercase. Hover inverts foreground and background rather
 * than tinting — the whole system signals state by swapping, not shading.
 */
const base =
  "label inline-flex items-center justify-center gap-2.5 border transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40";

const variants = {
  primary: "border-phos bg-phos text-void hover:bg-transparent hover:text-phos",
  secondary: "border-grid-hi bg-transparent text-fg hover:border-phos hover:bg-phos hover:text-void",
  ghost: "border-grid bg-transparent text-fg-dim hover:border-phos hover:text-phos",
} as const;

const sizes = {
  sm: "px-4 py-2.5",
  md: "px-6 py-3.5",
  lg: "px-8 py-4.5",
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
