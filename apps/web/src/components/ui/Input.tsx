"use client";

import { useId, type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = Omit<ComponentPropsWithRef<"input">, "children"> & {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
};

/**
 * Labeled text input with inline error + hint rendering. Accepts `ref`
 * directly as a prop (React 19 pattern, no `forwardRef` needed) so it
 * composes cleanly with `react-hook-form`'s `register()`.
 */
export function Input({
  label,
  error,
  hint,
  className,
  id: providedId,
  ref,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy = [error ? errorId : null, hint && !error ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-ink-800"
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          "h-11 rounded-sm border bg-surface-0 px-3",
          "text-base text-ink-800 placeholder:text-ink-400",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow",
          "disabled:cursor-not-allowed disabled:bg-surface-50 disabled:text-ink-400",
          error
            ? "border-danger focus-visible:outline-danger"
            : "border-surface-300 hover:border-surface-400",
          className,
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={hintId} className="text-xs text-ink-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
