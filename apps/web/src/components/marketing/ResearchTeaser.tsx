import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PAPER_DOI, PAPER_DOI_URL } from "@/lib/site";

const STATS = [
  { value: "5", label: "Algorithms", detail: "compared side by side" },
  { value: "3", label: "Datasets", detail: "public tabular benchmarks" },
  { value: ".996", label: "R² accuracy", detail: "Random Forest meta-model", prefix: "0" },
  { value: "2024", label: "Peer-reviewed", detail: "at INFORMATIK, Bonn" },
] as const;

export function ResearchTeaser() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-section-xl text-surface-200 lg:py-section-2xl">
      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Subtle radial warm glow */}
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
          {/* Header */}
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

          {/* Stats grid */}
          <div className="mt-14 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
            {STATS.map(({ value, label, detail, ...rest }) => (
              <div key={label} className="relative">
                <div
                  aria-hidden="true"
                  className="mb-5 h-[3px] w-10 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
                />
                <p className="font-display text-[clamp(2.5rem,2rem+2vw,3.5rem)] font-extrabold leading-none tracking-tight text-surface-0">
                  {"prefix" in rest ? (
                    <>
                      <span className="text-surface-500">{rest.prefix}</span>
                      {value}
                    </>
                  ) : (
                    value
                  )}
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

          {/* Links */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-surface-0/10 pt-8">
            <Link
              href="/research"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-surface-0 underline decoration-brand-yellow decoration-2 underline-offset-4 transition-colors hover:text-brand-yellow"
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
        </div>
      </Container>
    </section>
  );
}
