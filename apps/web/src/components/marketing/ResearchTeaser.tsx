import Link from "next/link";
import { ArrowRight, FileText, FlaskConical } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PAPER_DOI, PAPER_DOI_URL } from "@/lib/site";

export function ResearchTeaser() {
  return (
    <section className="border-y border-surface-200 bg-surface-50 py-section-lg">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-sm border border-surface-300 bg-surface-0 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
              <FlaskConical className="h-3.5 w-3.5 text-accent-rust" aria-hidden="true" />
              Research provenance
            </div>
            <h2 className="mt-6 text-h2 font-bold leading-tight tracking-tight text-ink-900">
              Grounded in a 2024 baseline campaign.
            </h2>
            <p className="mt-5 max-w-prose text-lead text-ink-600">
              Every prediction this service returns traces back to a controlled
              measurement campaign at the Herman Hollerith Zentrum: five
              scikit-learn classifiers, three public tabular datasets,
              instrumented with CodeCarbon, sweeping across feature counts and
              row counts to map the energy-versus-shape surface.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                Read the methodology
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={PAPER_DOI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-ink-600 hover:text-ink-900"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                INFORMATIK 2024 · doi:{PAPER_DOI}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-sm border border-surface-200 bg-surface-0 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Datasets
                </p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink-700">
                  <li>Diabetes Health Indicators</li>
                  <li>Bank Marketing Campaign</li>
                  <li>Heart Disease 2020 (CDC)</li>
                </ul>
              </article>
              <article className="rounded-sm border border-surface-200 bg-surface-0 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Tool
                </p>
                <p className="mt-3 text-sm text-ink-700">
                  CodeCarbon 2.3.1 for per-run CPU and RAM energy telemetry.
                </p>
              </article>
              <article className="rounded-sm border border-surface-200 bg-surface-0 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Stack
                </p>
                <p className="mt-3 text-sm text-ink-700">
                  Python 3.10 · scikit-learn 1.2.2 · MLflow on GitLab
                </p>
              </article>
              <article className="rounded-sm border border-surface-200 bg-surface-0 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-500">
                  Meta-model
                </p>
                <p className="mt-3 text-sm text-ink-700">
                  RandomForest inside the envelope, LinearRegression outside it.
                </p>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
