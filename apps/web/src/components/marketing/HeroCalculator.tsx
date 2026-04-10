"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
      <div
        aria-hidden="true"
        className="h-[3px] bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />

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
          Check your energy footprint
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
                min={field.name === "dataset_size" ? 1 : 0}
                placeholder={field.placeholder}
                disabled={isSubmitting}
                aria-describedby={form.formState.errors[field.name] ? `${field.id}-error` : undefined}
                aria-invalid={!!form.formState.errors[field.name]}
                className="mt-2 block w-full border-0 border-b border-surface-0/15 bg-transparent pb-3 font-mono text-lg font-medium tabular-nums text-surface-0 placeholder:text-surface-500 transition-all duration-200 hover:border-surface-0/25 focus-visible:border-brand-yellow focus-visible:outline-none disabled:cursor-not-allowed disabled:text-surface-500"
                {...form.register(field.name, { valueAsNumber: true })}
              />
              {form.formState.errors[field.name] && (
                <p id={`${field.id}-error`} role="alert" className="mt-1.5 text-xs text-accent-rust">
                  {form.formState.errors[field.name]?.message}
                </p>
              )}
            </div>
          ))}

          <Button type="submit" disabled={isSubmitting} size="md" className="mt-3 w-full">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <>
                Predict energy
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-3 text-[0.65rem] leading-relaxed text-surface-400">
          Compare energy across 5 algorithms.
        </p>
      </div>
    </div>
  );
}
