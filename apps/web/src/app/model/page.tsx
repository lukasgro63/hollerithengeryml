import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BackLink } from "@/components/ui/BackLink";
import { Container } from "@/components/ui/Container";
import { DataTable, TH_CLASS, TR_CLASS } from "@/components/ui/DataTable";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Model card",
  description:
    "Technical details about the HollerithEnergyML meta-model: framework, " +
    "feature layout, model-selection rule, intended use, and known limitations.",
};

type FeatureRow = {
  readonly index: string;
  readonly name: string;
  readonly type: string;
  readonly description: string;
};

const FEATURES: readonly FeatureRow[] = [
  {
    index: "0",
    name: "num_num_features",
    type: "int",
    description: "Number of numerical input features in the dataset.",
  },
  {
    index: "1",
    name: "num_cat_features",
    type: "int",
    description: "Number of categorical input features in the dataset.",
  },
  {
    index: "2",
    name: "number_of_instances",
    type: "int",
    description: "Number of rows in the dataset.",
  },
  {
    index: "3",
    name: "model_0",
    type: "one-hot",
    description: "Flag for DecisionTree (sklearn DecisionTreeClassifier).",
  },
  {
    index: "4",
    name: "model_1",
    type: "one-hot",
    description: "Flag for GaussianNB.",
  },
  {
    index: "5",
    name: "model_2",
    type: "one-hot",
    description: "Flag for KNN (sklearn KNeighborsClassifier).",
  },
  {
    index: "6",
    name: "model_3",
    type: "one-hot",
    description: "Flag for LogisticRegression.",
  },
  {
    index: "7",
    name: "model_4",
    type: "one-hot",
    description: "Flag for RandomForest (sklearn RandomForestClassifier).",
  },
];

const TOC_ITEMS = [
  { label: "At a glance", id: "at-a-glance" },
  { label: "Intended use", id: "intended-use" },
  { label: "Input features", id: "input-features" },
  { label: "Model-selection rule", id: "model-selection-rule" },
  { label: "Output", id: "output" },
  { label: "Training data", id: "training-data" },
  { label: "Known limitations", id: "known-limitations" },
  { label: "Maintenance", id: "maintenance" },
] as const;

