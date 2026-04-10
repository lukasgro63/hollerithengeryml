"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PRIMARY_NAV } from "@/lib/nav";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-1">
      {PRIMARY_NAV.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href} className="group">
            <Link
              href={item.href}
              className={cn(
                "relative px-3.5 py-2 text-ui font-medium transition-colors duration-150",
                isActive
                  ? "text-ink-900"
                  : "text-ink-500 hover:text-ink-900",
              )}
            >
              {item.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3.5 -bottom-px h-[2px] rounded-full bg-brand-yellow transition-transform duration-200 origin-left",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function NavWrapper({ children }: { readonly children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-surface-0/85 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
          : "bg-transparent",
      )}
    >
      {children}
    </header>
  );
}
