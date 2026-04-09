import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/marketing/PlaceholderPage";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy"
      subtitle="The service is stateless: no user data is persisted, no tracking pixels, no third-party analytics. The full privacy policy with the legally required disclosures will be added before go-live."
    />
  );
}
