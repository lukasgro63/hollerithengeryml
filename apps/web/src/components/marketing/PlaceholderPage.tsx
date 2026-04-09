import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

type PlaceholderPageProps = {
  readonly title: string;
  readonly subtitle: string;
  readonly children?: ReactNode;
};

/**
 * Shared skeleton used for all routes that have not yet received their
 * final content in Phase 3/4. Keeps the navbar + footer shell meaningful
 * so design review can happen against the real layout.
 */
export function PlaceholderPage({ title, subtitle, children }: PlaceholderPageProps) {
  return (
    <Container size="narrow">
      <div className="py-section-lg lg:py-section-xl">
        <div className="inline-flex items-center gap-2 rounded-sm border border-surface-300 bg-surface-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
          Placeholder
        </div>

        <h1 className="mt-6 text-display font-bold leading-tight tracking-tight text-ink-900">
          {title}
        </h1>

        <p className="mt-6 max-w-prose text-lead text-ink-600">{subtitle}</p>

        {children ? <div className="mt-8">{children}</div> : null}

        <div className="mt-section-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-900 hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </Container>
  );
}
