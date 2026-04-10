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
    <article>
      <PageHeader
        eyebrow="Legal"
        title="Privacy policy"
        lede={
          <>
            How HollerithEnergyML handles data under the{" "}
            <strong>General Data Protection Regulation (GDPR)</strong>. The
            short version: it is a stateless calculator and it does not persist
            anything about you.
          </>
        }
      />

      <Container size="wide">
        <div className="max-w-3xl space-y-section-md pb-section-lg pt-section-md text-ink-700 lg:pb-section-xl">
          {/* Data controller */}
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
                imprint page
              </Link>
              {" "}(Hochschule Reutlingen / Herman Hollerith Zentrum).
            </p>
          </section>

          {/* What we process */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              What data we process
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML is a stateless calculator. Every prediction
              request is independent and leaves no trace after the response has
              been delivered.
            </p>
            <ul className="mt-4 space-y-3 leading-relaxed">
              {[
                {
                  title: "What we do process.",
                  text: "The three integers you submit to the calculator (numerical feature count, categorical feature count, dataset size), processed in-memory to run a prediction, then discarded.",
                },
                {
                  title: "What we do not process.",
                  text: "Your actual dataset, model weights, training code, personal characteristics, user account information, or any data that would allow us to identify you.",
                },
                {
                  title: "What we do not store.",
                  text: "Nothing. There is no database. No request logs are kept beyond the minimal server logs described below.",
                },
              ].map(({ title, text }) => (
                <li key={title} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                  />
                  <p>
                    <strong>{title}</strong> {text}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Hosting
            </h2>
            <p className="mt-4 leading-relaxed">
              This website is hosted on servers of{" "}
              <strong>Hetzner Online GmbH</strong>, Industriestr. 25, 91710
              Gunzenhausen, Germany. Hetzner operates data centres exclusively
              within the European Union and is subject to the GDPR. A
              data-processing agreement (Auftragsverarbeitungsvertrag, AVV)
              in accordance with Art. 28 GDPR is in place.
            </p>
          </section>

          {/* Server logs */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Server logs
            </h2>
            <p className="mt-4 leading-relaxed">
              The hosting infrastructure collects minimal technical log data to
              keep the service running and secure. These logs typically include
              the request IP address, timestamp, requested path, HTTP status
              code, user agent, and referrer. Log retention is limited to what
              is technically necessary to investigate incidents and is governed
              by <strong>Art. 6 (1)(f) GDPR</strong> (legitimate interest in
              operating a secure service). Logs are not shared with third
              parties.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Cookies
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML does <strong>not</strong> set any cookies. The
              application functions without client-side storage or session
              tracking of any kind. No cookie-consent banner is required because
              no cookies are used.
            </p>
          </section>

          {/* Third-party services & fonts */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Third-party services and fonts
            </h2>
            <p className="mt-4 leading-relaxed">
              The application does not embed third-party analytics, advertising
              trackers, or social media pixels.
            </p>
            <p className="mt-3 leading-relaxed">
              Fonts (Plus Jakarta Sans, Instrument Sans, Caveat) are downloaded
              from Google Fonts at <strong>build time</strong> by the Next.js
              font pipeline and served from our own infrastructure. When you
              visit this site, <strong>no requests are made to Google</strong>{" "}
              or any other external font CDN. Your IP address is never
              transmitted to Google in connection with font delivery.
            </p>
          </section>

          {/* Embedding */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Embedding in third-party websites
            </h2>
            <p className="mt-4 leading-relaxed">
              HollerithEnergyML may be embedded within the websites of partner
              institutions (e.g. the KI-Lab Region Stuttgart). In such cases the
              embedding site&apos;s own privacy policy applies to the surrounding
              page. The embedded HollerithEnergyML application itself still does
              not set cookies or collect personal data beyond what is described
              in this policy.
            </p>
          </section>

          {/* GDPR rights */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Your rights under the GDPR
            </h2>
            <p className="mt-4 leading-relaxed">
              As a data subject, you have the following rights with respect to
              your personal data:
            </p>
            <ul className="mt-4 space-y-2 leading-relaxed">
              {[
                "Right of access (Art. 15 GDPR)",
                "Right to rectification (Art. 16 GDPR)",
                "Right to erasure (Art. 17 GDPR)",
                "Right to restriction of processing (Art. 18 GDPR)",
                "Right to data portability (Art. 20 GDPR)",
                "Right to object (Art. 21 GDPR)",
                "Right to lodge a complaint with a supervisory authority (Art. 77 GDPR)",
              ].map((right) => (
                <li key={right} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-yellow"
                  />
                  <p>{right}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed">
              Because HollerithEnergyML does not store user data, most of the
              above rights are trivially satisfied: there is nothing on file to
              access, rectify, or erase. If you still wish to exercise any of
              these rights, please contact the data controller listed on the{" "}
              <Link
                href="/imprint"
                className="font-semibold text-ink-800 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
              >
                imprint page
              </Link>
              .
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-h3 font-bold tracking-tight text-ink-900">
              Changes to this policy
            </h2>
            <p className="mt-4 leading-relaxed">
              This privacy policy may be updated if the service&apos;s
              data-processing behaviour changes. The effective version is always
              the one hosted at this URL.
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
