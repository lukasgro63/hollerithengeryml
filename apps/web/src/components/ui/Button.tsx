import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "yellow-outline";
type Size = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-3 " +
  "uppercase tracking-[0.08em] font-semibold " +
  "transition-all duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow " +
  "disabled:opacity-50 disabled:pointer-events-none select-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-yellow to-brand-yellow-warm text-ink-900 shadow-button " +
    "hover:from-brand-yellow-hover hover:to-brand-yellow-press active:from-brand-yellow-press active:to-brand-yellow-press",
  secondary:
    "bg-transparent border-2 border-ink-900 text-ink-900 " +
    "hover:bg-ink-900 hover:text-surface-0 active:bg-ink-800 active:text-surface-0",
  ghost:
    "text-ink-700 hover:bg-surface-100 active:bg-surface-200 normal-case tracking-normal",
  "yellow-outline":
    "bg-transparent border-2 border-brand-yellow text-brand-yellow " +
    "hover:bg-brand-yellow hover:text-ink-900 active:bg-brand-yellow-press active:text-ink-900",
};

const SIZES: Record<Size, string> = {
  sm: "h-10 px-5 text-xs",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-10 text-sm",
};

type CommonProps = {
  readonly children: ReactNode;
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
};

type ButtonAsButton = CommonProps &
  ComponentPropsWithoutRef<"button"> & { readonly href?: undefined };

type ButtonAsLink = CommonProps & {
  readonly href: string;
  readonly target?: string;
  readonly rel?: string;
  readonly onClick?: () => void;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in props && props.href !== undefined) {
    const { href, target, rel, onClick } = props;
    const isExternal = /^https?:\/\//.test(href);
    return (
      <Link
        href={href}
        className={classes}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...buttonProps } = props;
  void _v; void _s; void _c; void _ch;
  return (
    <button {...buttonProps} className={classes}>{children}</button>
  );
}
