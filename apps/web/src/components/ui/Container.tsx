import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly as?: ElementType;
  readonly size?: "narrow" | "default" | "wide";
};

const SIZE_CLASSES: Record<NonNullable<ContainerProps["size"]>, string> = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

/**
 * Horizontal content container with responsive padding. All top-level
 * sections use this to keep the measure consistent across the site.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-5 sm:px-6 lg:px-8", SIZE_CLASSES[size], className)}>
      {children}
    </Tag>
  );
}
