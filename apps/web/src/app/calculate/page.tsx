import type { Metadata } from "next";
import { Calculator } from "@/components/calculator/Calculator";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Calculator",
  description:
    "Predict training energy for five classical ML algorithms from three " +
    "numbers: numerical features, categorical features, and dataset size.",
};

type CalculatePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function parseIntParam(value: string | string[] | undefined): number | undefined {
  if (typeof value !== "string") return undefined;
  const parsed = parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default async function CalculatePage({ searchParams }: CalculatePageProps) {
  const params = await searchParams;
  const num = parseIntParam(params.num);
  const cat = parseIntParam(params.cat);
  const rows = parseIntParam(params.rows);

  const hasInitialValues =
    num !== undefined && cat !== undefined && rows !== undefined;

  const initialValues = hasInitialValues
    ? {
        num_numerical_features: num,
        num_categorical_features: cat,
        dataset_size: rows,
      }
    : undefined;

  return (
    <article>
      <PageHeader
        eyebrow="Calculator"
        title="Predict your training energy"
        lede={
          <>
            Enter the shape of your dataset and get a ranked comparison of
            predicted training energy for Decision Tree, Gaussian NB, KNN,
            Logistic Regression, and Random Forest.
          </>
        }
      />

      <Container size="wide">
        <div className="pb-section-lg pt-section-md lg:pb-section-xl">
          <Calculator
            initialValues={initialValues}
            autoSubmit={hasInitialValues}
          />
        </div>
      </Container>
    </article>
  );
}
