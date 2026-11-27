import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pt-16 pb-24 sm:px-6 sm:pt-28">
      <p className="text-sm font-medium text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-4 max-w-[60ch] text-muted-foreground">
        The address may be mistyped, or the page may have moved.
      </p>
      <Button
        className="mt-8"
        size="lg"
        nativeButton={false}
        render={<Link href="/" />}
      >
        Go to the home page
      </Button>
    </main>
  );
}
