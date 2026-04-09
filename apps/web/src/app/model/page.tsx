import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    description: "Flag for DecisionTreeClassifier.",
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
    description: "Flag for KNeighborsClassifier.",
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
    description: "Flag for RandomForestClassifier.",
  },
];

export default function ModelPage() {
  return (
    <Container size="wide">
      <article className="py-section-lg lg:py-section-xl">
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

        <div className="mt-section-lg max-w-3xl space-y-section-md text-ink-700">
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              At a glance
            </h2>
            <dl className="mt-6 grid grid-cols-1 gap-5 rounded-sm border border-surface-200 bg-surface-50 p-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Artefact
                </dt>
                <dd className="mt-1 font-mono text-sm text-ink-800">
                  ml_model_package.pkl
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Framework
                </dt>
                <dd className="mt-1 text-sm text-ink-800">scikit-learn 1.2.2</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Serialisation
                </dt>
                <dd className="mt-1 text-sm text-ink-800">joblib</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Trained
                </dt>
                <dd className="mt-1 text-sm text-ink-800">
                  January 2024, Herman Hollerith Zentrum
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Type
                </dt>
                <dd className="mt-1 text-sm text-ink-800">
                  2-tuple of{" "}
                  <code className="rounded-sm bg-surface-100 px-1 text-xs">
                    (LinearRegression, RandomForestRegressor)
                  </code>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Input shape
                </dt>
                <dd className="mt-1 text-sm text-ink-800">8 features</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
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
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Input features
            </h2>
            <p className="mt-4 leading-relaxed">
              The regressor expects exactly eight columns. The first three
              describe the dataset; the remaining five one-hot encode which
              algorithm the model is being asked to score.
            </p>

            <div className="mt-6 overflow-hidden rounded-sm border border-surface-200">
              <table className="w-full text-sm">
                <thead className="bg-surface-50 text-left text-xs font-bold uppercase tracking-wide text-ink-600">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 text-ink-700">
                  {FEATURES.map((feature) => (
                    <tr key={feature.name}>
                      <td className="px-4 py-2.5 tabular-nums">{feature.index}</td>
                      <td className="px-4 py-2.5 font-mono text-xs">{feature.name}</td>
                      <td className="px-4 py-2.5 text-xs">{feature.type}</td>
                      <td className="px-4 py-2.5 text-xs">{feature.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-sm text-ink-500">
              The enum order is load-bearing — it matches the 2024 training
              one-hot and cannot be reordered without retraining.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Model-selection rule
            </h2>
            <p className="mt-4 leading-relaxed">
              Inside the measured envelope, the Random Forest path is used.
              Outside it, the Linear Regression path extrapolates.
            </p>

            <div className="mt-6 overflow-hidden rounded-sm border border-surface-200">
              <table className="w-full text-sm">
                <thead className="bg-surface-50 text-left text-xs font-bold uppercase tracking-wide text-ink-600">
                  <tr>
                    <th className="px-4 py-3">Condition</th>
                    <th className="px-4 py-3">Model used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 text-ink-700">
                  <tr>
                    <td className="px-4 py-3 font-mono text-xs">
                      num_num ≤ 50 AND num_cat ≤ 50 AND rows ≤ 50,000
                    </td>
                    <td className="px-4 py-3 font-semibold text-ink-800">
                      Random Forest
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-xs">otherwise</td>
                    <td className="px-4 py-3 font-semibold text-ink-800">
                      Linear Regression
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
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
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
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
                  <strong>Hardware-calibrated.</strong> The baseline ran on a
                  dual-core Intel Xeon at 2.20 GHz. Expect meaningful deviation
                  on different CPU architectures or when a GPU is in the loop.
                </p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  <strong>Default hyperparameters only.</strong> The five
                  classifiers were measured with scikit-learn 1.2.2 defaults.
                  Custom hyperparameters — especially tree depth or ensemble
                  size — will shift real energy consumption in ways the
                  meta-model does not see.
                </p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  <strong>Extrapolation caveat.</strong> Inputs beyond the
                  50/50/50,000 envelope are handled by the linear fallback,
                  which is exactly a linear extrapolation. Treat large-data
                  predictions as rough directional guidance.
                </p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  <strong>No XGBoost.</strong> The original campaign measured
                  XGBoost too, but it was excluded from the production model
                  for sklearn-API consistency. If you need an XGBoost estimate,
                  this model will not give you one.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Maintenance
            </h2>
            <p className="mt-4 leading-relaxed">
              <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">
                scikit-learn==1.2.2
              </code>{" "}
              is pinned in the backend&apos;s{" "}
              <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">
                pyproject.toml
              </code>{" "}
              to guarantee joblib-load compatibility. If the model is ever
              retrained, update this card alongside the artefact and regenerate
              the pinned dependency. A future phase may export the model to
              ONNX for language-agnostic serving and to eliminate the Python
              pickling attack surface entirely.
            </p>
          </section>

          <section className="rounded-sm border border-surface-200 bg-surface-50 p-6">
            <h2 className="text-h4 font-bold tracking-tight text-ink-900">
              Query the live metadata
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              The backend exposes <code className="rounded-sm bg-surface-0 px-1 text-xs">GET /api/v1/metadata</code>{" "}
              which returns the sklearn version, feature names, thresholds, and
              loaded artefact path at runtime — use it to verify that the model
              running in production matches this card.
            </p>
            <Link
              href="/calculate"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-900"
            >
              Try the calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
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
