import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import {
  GITHUB_URL,
  HHZ_URL,
  PAPER_AUTHORS,
  PAPER_DOI,
  PAPER_DOI_URL,
  PAPER_PAGES,
  PAPER_PDF_URL,
  PAPER_TITLE,
  PAPER_VENUE,
  PAPER_YEAR,
  REUTLINGEN_UNIVERSITY_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "The origin, contributors, and institutional home of HollerithEnergyML — " +
    "a research-derived Green AI tool from the Herman Hollerith Zentrum.",
};

export default function AboutPage() {
  return (
    <Container size="wide">
      <article className="py-section-lg lg:py-section-xl">
        <PageHeader
          eyebrow="About"
          title="An HHZ research project"
          lede={
            <>
              HollerithEnergyML started in early 2024 as a student research
              project at the{" "}
              <a
                href={HHZ_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                Herman Hollerith Zentrum
              </a>
              , the graduate school for digital transformation at{" "}
              <a
                href={REUTLINGEN_UNIVERSITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                Reutlingen University
              </a>
              .
            </>
          }
        />

        <div className="mt-section-lg max-w-3xl space-y-section-md text-ink-700">
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Why this exists
            </h2>
            <p className="mt-4 leading-relaxed">
              Machine learning workloads are a meaningful and growing share of
              global electricity consumption, and most practitioners still have
              no intuitive sense for the cost of their training jobs. Our
              starting hypothesis was modest: if we could predict the energy
              budget from the shape of the dataset alone, students and
              researchers could make greener algorithm choices before they
              ever run a single fit.
            </p>
            <p className="mt-4 leading-relaxed">
              The 2024 baseline campaign — the one that produced the
              joblib-packaged meta-model this service serves — validated that
              hypothesis for a narrow but useful slice of the world: classical
              scikit-learn classifiers on tabular data. The service you are
              using right now is the production-grade packaging of that work.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              The 2026 rebuild
            </h2>
            <p className="mt-4 leading-relaxed">
              After the original project went dormant and the hosted version
              stopped running, the HHZ asked for it to be revived, cleaned up,
              and prepared for long-term maintenance. The rebuild preserves
              the research and the production meta-model verbatim, but
              replaces everything around them: a modernised FastAPI backend
              with Pydantic v2 bounded inputs, a Next.js 16 frontend built
              mobile-first in the HHZ visual language, a hardened Docker
              deployment on Hetzner Cloud, and a documentation trail future
              contributors can actually follow.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              The original team
            </h2>
            <p className="mt-4 leading-relaxed">
              The 2024 prototype was developed at the Herman Hollerith Zentrum
              and peer-reviewed at INFORMATIK 2024 in Bonn. The paper lists
              the following contributors:
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
              {PAPER_AUTHORS.map((author) => (
                <li key={author} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-brand-yellow"
                  />
                  {author}
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-relaxed">
              Their raw measurements and methodology notes live under{" "}
              <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">
                research/
              </code>{" "}
              in the repository, preserved as an immutable archive so future
              contributors can audit and extend the work. The 2026 rebuild&apos;s
              application layer — the FastAPI service, the Next.js frontend,
              the infrastructure scaffolding, and the documentation you&apos;re
              reading now — was implemented as a standalone modernisation
              project on top of that archive.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Citation
            </h2>
            <p className="mt-4 leading-relaxed">
              If you reference this project in academic work, cite the
              INFORMATIK 2024 paper:
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
              Source code &amp; licence
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML is open source under the{" "}
              <a
                href={`${GITHUB_URL}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                MIT License
              </a>
              . The full source, research archive, and contribution guide are
              on GitHub.
            </p>
            <p className="mt-6">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                View the repository on GitHub
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
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
