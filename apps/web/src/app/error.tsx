"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center py-section-xl">
      <Container size="narrow">
        <div className="text-center">
          <p className="eyebrow text-brand-yellow-press">Something went wrong</p>
          <h1 className="mt-4 text-h2 font-extrabold tracking-tight text-ink-950">
            An unexpected error occurred.
          </h1>
          <p className="mt-4 text-lead text-ink-500">
            Please try again. If the problem persists, contact the maintainers.
          </p>
          <div className="mt-8">
            <Button onClick={reset} size="lg">
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
