import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-16 pb-24 sm:px-6 sm:pt-28">
      <h1 className="max-w-[20ch] text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        Route every request to the right approver, and keep a record of each
        decision.
      </h1>
      <p className="mt-6 max-w-[60ch] text-lg/8 text-pretty text-muted-foreground">
        WorkBot is a workflow platform for enterprise teams. Requests such as
        system access, purchases, and new-hire onboarding start from one form,
        move through the right reviewers in order, and keep a history of who
        approved what and when.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button
          size="lg"
          nativeButton={false}
          render={<Link href="/settings" />}
        >
          View deployment settings
        </Button>
        {/* A plain link: /api/health returns JSON, not a page to navigate to client-side. */}
        <Button
          size="lg"
          variant="outline"
          nativeButton={false}
          render={<a href="/api/health" />}
        >
          Check API health
        </Button>
      </div>
    </main>
  );
}
