"use client";

import { useCallback, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

export function FAQAccordion({ items }: { readonly items: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <dl className="divide-y divide-surface-200">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.question} className="group">
            <dt>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors duration-150 hover:text-ink-950"
              >
                <span className="font-display text-base font-bold tracking-tight text-ink-900">
                  {item.question}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 transition-all duration-300 ${
                    isOpen ? "rotate-180 text-brand-yellow" : "text-ink-400"
                  }`}
                  aria-hidden="true"
                />
              </button>
            </dt>
            <dd
              id={panelId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-sm leading-relaxed text-ink-500">
                  {item.answer}
                </p>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
