import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const metadata: Metadata = {
  title: "Imprint",
};

export default function ImprintPage() {
  return (
    <PlaceholderPage
      title="Imprint"
      subtitle="EU-compliant imprint content will be added here once the production deployment has a legally responsible party listed."
    />
  );
}
