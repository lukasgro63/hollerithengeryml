import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Privacy policy for the HollerithEnergyML web service: what we process, " +
    "what we do not store, and your rights under the GDPR.",
};

export default function PrivacyPage() {
  return (
    <Container size="wide">
      <article className="py-section-lg lg:py-section-xl">
        <PageHeader
          eyebrow="Legal"
          title="Privacy policy"
          lede={
            <>
              How HollerithEnergyML handles data under the{" "}
              <strong>General Data Protection Regulation (GDPR)</strong>. The
              short version: it is a stateless calculator and it does not
              persist anything about you.
            </>
          }
        />

        <div className="mt-section-lg max-w-3xl space-y-section-md text-ink-700">
          <aside className="rounded-sm border border-warning/40 bg-warning/10 p-5 text-sm">
            <p className="font-semibold text-ink-800">
              Template — pending legal review.
            </p>
            <p className="mt-2 leading-relaxed">
              This document describes the data-processing behaviour of the
              application as designed. Before publishing to a production
              domain, have it reviewed by qualified legal counsel and
              synchronised with the real data controller named in the imprint.
            </p>
          </aside>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Data controller
            </h2>
            <p className="mt-4 leading-relaxed">
              The data controller responsible for this website within the
              meaning of Art. 4 (7) GDPR is the party named on our{" "}
              <Link
                href="/imprint"
                className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                imprint
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              What data we process
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML is a stateless calculator. Every prediction
              request is independent and leaves no trace after the response has
              been delivered. Specifically:
            </p>
            <ul className="mt-4 space-y-3 leading-relaxed">
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  <strong>What we do process.</strong> The three integers you
                  submit to the calculator (numerical feature count, categorical
                  feature count, dataset size), processed in-memory to run a
                  prediction, then discarded.
                </p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  <strong>What we do <em>not</em> process.</strong> Your actual
                  dataset, model weights, training code, personal
                  characteristics, user account information, or any data that
                  would allow us to identify you.
                </p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  <strong>What we do <em>not</em> store.</strong> Nothing. There
                  is no database. No request logs are kept beyond the rolling
                  operational log needed to diagnose service failures — and
                  those rotate quickly and are never shared.
                </p>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Server logs
            </h2>
            <p className="mt-4 leading-relaxed">
              Our hosting infrastructure collects minimal technical log data to
              keep the service running and secure. These logs typically include
              the request IP address, timestamp, requested path, HTTP status
              code, user agent, and referrer — the standard fields any web
              server records. Log retention is limited to what is technically
              necessary to investigate incidents and is governed by{" "}
              <strong>Art. 6 (1)(f) GDPR</strong> (legitimate interest in
              operating a secure service).
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Cookies
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML does not set any cookies. The application
              functions without client-side storage or session tracking of any
              kind.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Third-party services
            </h2>
            <p className="mt-4 leading-relaxed">
              The application is self-hosted and does not embed third-party
              analytics, advertising trackers, or social media pixels. Fonts
              are self-hosted via the Next.js font pipeline — no requests are
              made to Google Fonts or similar CDNs when you visit the site.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Your rights under the GDPR
            </h2>
            <p className="mt-4 leading-relaxed">
              As a data subject, you have the following rights with respect to
              your personal data:
            </p>
            <ul className="mt-4 space-y-2 leading-relaxed">
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>Right of access (Art. 15 GDPR)</p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>Right to rectification (Art. 16 GDPR)</p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>Right to erasure (Art. 17 GDPR)</p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>Right to restriction of processing (Art. 18 GDPR)</p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>Right to data portability (Art. 20 GDPR)</p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>Right to object (Art. 21 GDPR)</p>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                />
                <p>
                  Right to lodge a complaint with a supervisory authority
                  (Art. 77 GDPR)
                </p>
              </li>
            </ul>
            <p className="mt-4 leading-relaxed">
              Because HollerithEnergyML does not store user data, most of the
              above rights are trivially satisfied: there is nothing on file to
              access, rectify, or erase. If you still wish to exercise any of
              these rights, please contact the data controller listed on the
              imprint page.
            </p>
          </section>

          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Changes to this policy
            </h2>
            <p className="mt-4 leading-relaxed">
              This privacy policy may be updated if the service&apos;s
              data-processing behaviour changes. The effective version is
              always the one hosted at this URL.
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
