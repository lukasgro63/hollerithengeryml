import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroCalculator } from "@/components/marketing/HeroCalculator";
import { ScrollIndicator } from "@/components/marketing/ScrollIndicator";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-mesh-hero -mt-[4.25rem] pt-[4.25rem] min-h-screen">
      {/* Graph paper grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-900) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--color-ink-900) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          opacity: 0.06,
        }}
      />
      {/* Finer sub-grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-900) 0.5px, transparent 0.5px), " +
            "linear-gradient(90deg, var(--color-ink-900) 0.5px, transparent 0.5px)",
          backgroundSize: "18px 18px",
          opacity: 0.03,
        }}
      />

      <Container size="wide">
        <div className="relative grid items-center gap-14 pt-section-lg pb-section-md lg:grid-cols-12 lg:gap-20 lg:pt-section-xl">
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center bg-brand-yellow px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-900">
                Peer-reviewed
              </span>
              <p className="eyebrow text-brand-yellow-press">
                INFORMATIK 2024 · Gesellschaft für Informatik
              </p>
            </div>

            <h1 className="mt-6 text-hero font-bold tracking-tight text-ink-950">
              Know the energy cost{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-[family-name:var(--font-caveat)] text-[1.15em] text-brand-yellow">before</span>
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 120 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C20 2, 40 10, 60 5 S100 9, 118 4"
                    stroke="var(--color-brand-yellow)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              you train your ML model.
            </h1>

            <p className="mt-7 max-w-lg text-lead text-ink-500">
              Three numbers — numerical features, categorical features, dataset
              rows — and you get a ranked energy estimate for five classical
              scikit-learn algorithms.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href="/calculate" size="lg">
                Open the calculator
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/research" variant="secondary" size="lg">
                Read the research
              </Button>
            </div>

            {/* Proof stats — inline in hero content */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              {([
                { value: "450+", label: "measured runs" },
                { value: "3", label: "public datasets" },
                { value: "0.996", label: "R² accuracy" },
                { value: "2024", label: "peer-reviewed" },
              ] as const).map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-lg font-extrabold tracking-tight text-ink-950">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[0.6875rem] text-ink-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Inline calculator — desktop only */}
          <div className="hidden lg:col-span-5 lg:block animate-slide-in-right stagger-2">
            <p className="label text-ink-400 mb-4">
              Your dataset, your footprint
            </p>
            <HeroCalculator />
          </div>
        </div>
      </Container>

      {/* Scroll indicator — fixed to bottom of viewport */}
      <ScrollIndicator target="#how-it-works" />

      {/* Smooth transition to light content */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-surface-0"
      />
    </section>
  );
}
