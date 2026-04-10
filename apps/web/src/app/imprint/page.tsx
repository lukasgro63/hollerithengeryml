import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import { HHZ_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Legal imprint and disclaimer for the HollerithEnergyML web service — " +
    "a research project of the Herman Hollerith Zentrum at Reutlingen University.",
};

const HHZ_IMPRINT_URL = `${HHZ_URL}/impressum`;

export default function ImprintPage() {
  return (
    <article>
      <PageHeader
        eyebrow="Legal"
        title="Imprint"
        lede={
          <>
            Legal notice according to <strong>&sect; 5 TMG</strong> and
            editorial responsibility according to{" "}
            <strong>&sect; 18 Abs. 2 MStV</strong>.
          </>
        }
      />

      <Container size="wide">
        <div className="max-w-3xl space-y-section-md pb-section-lg pt-section-md text-ink-700 lg:pb-section-xl">
          {/* ----------------------------------------------------------------
           * Responsible party — reference to HHZ / Hochschule Reutlingen
           * -------------------------------------------------------------- */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Responsible party
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML is a research project of the{" "}
              <strong>Herman Hollerith Zentrum (HHZ)</strong> at{" "}
              <strong>Hochschule Reutlingen</strong>. The legally responsible
              party within the meaning of &sect; 5 TMG is:
            </p>
            <address className="mt-4 not-italic leading-relaxed">
              Hochschule Reutlingen
              <br />
              Alteburgstra&szlig;e 150
              <br />
              72762 Reutlingen
              <br />
              Germany
            </address>
            <p className="mt-4 leading-relaxed">
              For the complete legal imprint including contact details,
              legal representative, VAT identification, and data protection
              officer, please refer to the official imprint of the
              Herman Hollerith Zentrum:
            </p>
            <p className="mt-3">
              <a
                href={HHZ_IMPRINT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                www.hhz.de/impressum
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </p>
          </section>

          {/* ----------------------------------------------------------------
           * Disclaimer for external links
           * -------------------------------------------------------------- */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Disclaimer for external links
            </h2>
            <p className="mt-4 leading-relaxed">
              This website contains links to external websites of third parties
              on whose content we have no influence. We therefore cannot assume
              any liability for these external contents. The respective provider
              or operator of the linked pages is always responsible for their
              content. The linked pages were checked for possible legal
              violations at the time of linking. Illegal content was not
              recognisable at the time of linking.
            </p>
          </section>

          {/* ----------------------------------------------------------------
           * Project disclaimer (bilingual, carried over from the 2024 legacy)
           * -------------------------------------------------------------- */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Disclaimer
            </h2>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-widest text-ink-500">
              Deutsch
            </h3>
            <p className="mt-3 leading-relaxed">
              Die auf dieser Website pr&auml;sentierten Inhalte und Ergebnisse
              des Projekts &bdquo;HollerithEnergyML&ldquo; wurden von
              Studierenden im Rahmen ihres Studiums erstellt. Diese Inhalte
              dienen ausschlie&szlig;lich zu Bildungs- und
              Informationszwecken. Trotz sorgf&auml;ltiger Bem&uuml;hungen,
              die Informationen korrekt zu halten, &uuml;bernehmen wir keine
              Garantie f&uuml;r die Aktualit&auml;t, Richtigkeit,
              Vollst&auml;ndigkeit oder Qualit&auml;t der bereitgestellten
              Informationen. Die Nutzung der Inhalte der Website erfolgt auf
              eigene Gefahr des Nutzers.
            </p>
            <p className="mt-3 leading-relaxed">
              Sofern Teile oder einzelne Formulierungen dieses Textes der
              geltenden Rechtslage nicht, nicht mehr oder nicht
              vollst&auml;ndig entsprechen sollten, bleiben die &uuml;brigen
              Teile des Dokumentes in ihrem Inhalt und ihrer G&uuml;ltigkeit
              davon unber&uuml;hrt.
            </p>

            <h3 className="mt-8 text-sm font-bold uppercase tracking-widest text-ink-500">
              English
            </h3>
            <p className="mt-3 leading-relaxed">
              The content and results of the &ldquo;HollerithEnergyML&rdquo;
              project presented on this website were created by students as
              part of their studies. This content is for educational and
              informational purposes only. Despite careful efforts to keep the
              information correct, we do not guarantee the timeliness,
              correctness, completeness, or quality of the information
              provided. Use of the contents of this website is at the
              user&apos;s own risk.
            </p>
            <p className="mt-3 leading-relaxed">
              If sections or individual terms of this statement are not legal
              or correct, the content or validity of the other parts remain
              uninfluenced by this fact.
            </p>
          </section>

          {/* ----------------------------------------------------------------
           * Copyright
           * -------------------------------------------------------------- */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Copyright
            </h2>
            <p className="mt-4 leading-relaxed">
              The source code of this application is published under the{" "}
              <strong>MIT License</strong>; see the{" "}
              <code className="bg-surface-100 px-1.5 py-0.5 text-sm">
                LICENSE
              </code>{" "}
              file in the repository for the full terms. Content, text, and
              graphical elements on this website that are not covered by that
              licence remain the intellectual property of their respective
              authors.
            </p>
          </section>
        </div>

        <footer className="border-t border-surface-100 pb-section-lg pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 hover:text-ink-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </footer>
      </Container>
    </article>
  );
}
