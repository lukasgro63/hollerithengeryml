/**
 * Zod schemas mirroring the backend Pydantic models in
 * apps/api/src/hollerith_api/schemas/predictions.py.
 *
 * Keep the field names, bounds, and enums in sync with the backend —
 * these are the single source of truth on the frontend side, and any
 * drift will surface immediately as a runtime validation error from
 * `api.ts`.
 */

import { z } from "zod";

/* --------------------------------------------------------------------------
 * Request
 * -------------------------------------------------------------------------- */

export const PredictionsRequestSchema = z.object({
  num_numerical_features: z
    .number()
    .int("Must be a whole number")
    .min(1, "Must be at least 1")
    .max(10_000, "Must be at most 10,000"),
  num_categorical_features: z
    .number()
    .int("Must be a whole number")
    .min(0, "Must be zero or greater")
    .max(10_000, "Must be at most 10,000"),
  dataset_size: z
    .number()
    .int("Must be a whole number")
    .min(1, "Must be at least 1")
    .max(100_000_000, "Must be at most 100,000,000"),
});

export type PredictionsRequest = z.infer<typeof PredictionsRequestSchema>;

export const CALCULATOR_DEFAULTS: PredictionsRequest = {
  num_numerical_features: 25,
  num_categorical_features: 17,
  dataset_size: 10_000,
};

/* --------------------------------------------------------------------------
 * Response
 * -------------------------------------------------------------------------- */

export const AlgorithmPredictionSchema = z.object({
  algorithm: z.string(),
  energy_kwh: z.number(),
  rank: z.number().int().min(1).max(5),
});

export type AlgorithmPrediction = z.infer<typeof AlgorithmPredictionSchema>;

export const ThresholdsAppliedSchema = z.object({
  num_features: z.number().int(),
  dataset_size: z.number().int(),
});

export type ThresholdsApplied = z.infer<typeof ThresholdsAppliedSchema>;

export const ModelUsedSchema = z.enum(["random_forest", "linear_regression"]);
export type ModelUsed = z.infer<typeof ModelUsedSchema>;

export const PredictionsResponseSchema = z.object({
  predictions: z.array(AlgorithmPredictionSchema).length(5),
  average_kwh: z.number(),
  model_used: ModelUsedSchema,
  thresholds_applied: ThresholdsAppliedSchema,
});

export type PredictionsResponse = z.infer<typeof PredictionsResponseSchema>;
