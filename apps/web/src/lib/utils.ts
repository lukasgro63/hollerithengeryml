import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally join class names and de-duplicate conflicting Tailwind
 * utilities. The canonical helper used throughout the component library.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
