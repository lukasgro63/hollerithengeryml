import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { TechLogos } from "@/components/marketing/TechLogos";
import { PAPER_DOI, PAPER_DOI_URL } from "@/lib/site";

const STATS = [
  { value: "12,550", label: "Training rows", detail: "meta-model training set" },
  { value: "450+", label: "Experiments", detail: "measured with CodeCarbon" },
  { value: "5", label: "Classifiers", detail: "scikit-learn algorithms" },
  { value: "3", label: "Datasets", detail: "public tabular benchmarks" },
] as const;

export function ResearchTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-section-xl text-surface-200 lg:py-section-2xl">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-surface-0) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--color-surface-0) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />


      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 70% 40%, rgba(255, 228, 0, 0.04) 0%, transparent 70%)",
        }}
      />

      <Container size="wide">
        <div className="relative">

          <div className="max-w-2xl">
            <p className="eyebrow text-brand-yellow">About</p>

            <h2 className="mt-4 text-h2 font-extrabold tracking-tight text-white">
              Born at the Herman Hollerith Zentrum.
            </h2>

            <p className="mt-5 text-lead text-surface-400">
              In 2024, a research team at Reutlingen University asked a simple
              question: how much energy does it actually take to train a
              classical ML model? The answer became a peer-reviewed paper —
              and this tool.
            </p>
          </div>


          <div className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {STATS.map(({ value, label, detail }) => (
              <div key={label} className="relative">
                <div
                  aria-hidden="true"
                  className="mb-5 h-[3px] w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
                />
                <p className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-extrabold leading-none tracking-tight text-surface-0">
                  {value}
                </p>
                <p className="mt-3 font-display text-sm font-bold text-surface-300">
                  {label}
                </p>
                <p className="mt-1 text-xs text-surface-500">
                  {detail}
                </p>
              </div>
            ))}
          </div>


          <div className="mt-14 flex flex-wrap items-center justify-between gap-y-8">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-surface-0 transition-colors hover:text-brand-yellow"
              >
                Read the full methodology
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href={PAPER_DOI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-surface-500 transition-colors hover:text-surface-300"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                doi:{PAPER_DOI}
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <TechLogos />
            </div>
          </div>
        </div>
      </Container>

    </section>
  );
}
