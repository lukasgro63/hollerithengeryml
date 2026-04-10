import type { ReactNode } from "react";

type DataTableProps = {
  readonly number: string;
  readonly caption: string;
  readonly children: ReactNode;
};

const TH_CLASS =
  "pb-2.5 pr-6 label text-ink-400";

const TR_CLASS =
  "border-b border-surface-100 transition-colors duration-150 hover:bg-brand-yellow/[0.03]";

export { TH_CLASS, TR_CLASS };

export function DataTable({ number, caption, children }: DataTableProps) {
  return (
    <figure className="mt-8">
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
      <table className="mt-4 w-full text-sm">{children}</table>
      <div
        aria-hidden="true"
        className="h-[2px] bg-gradient-to-r from-brand-yellow to-brand-yellow-end"
      />
    </figure>
  );
}
