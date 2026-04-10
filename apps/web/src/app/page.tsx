import { Hero } from "@/components/marketing/Hero";
import { TechLogos } from "@/components/marketing/TechLogos";
import { FeatureCards } from "@/components/marketing/FeatureCards";
import { ResearchTeaser } from "@/components/marketing/ResearchTeaser";
import { CallToAction } from "@/components/marketing/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TechLogos />
      <FeatureCards />
      <ResearchTeaser />
      <CallToAction />
    </>
  );
}
