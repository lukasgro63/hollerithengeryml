import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { FeatureCards } from "@/components/marketing/FeatureCards";
import { ResearchTeaser } from "@/components/marketing/ResearchTeaser";
import { FAQ } from "@/components/marketing/FAQ";
import { CallToAction } from "@/components/marketing/CallToAction";

export const metadata: Metadata = {
  title: "HollerithEnergyML — Predict ML training energy consumption",
  description:
    "Compare the relative training-energy share of five classical scikit-learn algorithms before you train. " +
    "A peer-reviewed research tool from the Herman Hollerith Zentrum at Reutlingen University.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ResearchTeaser />
      <FAQ />
      <CallToAction />
    </>
  );
}
