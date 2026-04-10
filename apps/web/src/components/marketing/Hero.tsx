import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroCalculator } from "@/components/marketing/HeroCalculator";
import { ScrollIndicator } from "@/components/marketing/ScrollIndicator";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-mesh-hero -mt-[4.25rem] pt-[4.25rem] min-h-screen">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[15%] -left-[10%] h-[800px] w-[900px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(10, 10, 10, 0.12) 0%, rgba(10, 10, 10, 0.04) 40%, transparent 65%)" /* ink-950 */,
          filter: "blur(40px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[10%] -right-[5%] h-[900px] w-[900px] rounded-full animate-hero-float"
        style={{
          background: "radial-gradient(circle, rgba(255, 228, 0, 0.55) 0%, rgba(255, 228, 0, 0.2) 30%, rgba(255, 228, 0, 0.05) 50%, transparent 65%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[0%] -left-[5%] h-[450px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 208, 0, 0.3) 0%, rgba(255, 208, 0, 0.06) 40%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <Container size="wide">
        <div className="relative grid items-center gap-14 pt-section-lg pb-section-md lg:grid-cols-12 lg:gap-20 lg:pt-section-xl">
          <div className="lg:col-span-7 animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="inline-flex shrink-0 items-center bg-brand-yellow px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-900 shadow-glow-yellow">
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

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
              {([
                { value: "450+", label: "measured runs" },
                { value: "3", label: "public datasets" },
                { value: "0.996", label: "R² accuracy" },
                { value: "2024", label: "peer-reviewed" },
              ] as const).map(({ value, label }) => (
                <div key={label}>
                  <div aria-hidden="true" className="mb-2 h-[2px] w-5 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end" />
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

          <div className="hidden lg:col-span-5 lg:block animate-slide-in-right stagger-2">
            <p className="label text-ink-400 mb-4">
              Your dataset, your footprint
            </p>
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-lg bg-brand-yellow/15 blur-2xl"
              />
              <div className="relative">
                <HeroCalculator />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <ScrollIndicator target="#how-it-works" />

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-surface-50"
      />
    </section>
  );
}
