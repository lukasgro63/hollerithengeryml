"use client";

import { useId, type ComponentPropsWithRef } from "react";
import { cn } from "@/lib/utils";

type InputProps = Omit<ComponentPropsWithRef<"input">, "children"> & {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
};

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
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-display text-xs font-bold uppercase tracking-widest text-ink-500"
      >
        {label}
      </label>
      <input
        id={id}
        ref={ref}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          "h-12 border-0 border-b-2 bg-transparent px-0",
          "text-base font-medium text-ink-900 tabular-nums placeholder:text-ink-400",
          "transition-all duration-150",
          "focus-visible:outline-none focus-visible:border-brand-yellow",
          "disabled:cursor-not-allowed disabled:text-ink-400",
          error
            ? "border-danger/60"
            : "border-surface-200 hover:border-ink-300",
          className,
        )}
        {...props}
      />
      {hint && !error ? (
        <p id={hintId} className="text-[0.7rem] text-ink-400">
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
