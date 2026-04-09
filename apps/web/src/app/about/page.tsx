import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <PlaceholderPage
      title="About"
      subtitle="HollerithEnergyML started in 2024 as a research project at the Herman Hollerith Zentrum. The full acknowledgements, contributors, and attributions will land here in Phase 4."
    />
  );
}
