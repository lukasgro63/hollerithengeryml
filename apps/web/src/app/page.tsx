import { Hero } from "@/components/marketing/Hero";
import { FeatureCards } from "@/components/marketing/FeatureCards";
import { ResearchTeaser } from "@/components/marketing/ResearchTeaser";
import { CallToAction } from "@/components/marketing/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <ResearchTeaser />
      <CallToAction />
    </>
  );
}
