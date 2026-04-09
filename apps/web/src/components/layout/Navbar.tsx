import Link from "next/link";
import { Zap } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { PRIMARY_NAV } from "@/lib/nav";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200 bg-surface-0/95 backdrop-blur-sm">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-ink-800 transition-colors hover:text-ink-600"
            aria-label="HollerithEnergyML — home"
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-brand-yellow"
              aria-hidden="true"
            >
              <Zap className="h-5 w-5 text-ink-900" strokeWidth={2.5} />
            </span>
            <span className="font-bold tracking-tight text-base sm:text-lg">
              HollerithEnergyML
            </span>
          </Link>

          <nav className="hidden md:block" aria-label="Primary">
            <ul className="flex items-center gap-1">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-sm px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-100 hover:text-ink-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
