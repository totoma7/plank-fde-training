import { connection } from "next/server";

import { config } from "@/lib/config";

export async function GET() {
  // Opt out of build-time prerendering: a 200 should mean a live server
  // answered this request, not that a cached file exists.
  await connection();

  return Response.json({ status: "ok", commit: config.commit });
}
