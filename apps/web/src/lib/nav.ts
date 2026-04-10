/**
 * Primary navigation items used by the navbar, footer, and mobile menu.
 * Single source of truth so the three surfaces stay in sync.
 */

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
};

export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "Calculator", href: "/calculate" },
  { label: "Research", href: "/research" },
  { label: "Model", href: "/model" },
] as const;

export const FOOTER_LEGAL_NAV: readonly NavItem[] = [
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy", href: "/privacy" },
] as const;

export const FOOTER_EXTERNAL_NAV: readonly NavItem[] = [
  {
    label: "Herman Hollerith Zentrum",
    href: "https://www.hhz.de",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/lukasgro63/hollerithengeryml",
    external: true,
  },
] as const;
