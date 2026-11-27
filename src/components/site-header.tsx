import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-sm text-base font-semibold tracking-tight"
        >
          WorkBot
        </Link>
        <nav aria-label="Main">
          <Link
            href="/settings"
            className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
