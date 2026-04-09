import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import {
  GITHUB_URL,
  PAPER_AUTHORS,
  PAPER_DOI,
  PAPER_DOI_URL,
  PAPER_PAGES,
  PAPER_PDF_URL,
  PAPER_TITLE,
  PAPER_VENUE,
  PAPER_YEAR,
} from "@/lib/site";

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
                    <li>LogisticRegression</li>
                    <li>KNeighborsClassifier</li>
                    <li>DecisionTreeClassifier</li>
                    <li>RandomForestClassifier</li>
                    <li>XGBoost</li>
                  </ul>
                  <p className="mt-3 text-xs text-ink-500">
                    These five classifiers are the ones named in the published
                    paper. The production meta-model serves a slightly
                    different set — it replaces XGBoost with GaussianNB for
                    scikit-learn-API consistency — but the measurement archive
                    under{" "}
                    <code className="rounded-sm bg-surface-100 px-1 text-xs">
                      research/baseline-tests/results/
                    </code>{" "}
                    contains emission CSVs for all six.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-ink-500">
                    Datasets
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    <li>Diabetes Health Indicators — ~250,000 rows, 22 features (Kaggle)</li>
                    <li>Bank Marketing — ~11,000 rows, 17 features (UCI)</li>
                    <li>Heart Disease 2020 — ~320,000 rows, 17 features (Kaggle / CDC)</li>
                  </ul>
                  <p className="mt-3 text-xs text-ink-500">
                    Every dataset was sampled at 100 %, 80 %, 60 %, 40 %, and
                    20 % of its original row count, with features reduced
                    randomly step by step, producing dense energy-versus-shape
                    curves per classifier.
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
                given algorithm on a given dataset shape. The paper evaluated
                four candidate regressors on the held-out set and selected the
                Random Forest Regressor for its strong fit: R² = 0.996, versus
                0.982 for Gradient Boosting, 0.884 for a degree-3 polynomial
                regression, and 0.714 for plain Linear Regression.
              </p>
              <p className="mt-4 leading-relaxed">
                The production backend packages both the chosen Random Forest
                and a linear fallback side-by-side in the same joblib archive,
                so large-input requests beyond the measured envelope still
                return an answer — the linear one, clearly labelled as such in
                the response.
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
                categorical features, and at most 50,000 rows. For larger
                inputs the linear fallback extrapolates.
              </p>
              <p className="mt-4 text-sm text-ink-500">
                Note: the paper documents a measured envelope of 25 numerical
                features, 25 categorical features, and 350,000 rows — the
                range in which training data was actually collected. The
                production code&apos;s switch-over thresholds (50 / 50 /
                50,000) are a slightly different, implementation-level choice
                about where to fall through to the linear extrapolator. Read
                predictions between the two bands with some extra skepticism.
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
                Citation
              </h2>
              <p className="mt-4 leading-relaxed">
                The research behind HollerithEnergyML was peer-reviewed and
                published as a prototype demo paper at INFORMATIK 2024 in
                Bonn. If you cite this work, please cite the paper:
              </p>
              <blockquote className="mt-5 rounded-sm border-l-4 border-brand-yellow bg-surface-50 p-5 text-sm leading-relaxed text-ink-700">
                <p>
                  {PAPER_AUTHORS.slice(0, -1).join(", ")}, and{" "}
                  {PAPER_AUTHORS[PAPER_AUTHORS.length - 1]} ({PAPER_YEAR}).{" "}
                  <em>{PAPER_TITLE}.</em> In {PAPER_VENUE}, pp.{" "}
                  {PAPER_PAGES}.
                </p>
                <p className="mt-3 font-mono text-xs text-ink-600">
                  DOI:{" "}
                  <a
                    href={PAPER_DOI_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
                  >
                    {PAPER_DOI}
                  </a>
                </p>
              </blockquote>
              <p className="mt-6">
                <a
                  href={PAPER_PDF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Download the paper (PDF, 5 pp.)
                </a>
              </p>
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
                    Citation
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
