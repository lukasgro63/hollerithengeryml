import type { ReactNode } from "react";

type PageHeaderProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: ReactNode;
};

/**
 * Shared page-header block for the long-form content routes.
 * Keeps the typography and spacing consistent across Research,
 * Model, About, and the legal pages.
 */
export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <div className="inline-flex items-center gap-2 rounded-sm border border-surface-300 bg-surface-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink-600">
        {eyebrow}
      </div>
      <h1 className="mt-6 text-display font-bold leading-tight tracking-tight text-ink-900">
        {title}
      </h1>
      <div className="mt-6 max-w-prose text-lead text-ink-600">{lede}</div>
    </header>
  );
}
