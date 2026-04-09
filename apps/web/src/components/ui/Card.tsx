import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

/**
 * Plain surface card with a 4px border radius (matches HHZ's default) and
 * a subtle 1px border from the surface scale. No drop shadow — HHZ keeps
 * cards flat.
 */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-surface-200 bg-surface-0 p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn("text-h4 font-bold tracking-tight text-ink-800", className)}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <p className={cn("mt-3 text-base leading-relaxed text-ink-600", className)}>
      {children}
    </p>
  );
}