export default function ModelPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Model card"
        title="Meta-model details"
        lede={
          <>
            A short, honest description of the scikit-learn meta-model that
            powers every prediction this service returns — what it is, what
            it was trained on, how it decides which path to run, and where
            its answers should <em>not</em> be trusted.
          </>
        }
      />

      <Container size="wide">
        <div className="mt-section-md grid gap-section-md pb-section-lg lg:grid-cols-[minmax(0,1fr)_18rem] lg:pb-section-xl">
          <div className="min-w-0 max-w-3xl space-y-section-md text-ink-700">
            <section>
              <h2 id="at-a-glance" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                At a glance
              </h2>
              <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-3">
                {[
                  { label: "Artefact", value: "ml_model_package.pkl", mono: true },
                  { label: "Framework", value: "scikit-learn 1.2.2", mono: false },
                  { label: "Serialisation", value: "joblib", mono: false },
                  { label: "Trained", value: "Jan 2024, HHZ", mono: false },
                  { label: "Type", value: "RF + LR fallback", mono: false },
                  { label: "Input shape", value: "8 features", mono: false },
                ].map(({ label, value, mono }) => (
                  <div key={label}>
                    <dt className="label text-ink-400">
                      {label}
                    </dt>
                    <dd className={`mt-1 text-sm text-ink-800 ${mono ? "font-mono text-xs" : ""}`}>
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            <section>
              <h2 id="intended-use" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Intended use
              </h2>
              <p className="mt-4 leading-relaxed">
                Predicts the energy consumption (in kilowatt-hours) of training one
                of five classical scikit-learn classifiers on a tabular dataset of
                a given shape. Intended as a <strong>decision-support tool</strong>{" "}
                for students, researchers, and practitioners evaluating algorithm
                choice for their training workloads before they burn the watts.
              </p>
              <p className="mt-4 leading-relaxed">
                Not intended for: production capacity planning, financial
                billing, carbon-credit reporting, or any use case where the error
                bars matter legally or financially.
              </p>
            </section>

            <section>
              <h2 id="input-features" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Input features
              </h2>
              <p className="mt-4 leading-relaxed">
                The regressor expects exactly eight columns. The first three
                describe the dataset; the remaining five one-hot encode which
                algorithm the model is being asked to score.
              </p>

              <DataTable number="Table 1" caption="Regressor input features">
                <thead>
                  <tr className="border-b-2 border-ink-900/10 text-left">
                    <th className={TH_CLASS}>#</th>
                    <th className={TH_CLASS}>Name</th>
                    <th className={TH_CLASS}>Type</th>
                    <th className={`hidden ${TH_CLASS} !pr-0 sm:table-cell`}>Description</th>
                  </tr>
                </thead>
                <tbody className="text-ink-700">
                  {FEATURES.map((feature) => (
                    <tr key={feature.name} className={TR_CLASS}>
                      <td className="py-3 pr-6 font-mono text-xs tabular-nums text-ink-400">{feature.index}</td>
                      <td className="py-3 pr-6 font-mono text-xs text-ink-800">{feature.name}</td>
                      <td className="py-3 pr-6">
                        <span className="bg-surface-100 px-1.5 py-0.5 font-mono text-xs text-ink-600">{feature.type}</span>
                      </td>
                      <td className="hidden py-3 text-xs text-ink-500 sm:table-cell">{feature.description}</td>
                    </tr>
                  ))}
                </tbody>
              </DataTable>

              <p className="mt-4 text-sm text-ink-500">
                The enum order is load-bearing — it matches the 2024 training
                one-hot and cannot be reordered without retraining.
              </p>
            </section>

            <section>
              <h2 id="model-selection-rule" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Model-selection rule
              </h2>
              <p className="mt-4 leading-relaxed">
                Inside the measured envelope, the Random Forest path is used.
                Outside it, the Linear Regression path extrapolates.
              </p>

              <div className="mt-6 grid gap-px bg-surface-200 sm:grid-cols-2">
                <div className="bg-brand-yellow p-5">
                  <p className="label text-ink-700">Inside envelope</p>
                  <p className="mt-3 text-lg font-bold text-ink-950">Random Forest</p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink-700">
                    num ≤ 25 · cat ≤ 25 · rows ≤ 350,000
                  </p>
                  <p className="mt-1 text-[0.65rem] font-semibold text-ink-600">R² = 0.996</p>
                </div>
                <div className="bg-surface-50 p-5">
                  <p className="label text-ink-400">Outside envelope</p>
                  <p className="mt-3 text-lg font-bold text-ink-900">Linear Regression</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-500">
                    Extrapolation fallback for inputs beyond the measured range.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 id="output" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Output
              </h2>
              <p className="mt-4 leading-relaxed">
                One floating-point number per algorithm, representing predicted
                training energy in kilowatt-hours. The API returns all five
                numbers in a single response, sorted from highest to lowest
                predicted energy with a one-based rank attached. The UI
                automatically picks the most readable display unit (kWh, Wh, mWh,
                or µWh) based on the magnitude of the values.
              </p>
            </section>

            <section>
              <h2 id="training-data" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Training data
              </h2>
              <p className="mt-4 leading-relaxed">
                The 2024 baseline campaign at the Herman Hollerith Zentrum, which
                measured CodeCarbon kilowatt-hours for the five classifiers on
                three public tabular datasets (Diabetes Binary Health Indicators,
                Bank Marketing, Heart Disease 2020) with progressive subsampling
                of features and rows. See the{" "}
                <Link
                  href="/research"
                  className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
                >
                  Research page
                </Link>{" "}
                for the full methodology.
              </p>
            </section>

            <section>
              <h2 id="known-limitations" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Known limitations
              </h2>
              <ul className="mt-4 space-y-3 leading-relaxed">
                {[
                  { title: "Hardware-calibrated.", text: "The baseline ran on a dual-core Intel Xeon at 2.20 GHz. Expect meaningful deviation on different CPU architectures or when a GPU is in the loop." },
                  { title: "Default hyperparameters only.", text: "The five classifiers were measured with scikit-learn 1.2.2 defaults. Custom hyperparameters — especially tree depth or ensemble size — will shift real energy consumption in ways the meta-model does not see." },
                  { title: "Extrapolation caveat.", text: "Inputs beyond the 25/25/350,000 envelope are handled by the linear fallback, which is exactly a linear extrapolation. Treat large-data predictions as rough directional guidance." },
                  { title: "No XGBoost.", text: "The original campaign measured XGBoost too, but it was excluded from the production model for sklearn-API consistency. If you need an XGBoost estimate, this model will not give you one." },
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
              <h2 id="maintenance" className="font-display text-h3 font-extrabold tracking-tight text-ink-950">
                Maintenance
              </h2>
              <p className="mt-4 leading-relaxed">
                <code className="bg-surface-100 px-1.5 py-0.5 text-sm">
                  scikit-learn==1.2.2
                </code>{" "}
                is pinned in the backend&apos;s{" "}
                <code className="bg-surface-100 px-1.5 py-0.5 text-sm">
                  pyproject.toml
                </code>{" "}
                to guarantee joblib-load compatibility. If the model is ever
                retrained, update this card alongside the artefact and regenerate
                the pinned dependency. A future phase may export the model to
                ONNX for language-agnostic serving and to eliminate the Python
                pickling attack surface entirely.
              </p>
            </section>

            <section className="bg-ink-950 p-6 text-surface-200">
              <h2 className="font-display text-h4 font-bold tracking-tight text-white">
                Query the live metadata
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-surface-400">
                The backend exposes <code className="bg-surface-0/10 px-1.5 py-0.5 text-xs text-surface-300">GET /api/v1/metadata</code>{" "}
                which returns the sklearn version, feature names, thresholds, and
                loaded artefact path at runtime — use it to verify that the model
                running in production matches this card.
              </p>
              <Link
                href="/calculate"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-yellow hover:text-brand-yellow-hover transition-colors"
              >
                Try the calculator
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          </div>

          <TableOfContents items={TOC_ITEMS} />
        </div>

        <footer className="border-t border-surface-100 pb-section-lg pt-8">
          <BackLink />
        </footer>
      </Container>
    </article>
  );
}
