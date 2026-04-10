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

type CalculatorProps = {
  readonly initialValues?: PredictionsRequest;
  readonly autoSubmit?: boolean;
};

export function Calculator({ initialValues, autoSubmit }: CalculatorProps) {
  const [result, setResult] = useState<ResultState | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  const handleSuccess = (
    data: PredictionsResponse,
    input: PredictionsRequest,
  ) => {
    setResult({ data, input });
    requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  return (
    <div className="flex flex-col gap-16">
      <CalculatorForm
        onSuccess={handleSuccess}
        defaultValues={initialValues}
        autoSubmit={autoSubmit}
      />
      {result ? (
        <div ref={resultRef}>
          <ResultsCard data={result.data} input={result.input} />
        </div>
      ) : null}
    </div>
  );
}
