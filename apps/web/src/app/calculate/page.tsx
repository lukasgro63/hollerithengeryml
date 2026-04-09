import type { Metadata } from "next";
import { Calculator } from "@/components/calculator/Calculator";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Calculator",
  description:
    "Predict training energy for five classical ML algorithms from three " +
    "numbers: numerical features, categorical features, and dataset size.",
};

export default function CalculatePage() {
  return (
    <Container size="wide">
      <div className="py-section-lg lg:py-section-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-sm border border-surface-300 bg-surface-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
            Calculator
          </div>
          <h1 className="mt-6 text-display font-bold leading-tight tracking-tight text-ink-900">
            Predict your training energy
          </h1>
          <p className="mt-6 text-lead text-ink-600">
            Enter the shape of your dataset and get a ranked comparison of
            predicted training energy for Decision Tree, Gaussian NB, KNN,
            Logistic Regression, and Random Forest — in the unit that fits.
          </p>
        </div>

        <div className="mt-section-md">
          <Calculator />
        </div>
      </div>
    </Container>
  );
}
