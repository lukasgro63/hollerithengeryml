"use client";

import { useEffect, useState } from "react";

type ScrollIndicatorProps = {
  readonly target: string;
};

export function ScrollIndicator({ target }: ScrollIndicatorProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={target}
      aria-label="Scroll to content"
      className={[
        "fixed bottom-8 left-1/2 z-30 -translate-x-1/2",
        "flex flex-col items-center gap-2 text-ink-300 transition-all duration-500",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      ].join(" ")}
    >
      <svg
        width="20"
        height="32"
        viewBox="0 0 20 32"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="18"
          height="30"
          rx="9"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="10"
          cy="9"
          r="2"
          fill="currentColor"
          className="animate-scroll-dot"
        />
      </svg>
    </a>
  );
}
