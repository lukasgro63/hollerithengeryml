type TableOfContentsProps = {
  readonly items: readonly { label: string; id: string }[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 border-l-2 border-surface-200 pl-5">
        <h2 className="label text-ink-400">
          On this page
        </h2>
        <ol className="mt-4 space-y-2.5 text-[0.8125rem]">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="text-ink-400 transition-colors duration-150 hover:text-ink-950"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
