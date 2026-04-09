import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold " +
  "transition-colors duration-150 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-yellow " +
  "disabled:opacity-60 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-yellow text-ink-900 hover:bg-brand-yellow-hover active:bg-brand-yellow-press",
  secondary:
    "bg-accent-rust text-white hover:bg-accent-rust-hover active:bg-accent-rust-hover",
  ghost:
    "bg-transparent text-ink-800 hover:bg-surface-100 active:bg-surface-200",
};

const SIZES: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-base",
  lg: "h-13 px-7 text-lg",
};

type CommonProps = {
  readonly children: ReactNode;
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & {
    readonly href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  readonly href: string;
  readonly target?: string;
  readonly rel?: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel } = props;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props;
  void _v;
  void _s;
  void _c;
  void _ch;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
