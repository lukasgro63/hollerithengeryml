import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "accent" | "dark";

type CardProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly hover?: boolean;
  readonly variant?: CardVariant;
};

/**
 * `accent` shares the same base styles as `default` but renders a
 * yellow gradient accent bar along the top edge of the card.
 */
const VARIANT_STYLES: Record<CardVariant, string> = {
  default: "bg-surface-0 shadow-card",
  accent: "bg-surface-0 shadow-card",
  dark: "bg-surface-850 border border-surface-0/8 text-surface-200",
};

export function Card({
  children,
  className,
  hover = false,
  variant = "default",
}: CardProps) {
  return (
    <div
      className={cn(
        "relative p-6 sm:p-8",
        VARIANT_STYLES[variant],
        hover && (variant === "dark" ? "card-glow" : "card-hover"),
        className,
      )}
    >
      {variant === "accent" && (
        <div
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-[2px] rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
        />
      )}
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-lg font-bold tracking-tight text-ink-900",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("mt-3 text-sm leading-relaxed text-ink-600", className)}>
      {children}
    </p>
  );
}
