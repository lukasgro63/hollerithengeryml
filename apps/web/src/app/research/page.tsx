import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { BackLink } from "@/components/ui/BackLink";
import { Container } from "@/components/ui/Container";
import { DataTable, TH_CLASS, TR_CLASS } from "@/components/ui/DataTable";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { PageHeader } from "@/components/marketing/PageHeader";
import { CitationBlock } from "@/components/research/CitationBlock";
import { PipelineOverview } from "@/components/research/PipelineOverview";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research",
  description:
    "The 2024 baseline-measurement campaign that underpins HollerithEnergyML: " +
    "datasets, algorithms, tooling, and the meta-model training methodology.",
};

export default function ResearchPage() {
  return (
    <article>
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

      <Container size="wide">
        <div className="mt-section-md grid gap-section-md pb-section-lg lg:grid-cols-[minmax(0,1fr)_18rem] lg:pb-section-xl">
          <div className="max-w-3xl space-y-section-md text-ink-700">
            <section>
              <h2 id="the-question" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
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

              <PipelineOverview />
            </section>

            <section>
              <h2 id="the-baseline-campaign" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                The baseline campaign
              </h2>
              <p className="mt-4 leading-relaxed">
                Six classifiers — DecisionTree, GaussianNB, KNN,
                LogisticRegression, RandomForest, and XGBoost — were measured
                on three public tabular datasets with progressive subsampling
                of features and rows, producing dense energy-versus-shape
                curves. The production meta-model uses the first five;
                XGBoost was excluded for scikit-learn-API consistency.
              </p>

              <DataTable number="Table 1" caption="Datasets used in the baseline campaign">
                <thead>
                  <tr className="border-b-2 border-ink-900/10 text-left">
                    <th className={TH_CLASS}>Dataset</th>
                    <th className={TH_CLASS}>Rows</th>
                    <th className={TH_CLASS}>Features</th>
                    <th className={`${TH_CLASS} !pr-0`}>Source</th>
                  </tr>
                </thead>
                <tbody className="text-ink-700">
                  {[
                    { name: "Diabetes Health Indicators", rows: "~254,000", features: "21", href: "https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset", source: "Kaggle" },
                    { name: "Bank Marketing", rows: "~41,000", features: "19", href: "https://archive.ics.uci.edu/dataset/222/bank+marketing", source: "UCI" },
                    { name: "Heart Disease 2020", rows: "~320,000", features: "17", href: "https://www.kaggle.com/datasets/kamilpytlak/personal-key-indicators-of-heart-disease", source: "Kaggle / CDC" },
                  ].map(({ name, rows, features, href, source }) => (
                    <tr key={name} className={TR_CLASS}>
                      <td className="py-3 pr-6 font-semibold text-ink-900">{name}</td>
                      <td className="py-3 pr-6 font-mono text-xs tabular-nums">{rows}</td>
                      <td className="py-3 pr-6 font-mono text-xs tabular-nums">{features}</td>
                      <td className="py-3">
                        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-ink-500 transition-colors hover:text-ink-900">
                          {source}
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>

              <p className="mt-4 leading-relaxed">
                Every dataset was sampled at 100 %, 80 %, 60 %, 40 %, and
                20 % of its original row count, with features reduced randomly
                step by step. The measurement archive under{" "}
                <code className="bg-surface-100 px-1.5 py-0.5 text-sm text-ink-800">
                  research/baseline-tests/results/
                </code>{" "}
                contains emission CSVs for all six classifiers (including
                XGBoost).
              </p>

            </section>

            <section>
              <h2 id="measurement" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
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
                <code className="bg-surface-100 px-1.5 py-0.5 text-sm text-ink-800">
                  research/baseline-tests/results/
                </code>
                .
              </p>
            </section>

            <section>
              <h2 id="experiment-tracking" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
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
              <h2 id="the-meta-model" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
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

              <DataTable number="Table 2" caption="Meta-model input features">
                <thead>
                  <tr className="border-b-2 border-ink-900/10 text-left">
                    <th className={TH_CLASS}>#</th>
                    <th className={TH_CLASS}>Feature</th>
                    <th className={`${TH_CLASS} !pr-0`}>Type</th>
                  </tr>
                </thead>
                <tbody className="text-ink-700">
                  {[
                    { idx: "0", name: "num_num_features", type: "int" },
                    { idx: "1", name: "num_cat_features", type: "int" },
                    { idx: "2", name: "number_of_instances", type: "int" },
                    { idx: "3–7", name: "model_0 – model_4", type: "one-hot" },
                  ].map(({ idx, name, type }) => (
                    <tr key={idx} className={TR_CLASS}>
                      <td className="py-3 pr-6 font-mono text-xs tabular-nums text-ink-400">{idx}</td>
                      <td className="py-3 pr-6 font-mono text-xs text-ink-800">{name}</td>
                      <td className="py-3">
                        <span className="bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-ink-600">{type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>

              <p className="mt-4 leading-relaxed">
                The five <code className="bg-surface-100 px-1.5 py-0.5 text-sm">model_*</code>{" "}
                columns one-hot encode the algorithm being predicted. At inference
                time the API runs one forward pass per algorithm and returns the
                full five-way comparison in a single response.
              </p>

              <p className="mt-4 leading-relaxed">
                The Random Forest path is taken when <em>all three</em> of the
                following hold: at most 25 numerical features, at most 25
                categorical features, and at most 350,000 rows. For larger
                inputs the linear fallback extrapolates.
              </p>
            </section>

            <section>
              <h2 id="known-limitations" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Known limitations
              </h2>
              <ul className="mt-4 space-y-3 leading-relaxed">
                {[
                  { title: "Hardware dependence.", text: "The baseline was measured on a single CPU class. Training on GPUs or different CPU architectures will deviate from the predictions." },
                  { title: "Python stack dependence.", text: "Predictions are calibrated against scikit-learn 1.2.2 defaults with no hyperparameter tuning. Different sklearn versions or custom hyperparameters may produce different energy profiles." },
                  { title: "Small-data tail.", text: "The training set is sparse for very small datasets (under a few hundred rows), so predictions in that regime carry more uncertainty." },
                  { title: "Extrapolation.", text: "The linear fallback is exactly that — a linear extrapolation beyond the measured envelope. Treat predictions beyond the Random Forest thresholds as rough guidance rather than precise estimates." },
                ].map(({ title, text }) => (
                  <li key={title} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                    />
                    <p>
                      <strong>{title}</strong> {text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 id="citation" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Citation
              </h2>
              <p className="mt-4 leading-relaxed">
                Peer-reviewed and published at INFORMATIK 2024 in Bonn.
                If you reference this work:
              </p>

              <CitationBlock />
            </section>

            <section>
              <h2 id="source-material" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Source material
              </h2>
              <p className="mt-4 leading-relaxed">
                The full research archive — baseline notebooks, per-algorithm
                emission CSVs, the aggregated training data, and the original
                methodology docs — lives under{" "}
                <code className="bg-surface-100 px-1.5 py-0.5 text-sm">
                  research/
                </code>{" "}
                in the repository. See{" "}
                <code className="bg-surface-100 px-1.5 py-0.5 text-sm">
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

          <TableOfContents
            items={[
              { label: "The question", id: "the-question" },
              { label: "The baseline campaign", id: "the-baseline-campaign" },
              { label: "Measurement", id: "measurement" },
              { label: "Experiment tracking", id: "experiment-tracking" },
              { label: "The meta-model", id: "the-meta-model" },
              { label: "Known limitations", id: "known-limitations" },
              { label: "Citation", id: "citation" },
              { label: "Source material", id: "source-material" },
            ]}
          />
        </div>

        <footer className="border-t border-surface-100 pb-section-lg pt-8">
          <BackLink />
        </footer>
      </Container>
    </article>
  );
}
