import Link from "next/link";

import { config } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <nav aria-label="Footer" className="flex gap-5">
          <Link
            href="/settings"
            className="rounded-sm transition-colors hover:text-foreground"
          >
            Settings
          </Link>
          {/* Plain link: /api/health returns JSON, not a page. */}
          <a
            href="/api/health"
            className="rounded-sm transition-colors hover:text-foreground"
          >
            API health
          </a>
        </nav>
        <p>
          Build <code className="font-mono">{config.commit}</code> (
          {config.environment})
        </p>
      </div>
    </footer>
  );
}
