"use client";

import { useRef, useState } from "react";
import { CalculatorForm } from "./CalculatorForm";
import { ResultsCard } from "./ResultsCard";
import type {
  PredictionsRequest,
  PredictionsResponse,
} from "@/lib/schemas";

type ResultState = {
  readonly data: PredictionsResponse;
  readonly input: PredictionsRequest;
};

export function Calculator() {
  const [result, setResult] = useState<ResultState | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleSuccess = (
    data: PredictionsResponse,
    input: PredictionsRequest,
  ) => {
    setResult({ data, input });
    // Let the layout render, then scroll the results into view for users
    // who just tapped "Calculate" on mobile.
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <CalculatorForm onSuccess={handleSuccess} />
      {result ? (
        <div ref={resultRef}>
          <ResultsCard data={result.data} input={result.input} />
        </div>
      ) : null}
    </div>
  );
}
