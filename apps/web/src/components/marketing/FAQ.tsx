import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "./FAQAccordion";
import type { FAQItem } from "./FAQAccordion";

const FAQ_ITEMS: readonly FAQItem[] = [
  {
    question:
      "For which machine learning algorithms can energy consumption be predicted?",
    answer:
      "Currently, HollerithEnergyML\u2019s predictions are limited to classification algorithms. The model has been trained on sklearn library algorithms including Random Forest, KNN, GaussianNB, Decision Tree, and Logistic Regression.",
  },
  {
    question:
      "How is energy consumption predicted with the HollerithEnergyML model?",
    answer:
      "Energy consumption is estimated based on the known training data of the model. The predictor uses a Random Forest Regressor to derive a relative training-energy share (0–100, normalised to the highest-consuming algorithm) from dataset shape (numerical features, categorical features, row count) and algorithm choice.",
  },
  {
    question:
      "How was energy consumption measured during model training?",
    answer:
      "The energy consumption for the training data was measured using the Python library CodeCarbon (mlco2/codecarbon).",
  },
  {
    question:
      "Which model was used to predict energy consumption?",
    answer:
      "HollerithEnergyML employs a Random Forest Regressor from the sklearn library. For inputs beyond the measured training envelope (\u003E25 features or \u003E350,000 rows), a Linear Regression fallback extrapolates.",
  },
  {
    question:
      "How many data points were used to train the Energy Predictor Model?",
    answer:
      "Three datasets were utilised (Diabetes Health Indicators, Bank Marketing, Heart Disease 2020), with up to 21 numerical and categorical features and up to 320,000 data samples. The resulting meta-model training set contains 12,550 rows.",
  },
];

export function FAQ() {
  return (
    <section className="relative bg-surface-0 py-section-lg lg:py-section-xl">
      <Container size="wide">
        <div className="grid gap-section-md lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-brand-yellow-press">FAQ</p>
            <h2 className="mt-4 text-h2 font-extrabold tracking-tight text-ink-950">
              Common questions.
            </h2>
            <p className="mt-4 text-lead text-ink-500">
              What the model can do, how it was built, and where its
              limits are.
            </p>
          </div>

          <div className="lg:col-span-8">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </div>
      </Container>
    </section>
  );
}
