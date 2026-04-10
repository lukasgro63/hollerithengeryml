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
    <footer className="mt-auto bg-ink-950 text-surface-300">
      <Container size="wide" as="div">
        <div className="grid gap-12 py-14 md:grid-cols-12 md:py-16">

          <div className="md:col-span-5">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-sm font-bold text-surface-0">
                Hollerith
              </span>
              <span className="font-display text-sm font-medium text-surface-0">
                EnergyML
              </span>
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-xs bg-brand-yellow"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-surface-400">
              Predict the energy consumption of ML model training before you
              train. A peer-reviewed research project of the Herman Hollerith
              Zentrum at Reutlingen University.
            </p>
          </div>


          <nav className="md:col-span-3" aria-label="Footer primary">
            <h2 className="mb-4 label text-surface-500">
              Navigate
            </h2>
            <ul className="flex flex-col gap-2.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-surface-400 transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>


          <nav className="md:col-span-4" aria-label="Footer external">
            <h2 className="mb-4 label text-surface-500">
              Elsewhere
            </h2>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_EXTERNAL_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-surface-400 transition-colors hover:text-brand-yellow"
                  >
                    {item.label}
                    <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>


        <div className="flex flex-col gap-4 border-t border-surface-0/10 py-6 text-xs text-surface-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} HollerithEnergyML contributors. MIT License.</p>
          <ul className="flex items-center gap-6">
            {FOOTER_LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-surface-300"
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
