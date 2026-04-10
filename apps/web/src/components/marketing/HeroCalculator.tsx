"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";

import {
  CALCULATOR_DEFAULTS,
  PredictionsRequestSchema,
  type PredictionsRequest,
} from "@/lib/schemas";

const FIELDS = [
  { id: "hero-num", name: "num_numerical_features" as const, label: "Numerical", placeholder: "25" },
  { id: "hero-cat", name: "num_categorical_features" as const, label: "Categorical", placeholder: "17" },
  { id: "hero-rows", name: "dataset_size" as const, label: "Rows", placeholder: "10 000" },
] as const;

export function HeroCalculator() {
  const router = useRouter();

  const form = useForm<PredictionsRequest>({
    resolver: zodResolver(PredictionsRequestSchema),
    defaultValues: CALCULATOR_DEFAULTS,
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((values) => {
    router.push(
      `/calculate?num=${values.num_numerical_features}&cat=${values.num_categorical_features}&rows=${values.dataset_size}`,
    );
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="relative overflow-hidden bg-ink-950 shadow-elevated">
      {/* Yellow top accent bar */}
      <div
        aria-hidden="true"
        className="h-[3px] bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />

      {/* Grid pattern overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-surface-0) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--color-surface-0) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Subtle yellow corner glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(circle, var(--color-brand-yellow) 0%, transparent 70%)",
        }}
      />

      <div className="relative p-6 sm:p-7">
        <p className="label text-brand-yellow">
          Quick estimate
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
          {FIELDS.map((field) => (
            <div key={field.id} className="group">
              <label
                htmlFor={field.id}
                className="block label text-surface-400 transition-colors duration-150 group-focus-within:text-brand-yellow"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                type="number"
                inputMode="numeric"
                placeholder={field.placeholder}
                disabled={isSubmitting}
                className="mt-2 block w-full border-0 border-b border-surface-0/15 bg-transparent pb-3 font-mono text-lg font-medium tabular-nums text-surface-0 placeholder:text-surface-500 transition-all duration-200 hover:border-surface-0/25 focus-visible:border-brand-yellow focus-visible:outline-none disabled:cursor-not-allowed disabled:text-surface-500"
                {...form.register(field.name, { valueAsNumber: true })}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 bg-gradient-to-br from-brand-yellow to-brand-yellow-warm text-sm font-bold uppercase tracking-[0.08em] text-ink-900 shadow-button transition-all duration-150 hover:from-brand-yellow-hover hover:to-brand-yellow-press disabled:opacity-50"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                Predict energy
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>
        </form>

        <p className="mt-3 text-[0.65rem] leading-relaxed text-surface-400">
          Opens the full calculator with results.
        </p>
      </div>
    </div>
  );
}
