/**
 * Typed fetch wrapper for the HollerithEnergyML backend.
 *
 * Single POST endpoint: /api/v1/predictions. We validate the response
 * with zod so any drift between frontend and backend schemas surfaces
 * immediately instead of propagating bad data into the UI.
 */

import {
  PredictionsResponseSchema,
  type PredictionsRequest,
  type PredictionsResponse,
} from "./schemas";

const DEFAULT_BASE_URL = "http://localhost:8000";
const PREDICTIONS_PATH = "/api/v1/predictions";

/** All errors raised by the API client are instances of this class. */
export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function resolveBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv.trim().replace(/\/+$/, "");
  }
  return DEFAULT_BASE_URL;
}

interface PostOptions {
  readonly signal?: AbortSignal;
}

/**
 * Send a prediction request to the backend.
 *
 * Throws {@link ApiError} for any non-2xx response, network failure,
 * or response shape mismatch. The thrown error exposes a user-facing
 * `message`, the HTTP `status` (0 for network errors), and the raw
 * `details` so the UI can show precise feedback.
 */
export async function postPredictions(
  body: PredictionsRequest,
  options: PostOptions = {},
): Promise<PredictionsResponse> {
  const url = `${resolveBaseUrl()}${PREDICTIONS_PATH}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: options.signal,
      credentials: "omit",
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request cancelled.", 0, error);
    }
    throw new ApiError(
      "Cannot reach the prediction service. Check your connection and try again.",
      0,
      error,
    );
  }

  if (!response.ok) {
    let details: unknown;
    try {
      details = await response.json();
    } catch {
      /* ignore JSON parse errors on error responses */
    }

    const message = errorMessageFor(response.status);
    throw new ApiError(message, response.status, details);
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch (error) {
    throw new ApiError(
      "Received an invalid response from the prediction service.",
      response.status,
      error,
    );
  }

  const parsed = PredictionsResponseSchema.safeParse(json);
  if (!parsed.success) {
    throw new ApiError(
      "The prediction service returned unexpected data.",
      response.status,
      parsed.error.flatten(),
    );
  }
  return parsed.data;
}

function errorMessageFor(status: number): string {
  if (status === 422) {
    return "The server rejected your input. Please check the values and try again.";
  }
  if (status === 429) {
    return "Rate limit exceeded. Please wait a moment before trying again.";
  }
  if (status >= 500) {
    return "The prediction service returned an error. Please try again in a moment.";
  }
  return `Request failed with status ${status}.`;
}
