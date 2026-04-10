import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroCalculator } from "@/components/marketing/HeroCalculator";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-mesh-hero -mt-[4.25rem] pt-[4.25rem]">
      {/* Grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-900) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--color-ink-900) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <Container size="wide">
        <div className="relative grid items-center gap-14 py-section-xl lg:grid-cols-12 lg:gap-20 lg:py-section-2xl">
          <div className="lg:col-span-7 animate-fade-in-up">
            <p className="eyebrow text-brand-yellow-press">
              Green AI · Peer-reviewed at INFORMATIK 2024
            </p>

            <h1 className="mt-6 text-hero font-bold tracking-tight text-ink-950">
              Know the energy cost{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-[family-name:var(--font-caveat)] text-[1.15em]">before</span>
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-1.5 bottom-0 z-0 h-[38%] bg-brand-yellow/50 rounded-sm"
                />
              </span>{" "}
              you train.
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

            <p className="mt-12 eyebrow text-ink-400">
              Herman Hollerith Zentrum · Reutlingen University
            </p>
          </div>

          {/* Inline calculator — desktop only */}
          <div className="hidden lg:col-span-5 lg:block animate-slide-in-right stagger-2">
            <HeroCalculator />
          </div>
        </div>
      </Container>

      {/* Smooth fade to next section */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-surface-0"
      />
    </section>
  );
}
