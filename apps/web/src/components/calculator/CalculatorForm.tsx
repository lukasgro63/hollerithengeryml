"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Loader2, Zap } from "lucide-react";

import { ApiError, postPredictions } from "@/lib/api";
import {
  PredictionsRequestSchema,
  type PredictionsRequest,
  type PredictionsResponse,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

type CalculatorFormProps = {
  readonly onSuccess: (data: PredictionsResponse, input: PredictionsRequest) => void;
};

const DEFAULT_VALUES: PredictionsRequest = {
  num_numerical_features: 25,
  num_categorical_features: 17,
  dataset_size: 10_000,
};

export function CalculatorForm({ onSuccess }: CalculatorFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<PredictionsRequest>({
    resolver: zodResolver(PredictionsRequestSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit(async (values) => {
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
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-sm bg-brand-yellow"
        >
          <Zap className="h-5 w-5 text-ink-900" strokeWidth={2.5} />
        </span>
        <div>
          <h2 className="text-h4 font-bold leading-tight tracking-tight text-ink-900">
            Calculator inputs
          </h2>
          <p className="text-sm text-ink-500">
            Describe the shape of your dataset.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
        <div className="grid gap-5 sm:grid-cols-3">
          <Input
            label="Numerical features"
            type="number"
            inputMode="numeric"
            min={1}
            max={10_000}
            placeholder="e.g. 25"
            hint="1 – 10,000"
            error={form.formState.errors.num_numerical_features?.message}
            disabled={isSubmitting}
            {...form.register("num_numerical_features", { valueAsNumber: true })}
          />
          <Input
            label="Categorical features"
            type="number"
            inputMode="numeric"
            min={0}
            max={10_000}
            placeholder="e.g. 17"
            hint="0 – 10,000"
            error={form.formState.errors.num_categorical_features?.message}
            disabled={isSubmitting}
            {...form.register("num_categorical_features", { valueAsNumber: true })}
          />
          <Input
            label="Dataset rows"
            type="number"
            inputMode="numeric"
            min={1}
            max={100_000_000}
            placeholder="e.g. 10000"
            hint="1 – 100,000,000"
            error={form.formState.errors.dataset_size?.message}
            disabled={isSubmitting}
            {...form.register("dataset_size", { valueAsNumber: true })}
          />
        </div>

        {apiError ? (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-sm border border-danger/30 bg-danger/5 p-4 text-sm text-danger"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <p>{apiError}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Calculating…
              </>
            ) : (
              "Calculate"
            )}
          </Button>
          <p className="text-xs text-ink-500">
            Inputs below 50/50/50,000 use Random Forest. Larger inputs extrapolate via linear regression.
          </p>
        </div>
      </form>
    </Card>
  );
}
