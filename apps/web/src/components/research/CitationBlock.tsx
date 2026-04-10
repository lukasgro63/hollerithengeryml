"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, FileText } from "lucide-react";

import {
  PAPER_AUTHORS,
  PAPER_DOI,
  PAPER_DOI_URL,
  PAPER_PAGES,
  PAPER_PDF_URL,
  PAPER_TITLE,
  PAPER_YEAR,
} from "@/lib/site";

const BIBTEX = `@inproceedings{zanger2024hollerithenergyml,
  title     = {${PAPER_TITLE}},
  author    = {${PAPER_AUTHORS.join(" and ")}},
  booktitle = {INFORMATIK 2024},
  year      = {${PAPER_YEAR}},
  pages     = {${PAPER_PAGES}},
  publisher = {Gesellschaft f{\\\"u}r Informatik e.V.},
  doi       = {${PAPER_DOI}},
}`;

export function CitationBlock() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(BIBTEX);
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(true);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="mt-8">

      <div className="border-l-[3px] border-brand-yellow pl-6 sm:pl-8">
        <span
          aria-hidden="true"
          className="block font-display text-[3.5rem] leading-[0.7] text-brand-yellow select-none"
        >
          &ldquo;
        </span>

        <p className="mt-2 font-display text-h4 font-bold leading-snug tracking-tight text-ink-950">
          {PAPER_TITLE}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ink-600">
          {PAPER_AUTHORS.join(", ")}
        </p>
      </div>


      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-ui text-ink-500">
        <dt className="label text-ink-400">
          Workshop
        </dt>
        <dd>Data Analytics as a Service (DAS2024)</dd>
        <dt className="label text-ink-400">
          Published in
        </dt>
        <dd>INFORMATIK {PAPER_YEAR}, pp. {PAPER_PAGES}</dd>
        <dt className="label text-ink-400">
          Publisher
        </dt>
        <dd>Gesellschaft für Informatik e.V., Bonn</dd>
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 underline decoration-brand-yellow decoration-2 underline-offset-4 transition-colors hover:text-ink-900"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-success" aria-hidden="true" />
              <span aria-live="polite">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden="true" />
              Cite BibTeX
            </>
          )}
        </button>
        <a
          href={PAPER_DOI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs text-ink-400 transition-colors hover:text-ink-800"
        >
          doi:{PAPER_DOI}
        </a>
        <a
          href={PAPER_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-700 underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-ink-900"
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          PDF (5 pp.)
        </a>
      </div>
    </div>
  );
}
