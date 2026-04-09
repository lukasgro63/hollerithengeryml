import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  return (
    <PlaceholderPage
      title="The research"
      subtitle="The baseline-campaign methodology will be documented here in Phase 4: which factors affect training energy, how the CodeCarbon measurements were run across Diabetes, Bank Marketing, and Heart 2020, and how the meta-model was trained on the aggregated data."
    />
  );
}
