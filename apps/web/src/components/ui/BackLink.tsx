import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 transition-colors hover:text-ink-900"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Back to home
    </Link>
  );
}
