import { Database, Gauge, LineChart } from "lucide-react";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    step: "01",
    icon: Database,
    title: "Describe your dataset",
    body: "Three integers — numerical features, categorical features, and row count. That is the entire input the meta-model needs.",
  },
  {
    step: "02",
    icon: Gauge,
    title: "Model selection by threshold",
    body: "The meta-model instantly ranks all five algorithms by their relative training-energy share — no GPU time spent.",
  },
  {
    step: "03",
    icon: LineChart,
    title: "Compare five algorithms",
    body: "See the relative energy share of Decision Tree, Gaussian NB, KNN, Logistic Regression, and Random Forest — ranked, side by side.",
  },
] as const;

export function FeatureCards() {
  return (
    <section id="how-it-works" className="py-section-lg bg-surface-50 lg:py-section-xl">
      <Container size="wide">
        <div className="mb-14 max-w-2xl animate-fade-in-up">
          <p className="eyebrow text-brand-yellow-press">How it works</p>
          <h2 className="mt-4 text-h2 font-extrabold tracking-tight text-ink-950">
            Three steps to a greener choice.
          </h2>
          <p className="mt-4 text-lead text-ink-500">
            From a dataset description to a per-algorithm energy estimate — no
            training job required.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ step, icon: Icon, title, body }, idx) => (
            <li
              key={title}
              className={`group relative bg-surface-0 p-8 transition-colors duration-200 hover:bg-brand-yellow-subtle animate-fade-in-up stagger-${idx + 1}`}
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 w-10 items-center justify-center bg-ink-950 transition-all duration-200 group-hover:bg-brand-yellow"
                >
                  <Icon
                    className="h-[18px] w-[18px] text-brand-yellow transition-colors duration-200 group-hover:text-ink-900"
                    strokeWidth={1.8}
                  />
                </span>
                <span className="font-mono text-xs font-bold tabular-nums text-ink-300">
                  {step}
                </span>
              </div>

              <h3 className="mt-5 font-display text-base font-bold tracking-tight text-ink-950">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
