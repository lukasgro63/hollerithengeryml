import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const metadata: Metadata = {
  title: "Calculator",
};

export default function CalculatePage() {
  return (
    <PlaceholderPage
      title="Calculator"
      subtitle="The calculator lands in Phase 3. It will collect three dataset-shape inputs, call POST /api/v1/predictions, and render a ranked bar chart of predicted training energy for the five classical algorithms."
    />
  );
}
