import type { MetadataRoute } from "next";

import { config } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  // Only production should be indexed; preview and local builds turn
  // crawlers away entirely.
  if (config.environment !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" } };
}
