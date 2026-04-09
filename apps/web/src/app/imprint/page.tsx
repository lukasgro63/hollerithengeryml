import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Imprint",
  description:
    "Legal imprint required under German law (§ 5 TMG, § 18 MStV) for the " +
    "HollerithEnergyML web service.",
};

export default function ImprintPage() {
  return (
    <Container size="wide">
      <article className="py-section-lg lg:py-section-xl">
        <PageHeader
          eyebrow="Legal"
          title="Imprint"
          lede={
            <>
              Legal imprint according to <strong>§ 5 TMG</strong> and editorial
              responsibility according to <strong>§ 18 Abs. 2 MStV</strong>.
            </>
          }
        />

        <div className="mt-section-lg max-w-3xl space-y-section-md text-ink-700">
          <aside className="rounded-sm border border-warning/40 bg-warning/10 p-5 text-sm">
            <p className="font-semibold text-ink-800">
              Template — not yet legally binding.
            </p>
            <p className="mt-2 leading-relaxed">
              The values in square brackets below are placeholders that must be
              replaced with the real legally responsible party before this site
              goes live in production. A qualified legal review is recommended.
            </p>
          </aside>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Responsible party
            </h2>
            <address className="mt-4 not-italic leading-relaxed">
              [Name of responsible organisation or natural person]
              <br />
              [Street and number]
              <br />
              [Postal code] [City]
              <br />
              [Country]
            </address>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Contact
            </h2>
            <dl className="mt-4 space-y-2 text-sm leading-relaxed">
              <div className="flex gap-3">
                <dt className="w-24 flex-shrink-0 font-semibold text-ink-500">
                  Email
                </dt>
                <dd>[contact@example.de]</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 flex-shrink-0 font-semibold text-ink-500">
                  Phone
                </dt>
                <dd>[+49 …]</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Editorial responsibility
            </h2>
            <p className="mt-4 leading-relaxed">
              Content responsible according to § 18 Abs. 2 MStV:
            </p>
            <address className="mt-3 not-italic leading-relaxed">
              [Name of editor]
              <br />
              [Address, if different from above]
            </address>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Disclaimer for external links
            </h2>
            <p className="mt-4 leading-relaxed">
              This website contains links to external websites of third parties
              on whose content we have no influence. We therefore cannot assume
              any guarantee for these external contents. The respective
              provider or operator of the linked pages is always responsible
              for the content. The linked pages were checked for possible legal
              violations at the time of linking. Illegal content was not
              recognisable at the time of linking.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Copyright
            </h2>
            <p className="mt-4 leading-relaxed">
              The source code of this application is published under the MIT
              License; see the{" "}
              <code className="rounded-sm bg-surface-100 px-1.5 py-0.5 text-sm">
                LICENSE
              </code>{" "}
              file in the repository for the full terms. Content, text, and
              graphical elements on this website that are not covered by that
              licence remain the intellectual property of their respective
              authors. Reuse beyond the MIT licence requires the prior written
              consent of the responsible party listed above.
            </p>
          </section>
        </div>

        <footer className="mt-section-lg border-t border-surface-200 pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 hover:text-ink-900 hover:underline underline-offset-4"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </footer>
      </article>
    </Container>
  );
}
