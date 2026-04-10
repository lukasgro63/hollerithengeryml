import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-brand-yellow py-section-xl">
      {/* Grid pattern — dark lines on yellow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-ink-900) 1px, transparent 1px), " +
            "linear-gradient(90deg, var(--color-ink-900) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container size="wide">
        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow text-ink-700">Ready?</p>
            <h2 className="mt-4 text-h2 font-bold tracking-tight text-ink-950">
              Pick a greener algorithm.
            </h2>
            <p className="mt-4 max-w-xl text-lead text-ink-700">
              Open the calculator, plug in your dataset shape, and you&apos;ll
              see estimated kilowatt-hours for all five algorithms in under a
              second.
            </p>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Button href="/calculate" variant="secondary" size="lg">
              Open the calculator
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
