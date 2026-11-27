import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { config, type DeploymentEnvironment } from "@/lib/config";

export const metadata: Metadata = {
  title: "Settings",
};

const environmentBadge: Record<
  DeploymentEnvironment,
  "default" | "secondary" | "outline"
> = {
  production: "default",
  preview: "secondary",
  development: "outline",
};

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>

      <Card className="mt-6 max-w-2xl">
        <CardHeader>
          <CardTitle>Deployment</CardTitle>
          <CardDescription>
            The build that is serving this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Environment</dt>
            <dd>
              <Badge variant={environmentBadge[config.environment]}>
                {config.environment}
              </Badge>
            </dd>

            <dt className="text-muted-foreground">Commit</dt>
            <dd>
              <code className="font-mono">{config.commit}</code>
            </dd>
          </dl>
        </CardContent>
      </Card>
    </main>
  );
}
