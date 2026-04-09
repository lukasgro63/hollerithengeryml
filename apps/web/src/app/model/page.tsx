import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const metadata: Metadata = {
  title: "Model Card",
};

export default function ModelPage() {
  return (
    <PlaceholderPage
      title="Model card"
      subtitle="The model card — scikit-learn version, feature layout, model-selection rule, training data, known limitations, and maintenance notes — will be published here in Phase 4. The working source lives at docs/MODEL_CARD.md."
    />
  );
}
