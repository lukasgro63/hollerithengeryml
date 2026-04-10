import Image from "next/image";
import { Container } from "@/components/ui/Container";

const PARTNERS = [
  {
    name: "Herman Hollerith Zentrum",
    src: "/logos/hollerith-zentrum-logo.svg",
    height: 48,
    width: 180,
  },
  {
    name: "Hochschule Reutlingen",
    src: "/logos/hs-reutlingen-logo.svg",
    height: 48,
    width: 180,
  },
  {
    name: "Informatik HHZ",
    src: "/logos/informatik-hhz-logo.svg",
    height: 44,
    width: 160,
  },
  {
    name: "KI-Lab Region Stuttgart",
    src: "/logos/csm_Logo_KI-Lab_Region_Stuttgart_a1f6b5fc9b.webp",
    height: 44,
    width: 160,
  },
] as const;

export function TechLogos() {
  return (
    <section className="bg-surface-0 py-10 sm:py-14">
      <Container size="wide">
        <p className="mb-8 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-400">
          A research project by
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 lg:gap-x-20">
          {PARTNERS.map(({ name, src, height, width }) => (
            <div
              key={name}
              className="logo-muted flex items-center justify-center"
            >
              <Image
                src={src}
                alt={name}
                height={height}
                width={width}
                className="h-auto max-h-12 w-auto object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
