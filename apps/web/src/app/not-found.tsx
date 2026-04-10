import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center py-section-xl">
      <Container size="narrow">
        <div className="text-center">
          <p className="eyebrow text-brand-yellow-press">404</p>
          <h1 className="mt-4 text-h2 font-extrabold tracking-tight text-ink-950">
            Page not found.
          </h1>
          <p className="mt-4 text-lead text-ink-500">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8">
            <Button href="/" variant="secondary" size="lg">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
