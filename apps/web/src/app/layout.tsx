import type { Metadata, Viewport } from "next";
import { Caveat, Instrument_Sans, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Herman Hollerith Zentrum" }],
  keywords: [
    "green AI",
    "machine learning",
    "energy consumption",
    "scikit-learn",
    "sustainability",
    "HHZ",
    "Reutlingen University",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: SITE_NAME,
    description: "Predict the energy cost of your ML training before you train it.",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Predict the energy cost of your ML training before you train it.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFE400",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${instrumentSans.variable} ${caveat.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-surface-0 text-ink-700 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand-yellow focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink-900"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
