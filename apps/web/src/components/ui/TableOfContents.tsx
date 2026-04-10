type TableOfContentsProps = {
  readonly items: readonly string[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 border-l-2 border-surface-200 pl-5">
        <h2 className="font-display text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-ink-400">
          On this page
        </h2>
        <ol className="mt-4 space-y-2.5 text-[0.8125rem]">
          {items.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-ink-400 transition-colors duration-150 hover:text-ink-950"
              >
                {item}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
