import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-surface-200 bg-surface-50">
      <Container size="wide">
        <div className="grid items-center gap-10 py-section-lg lg:grid-cols-12 lg:py-section-xl">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-sm border border-surface-300 bg-surface-0 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
              <Leaf className="h-3.5 w-3.5 text-accent-rust" aria-hidden="true" />
              Green AI · Herman Hollerith Zentrum
            </div>

            <h1 className="mt-6 text-display font-bold leading-tight tracking-tight text-ink-900">
              Predict the energy cost of your ML training{" "}
              <span className="whitespace-nowrap bg-brand-yellow px-2">before</span>{" "}
              you train it.
            </h1>

            <p className="mt-6 max-w-prose text-lead text-ink-600">
              Give us the shape of your dataset — number of numerical features,
              categorical features, rows — and we predict the training energy
              consumption of five classical scikit-learn algorithms in kilowatt-hours.
              Pick the greener one before you burn the watts.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/calculate" size="lg">
                Run the calculator
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
              <Button href="/research" variant="ghost" size="lg">
                Read the research
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="relative rounded-sm border border-surface-300 bg-surface-0 p-6">
              <div
                aria-hidden="true"
                className="absolute -top-px left-0 h-1 w-20 bg-brand-yellow"
              />
              <dl className="grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Algorithms
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">5</dd>
                  <dd className="mt-1 text-xs text-ink-500">
                    DT · GNB · KNN · LR · RF
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Features
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">3</dd>
                  <dd className="mt-1 text-xs text-ink-500">
                    num · cat · rows
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Baseline runs
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">15+</dd>
                  <dd className="mt-1 text-xs text-ink-500">
                    CodeCarbon measured
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-500">
                    Training sets
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-ink-900">3</dd>
                  <dd className="mt-1 text-xs text-ink-500">
                    Diabetes · Bank · Heart
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
