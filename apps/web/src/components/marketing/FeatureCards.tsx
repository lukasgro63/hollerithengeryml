import { Database, Gauge, LineChart } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    icon: Database,
    title: "Describe your dataset",
    body: "Three integers: how many numerical features, how many categorical features, and how many rows. That's the entire input.",
  },
  {
    icon: Gauge,
    title: "Selected by thresholds",
    body: "A Random Forest meta-model handles inputs below 50 features and 50k rows. Beyond that, a linear fallback extrapolates.",
  },
  {
    icon: LineChart,
    title: "Compare five algorithms",
    body: "See predicted kWh for Decision Tree, Gaussian NB, KNN, Logistic Regression, and Random Forest side-by-side, ranked.",
  },
] as const;

export function FeatureCards() {
  return (
    <section className="py-section-lg">
      <Container size="wide">
        <div className="mb-section-md max-w-2xl">
          <h2 className="text-h2 font-bold leading-tight tracking-tight text-ink-900">
            How it works
          </h2>
          <p className="mt-4 text-lead text-ink-600">
            Three steps from a dataset description to a per-algorithm energy
            estimate. No training job required.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Card className="h-full">
                <span
                  aria-hidden="true"
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-sm bg-brand-yellow"
                >
                  <Icon className="h-5 w-5 text-ink-900" strokeWidth={2.5} />
                </span>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{body}</CardDescription>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
