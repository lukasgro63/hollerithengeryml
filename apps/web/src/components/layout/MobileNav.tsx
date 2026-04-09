"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PRIMARY_NAV, FOOTER_LEGAL_NAV } from "@/lib/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-800 hover:bg-surface-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 bg-surface-0"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-16 items-center justify-between border-b border-surface-200 px-5">
            <span className="font-bold tracking-tight text-ink-800">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink-800 hover:bg-surface-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav
            className="flex flex-col gap-1 p-5"
            aria-label="Mobile primary"
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-4 py-4 text-lg font-semibold text-ink-800 transition-colors hover:bg-surface-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-2 border-t border-surface-200 px-5 py-6">
            <ul className="flex flex-col gap-3">
              {FOOTER_LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm text-ink-500 hover:text-ink-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
