"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";

import { ApiError, postPredictions } from "@/lib/api";
import {
  CALCULATOR_DEFAULTS,
  PredictionsRequestSchema,
  type PredictionsRequest,
  type PredictionsResponse,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";

/* ---------------------------------------------------------------------- */
/*  Field config                                                          */
/* ---------------------------------------------------------------------- */

const FIELDS = [
  {
    name: "num_numerical_features" as const,
    label: "Numerical features",
    min: 1,
    max: 10_000,
    placeholder: "25",
    range: "1 – 10,000",
  },
  {
    name: "num_categorical_features" as const,
    label: "Categorical features",
    min: 0,
    max: 10_000,
    placeholder: "17",
    range: "0 – 10,000",
  },
  {
    name: "dataset_size" as const,
    label: "Dataset rows",
    min: 1,
    max: 100_000_000,
    placeholder: "10 000",
    range: "1 – 100,000,000",
  },
] as const;

/* ---------------------------------------------------------------------- */
/*  Component                                                             */
/* ---------------------------------------------------------------------- */

type CalculatorFormProps = {
  readonly onSuccess: (data: PredictionsResponse, input: PredictionsRequest) => void;
  readonly defaultValues?: PredictionsRequest;
  readonly autoSubmit?: boolean;
};


export function CalculatorForm({
  onSuccess,
  defaultValues,
  autoSubmit,
}: CalculatorFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const autoSubmitFired = useRef(false);
  const idPrefix = useId();

  const form = useForm<PredictionsRequest>({
    resolver: zodResolver(PredictionsRequestSchema),
    defaultValues: defaultValues ?? CALCULATOR_DEFAULTS,
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    (e?: React.BaseSyntheticEvent) =>
      form.handleSubmit(async (values) => {
        setApiError(null);
        try {
          const data = await postPredictions(values);
          onSuccess(data, values);
        } catch (error) {
          if (error instanceof ApiError) {
            setApiError(error.message);
          } else {
            setApiError("An unexpected error occurred. Please try again.");
          }
        }
      })(e),
    [form, onSuccess],
  );

  useEffect(() => {
    if (autoSubmit && !autoSubmitFired.current) {
      autoSubmitFired.current = true;
      requestAnimationFrame(() => {
        onSubmit();
      });
    }
  }, [autoSubmit, onSubmit]);

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="animate-fade-in-up">
      <div
        aria-hidden="true"
        className="h-[3px] w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />

      <p className="mt-5 font-display text-h3 font-extrabold tracking-tight text-ink-950">
        Describe your dataset
      </p>
      <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-500">
        Three numbers define the prediction — enter feature counts and row
        size, then compare five algorithms.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-10">
        <div className="grid gap-x-10 gap-y-8 sm:grid-cols-3 lg:gap-x-14">
          {FIELDS.map((field) => {
            const fieldId = `${idPrefix}-${field.name}`;
            const errorId = `${fieldId}-error`;
            const hintId = `${fieldId}-hint`;
            const error = form.formState.errors[field.name]?.message;

            return (
              <div key={field.name} className="group">
                <label
                  htmlFor={fieldId}
                  className="block label text-ink-400 transition-colors duration-150 group-focus-within:text-ink-700"
                >
                  {field.label}
                </label>
                <input
                  id={fieldId}
                  type="number"
                  inputMode="numeric"
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={
                    [error ? errorId : null, !error ? hintId : null]
                      .filter(Boolean)
                      .join(" ") || undefined
                  }
                  disabled={isSubmitting}
                  className={[
                    "mt-3 block w-full border-0 border-b-2 bg-transparent pb-3",
                    "font-mono text-2xl font-medium tabular-nums text-ink-900",
                    "placeholder:text-ink-300",
                    "transition-all duration-200",
                    "focus-visible:outline-none",
                    error
                      ? "border-danger/60"
                      : "border-surface-200 hover:border-ink-300 focus-visible:border-brand-yellow",
                    "disabled:cursor-not-allowed disabled:text-ink-400",
                  ].join(" ")}
                  {...form.register(field.name, { valueAsNumber: true })}
                />
                {!error ? (
                  <p
                    id={hintId}
                    className="mt-2 text-[0.6875rem] tabular-nums text-ink-400"
                  >
                    {field.range}
                  </p>
                ) : null}
                {error ? (
                  <p
                    id={errorId}
                    className="mt-2 text-xs font-medium text-danger"
                  >
                    {error}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        {apiError ? (
          <div
            role="alert"
            className="mt-8 flex items-start gap-3 border border-danger/20 bg-danger/5 p-4 text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <p>{apiError}</p>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Calculating…
              </>
            ) : (
              <>
                Calculate energy
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </>
            )}
          </Button>
          <p className="max-w-sm text-[0.6875rem] leading-relaxed text-ink-400">
            Inputs within 25 / 25 / 350,000 use the Random Forest path.
            Larger inputs extrapolate via linear regression.
          </p>
        </div>
      </form>
    </div>
  );
}
