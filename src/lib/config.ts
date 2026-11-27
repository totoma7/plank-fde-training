import "server-only";

// The only module that reads process.env (see AGENTS.md).
// Vercel sets these variables; local runs fall back to the defaults below.

export type DeploymentEnvironment = "production" | "preview" | "development";

function readEnvironment(value: string | undefined): DeploymentEnvironment {
  return value === "production" || value === "preview" ? value : "development";
}

export const config = {
  /** Vercel deployment environment; "development" when run locally. */
  environment: readEnvironment(process.env.VERCEL_ENV),
  /** First 7 characters of the deployed commit; "local" when run locally. */
  commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "local",
};
