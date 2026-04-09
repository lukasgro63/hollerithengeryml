import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hollerith.example.de"),
  title: {
    default: "HollerithEnergyML — predict ML training energy consumption",
    template: "%s · HollerithEnergyML",
  },
  description:
    "Estimate the energy consumption of training classical scikit-learn " +
    "algorithms from the shape of your dataset. A research project of the " +
    "Herman Hollerith Zentrum at Reutlingen University.",
  applicationName: "HollerithEnergyML",
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
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    title: "HollerithEnergyML",
    description:
      "Predict the energy cost of your ML training before you train it.",
    siteName: "HollerithEnergyML",
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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface-0 text-ink-800">
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
