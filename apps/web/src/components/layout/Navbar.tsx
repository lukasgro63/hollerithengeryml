import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { NavLinks, NavWrapper } from "@/components/layout/NavLinks";

export function Navbar() {
  return (
    <NavWrapper>
      <Container size="wide">
        <div className="flex h-[4.25rem] items-center justify-between gap-8">
          {/* Typographic logo */}
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            aria-label="HollerithEnergyML — home"
          >
            <span className="font-display text-[0.95rem] font-bold tracking-tight text-ink-900">
              Hollerith
            </span>
            <span className="font-display text-[0.95rem] font-medium tracking-tight text-ink-900">
              EnergyML
            </span>
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-[1px] bg-brand-yellow"
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:block" aria-label="Primary">
            <NavLinks />
          </nav>

          {/* Desktop CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <Button
              href="/calculate"
              size="sm"
              className="hidden md:inline-flex"
            >
              Calculate
            </Button>
            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </Container>
    </NavWrapper>
  );
}
