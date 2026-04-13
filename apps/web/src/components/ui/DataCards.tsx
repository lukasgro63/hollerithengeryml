import type { ReactNode } from "react";

type Field = {
  readonly label: string;
  readonly value: ReactNode;
};

type DataCardItem = {
  readonly key: string;
  readonly title: ReactNode;
  readonly fields: readonly Field[];
};

type DataCardsProps = {
  readonly number: string;
  readonly caption: string;
  readonly items: readonly DataCardItem[];
};

export function DataCards({ number, caption, items }: DataCardsProps) {
  return (
    <figure className="mt-8 sm:hidden">
      <figcaption className="flex items-center gap-3">
        <span className="flex-shrink-0 label text-brand-yellow-press">
          {number}
        </span>
        <span className="flex-shrink-0 text-xs text-ink-400">{caption}</span>
        <div
          aria-hidden="true"
          className="h-[3px] flex-1 rounded-full bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
        />
      </figcaption>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item.key}
            className="border border-surface-200 bg-surface-0 p-4"
          >
            <p className="font-display text-sm font-bold text-ink-900">
              {item.title}
            </p>
            <dl className="mt-3 space-y-2">
              {item.fields.map((field) => (
                <div key={field.label} className="flex justify-between gap-4">
                  <dt className="label text-ink-400">{field.label}</dt>
                  <dd className="text-right text-xs text-ink-700">{field.value}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div
        aria-hidden="true"
        className="mt-3 h-[2px] bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />
    </figure>
  );
}
