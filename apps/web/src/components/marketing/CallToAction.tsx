import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CallToAction() {
  return (
    <section className="pt-section-md pb-section-lg lg:pb-section-xl">
      <div className="bg-brand-yellow py-10 sm:py-12">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-8 px-5 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-lg font-bold tracking-tight text-ink-950 sm:text-xl lg:text-2xl">
              R² = 0.996 on held-out data.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-700 sm:text-base">
              The meta-model is peer-reviewed and open-source. Estimate
              kilowatt-hours for five classical ML algorithms before you
              spend the watts.
            </p>
          </div>
          <Button href="/calculate" variant="secondary" size="lg" className="flex-shrink-0">
            Run a prediction
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
