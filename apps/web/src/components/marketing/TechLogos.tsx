import Image from "next/image";

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
    <>
      {PARTNERS.map(({ name, src, height, width }) => (
        <div
          key={name}
          className="flex items-center justify-center opacity-40 brightness-0 invert transition-opacity duration-300 hover:opacity-70"
        >
          <Image
            src={src}
            alt={name}
            height={height}
            width={width}
            className="h-auto max-h-8 w-auto object-contain"
            unoptimized
          />
        </div>
      ))}
    </>
  );
}
