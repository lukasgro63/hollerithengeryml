import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CallToAction() {
  return (
    <section className="border-y border-surface-200 bg-ink-900 py-section-lg text-surface-0">
      <Container size="wide">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-h2 font-bold leading-tight tracking-tight">
              Ready to pick a greener algorithm?
            </h2>
            <p className="mt-4 max-w-prose text-lead text-surface-300">
              Open the calculator, plug in your dataset shape, and you&apos;ll see
              estimated kilowatt-hours for all five algorithms in under a second.
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <Button href="/calculate" size="lg">
              Open the calculator
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
