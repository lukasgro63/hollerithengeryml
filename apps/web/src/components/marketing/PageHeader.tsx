import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type PageHeaderProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly lede: ReactNode;
};

export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden gradient-mesh-hero -mt-[4.25rem] pt-[4.25rem]">
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
        <header className="relative max-w-3xl py-section-lg animate-fade-in-up lg:py-section-xl">
          <p className="eyebrow text-brand-yellow-press">{eyebrow}</p>
          <h1 className="mt-5 text-display font-extrabold tracking-tight text-ink-950">
            {title}
          </h1>
          <div className="mt-6 max-w-prose text-lead text-ink-500">{lede}</div>
        </header>
      </Container>

      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-surface-0"
      />
    </div>
  );
}
