import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "The 2024 baseline-measurement campaign that underpins HollerithEnergyML: " +
    "datasets, algorithms, tooling, and the meta-model training methodology.",
};

export default function ResearchPage() {
  return (
    <Container size="wide">
      <article className="py-section-lg lg:py-section-xl">
        <PageHeader
          eyebrow="Research"
          title="How the meta-model was built"
          lede={
            <>
              A 2024 baseline-measurement campaign at the{" "}
              <span className="font-semibold text-ink-800">Herman Hollerith Zentrum</span>{" "}
              that asked a simple question — <em>how much energy does it actually
              take to train a classical ML model?</em> — and turned the answer into
              a meta-model you can query in real time.
            </>
          }
        />

        <div className="mt-section-lg grid gap-section-md lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-3xl space-y-section-md text-ink-700">
            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                The question
              </h2>
              <p className="mt-4 leading-relaxed">
                Training a machine learning model consumes real electricity. But
                the relationship between a dataset&apos;s <em>shape</em> and the
                energy cost of fitting a model on it was poorly documented, and
                the few published numbers relied on GPU-heavy deep learning
                workloads that say little about the classical CPU-bound algorithms
                students and practitioners still reach for first.
              </p>
              <p className="mt-4 leading-relaxed">
                We set out to establish a predictable relationship between three
                structural inputs — numerical feature count, categorical feature
                count, and number of rows — and the energy it takes to train five
                classical scikit-learn classifiers under identical conditions.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                The baseline campaign
              </h2>
              <p className="mt-4 leading-relaxed">
                Five classifiers were measured on three public tabular datasets
                with progressive subsampling of features and rows, producing
                dense energy-versus-shape curves.
              </p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                    Classifiers
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    <li>DecisionTreeClassifier</li>
                    <li>GaussianNB</li>
                    <li>KNeighborsClassifier</li>
                    <li>LogisticRegression</li>
                    <li>RandomForestClassifier</li>
                  </ul>
                  <p className="mt-3 text-xs text-ink-500">
                    The original campaign also measured XGBoost; it was excluded
                    from the production meta-model for consistency with
                    scikit-learn&apos;s estimator API.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                    Datasets
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    <li>Diabetes Binary Health Indicators</li>
                    <li>Bank Marketing Campaign</li>
                    <li>Heart Disease 2020 (CDC)</li>
                  </ul>
                  <p className="mt-3 text-xs text-ink-500">
                    Three public tabular classification datasets chosen to cover
                    different feature mixes and row counts.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                Measurement
              </h2>
              <p className="mt-4 leading-relaxed">
                Every training run was instrumented with{" "}
                <a
                  href="https://codecarbon.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
                >
                  CodeCarbon
                </a>{" "}
                v2.3.1, which captures per-run kilowatt-hours by reading CPU and
                RAM power-draw telemetry. Each run emitted a CSV row with
                duration, CPU energy, RAM energy, total energy consumed, and
                derived CO₂ emissions.
              </p>
              <p className="mt-4 leading-relaxed">
                Execution happened on Linux with Python 3.10.12 on a dual-core
                Intel Xeon at 2.20 GHz with 12.6 GB of RAM — a typical free-tier
                cloud notebook. The per-algorithm emission CSVs live in the
                research archive under{" "}
                <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm text-ink-800">
                  research/baseline-tests/results/
                </code>
                .
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                Experiment tracking
              </h2>
              <p className="mt-4 leading-relaxed">
                Runs were tracked in MLflow through GitLab&apos;s ML Experiments
                integration on the Reutlingen University GitLab instance. Each
                run logged the sklearn estimator parameters, duration metrics,
                and the serialised model as an artefact so later analysis could
                reference the exact configuration.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                The meta-model
              </h2>
              <p className="mt-4 leading-relaxed">
                The aggregated CodeCarbon measurements became the training data
                for a meta-model that predicts the energy cost of training a
                given algorithm on a given dataset shape. Two regressors were
                fitted: a Random Forest for inputs inside the measured envelope
                and a Linear Regression as a fallback for extrapolation beyond
                it.
              </p>

              <div className="mt-6 overflow-hidden rounded-sm border border-surface-200">
                <table className="w-full text-sm">
                  <thead className="bg-surface-50 text-left text-xs font-bold uppercase tracking-wide text-ink-600">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Feature</th>
                      <th className="px-4 py-3">Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 text-ink-700">
                    <tr>
                      <td className="px-4 py-2.5 tabular-nums">0</td>
                      <td className="px-4 py-2.5 font-mono text-xs">num_num_features</td>
                      <td className="px-4 py-2.5">int</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 tabular-nums">1</td>
                      <td className="px-4 py-2.5 font-mono text-xs">num_cat_features</td>
                      <td className="px-4 py-2.5">int</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 tabular-nums">2</td>
                      <td className="px-4 py-2.5 font-mono text-xs">number_of_instances</td>
                      <td className="px-4 py-2.5">int</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 tabular-nums">3–7</td>
                      <td className="px-4 py-2.5 font-mono text-xs">model_0 – model_4</td>
                      <td className="px-4 py-2.5">one-hot flag</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 leading-relaxed">
                The five <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">model_*</code>{" "}
                columns one-hot encode the algorithm being predicted. At inference
                time the API runs one forward pass per algorithm and returns the
                full five-way comparison in a single response.
              </p>

              <p className="mt-4 leading-relaxed">
                The Random Forest path is taken when <em>all three</em> of the
                following hold: at most 50 numerical features, at most 50
                categorical features, and at most 50,000 rows. For larger inputs
                the linear fallback extrapolates.
              </p>
            </section>

            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                Known limitations
              </h2>
              <ul className="mt-4 space-y-3 leading-relaxed">
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                  />
                  <p>
                    <strong>Hardware dependence.</strong> The baseline was
                    measured on a single CPU class. Training on GPUs or different
                    CPU architectures will deviate from the predictions.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                  />
                  <p>
                    <strong>Python stack dependence.</strong> Predictions are
                    calibrated against scikit-learn 1.2.2 defaults with no
                    hyperparameter tuning. Different sklearn versions or custom
                    hyperparameters may produce different energy profiles.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                  />
                  <p>
                    <strong>Small-data tail.</strong> The training set is sparse
                    for very small datasets (under a few hundred rows), so
                    predictions in that regime carry more uncertainty.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                  />
                  <p>
                    <strong>Extrapolation.</strong> The linear fallback is
                    exactly that — a linear extrapolation beyond the measured
                    envelope. Treat predictions beyond the Random Forest
                    thresholds as rough guidance rather than precise estimates.
                  </p>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-h3 font-bold tracking-tight text-ink-900">
                Source material
              </h2>
              <p className="mt-4 leading-relaxed">
                The full research archive — baseline notebooks, per-algorithm
                emission CSVs, the aggregated training data, and the original
                methodology docs — lives under{" "}
                <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">
                  research/
                </code>{" "}
                in the repository. See{" "}
                <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">
                  research/README.md
                </code>{" "}
                for the directory layout.
              </p>
              <p className="mt-6">
                <a
                  href={`${GITHUB_URL}/tree/main/research`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
                >
                  Browse the research archive on GitHub
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </p>
            </section>
          </div>

          {/* Sticky table of contents on desktop */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-sm border border-surface-200 bg-surface-50 p-5">
              <h2 className="text-xs font-bold uppercase tracking-wide text-ink-500">
                On this page
              </h2>
              <ol className="mt-3 space-y-2 text-sm">
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    The question
                  </a>
                </li>
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    The baseline campaign
                  </a>
                </li>
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    Measurement
                  </a>
                </li>
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    Experiment tracking
                  </a>
                </li>
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    The meta-model
                  </a>
                </li>
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    Known limitations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-ink-600 hover:text-ink-900">
                    Source material
                  </a>
                </li>
              </ol>
            </div>
          </aside>
        </div>

        <footer className="mt-section-lg border-t border-surface-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-900 hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </footer>
      </article>
    </Container>
  );
}
