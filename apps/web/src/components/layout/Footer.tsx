import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import {
  FOOTER_EXTERNAL_NAV,
  FOOTER_LEGAL_NAV,
  PRIMARY_NAV,
} from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-surface-200 bg-surface-50">
      <Container size="wide" as="div">
        <div className="grid gap-10 py-section-md md:grid-cols-12 md:py-section-lg">
          <div className="md:col-span-5">
            <p className="text-base font-bold text-ink-800">HollerithEnergyML</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-600">
              Predict the energy consumption of ML model training before you train.
              A research project of the Herman Hollerith Zentrum at Reutlingen
              University.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Footer primary">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-500">
              Site
            </h2>
            <ul className="flex flex-col gap-2">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-700 hover:text-ink-900 hover:underline underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-4" aria-label="Footer external">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-ink-500">
              Elsewhere
            </h2>
            <ul className="flex flex-col gap-2">
              {FOOTER_EXTERNAL_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-ink-700 hover:text-ink-900 hover:underline underline-offset-4"
                  >
                    {item.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-surface-200 py-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} HollerithEnergyML contributors. MIT License.</p>
          <ul className="flex items-center gap-5">
            {FOOTER_LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-ink-800 hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
