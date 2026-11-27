# AGENTS.md

Instructions for coding agents (and humans) working in this repository.

## Project

`plank-fde-training` is the single repository for Plank's AI FDE course. Day 1
scaffolded it; every later day adds to WorkBot, an enterprise workflow
platform. Today it is one Next.js app at the repo root; from Week 6 it moves
into a monorepo.

Stack: Next.js 16 (App Router, Turbopack, `cacheComponents` on), React 19,
TypeScript (strict), Tailwind CSS v4, shadcn/ui (`base-nova` style on Base UI,
lucide icons), pnpm 10. CI runs on Node 24.

## Commands

Use pnpm only.

| Command                             | Purpose                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `pnpm install`                      | Install dependencies                                                         |
| `pnpm dev`                          | Dev server on http://localhost:3000                                          |
| `pnpm build` / `pnpm start`         | Production build / serve it                                                  |
| `pnpm lint`                         | ESLint (Next.js core-web-vitals + TypeScript rules)                          |
| `pnpm format` / `pnpm format:check` | Prettier write / check                                                       |
| `pnpm typecheck`                    | `next typegen && tsc --noEmit`                                               |
| `pnpm check`                        | lint, format:check, typecheck, build; CI runs this on push and PRs to `main` |
| `pnpm dlx shadcn@latest add <name>` | Add a shadcn/ui component, then run `pnpm format`                            |

## Rules for every change

### 1. Put files where they belong

- `src/app/`: routes only (`page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`,
  `error.tsx`). Keep them thin and move logic out.
- `src/components/`: shared React components. `src/components/ui/` is
  shadcn/ui output; change it only to customize a primitive.
- `src/lib/`: non-UI code such as helpers, data access, API clients, `config.ts`.
- `public/`: static files served as-is.
- Import through the `@/` alias (`@/components/ui/button`), not `../../`.

### 2. Server Components by default

Every component is a Server Component unless it opts out. Server Components
render on the server and send no JavaScript to the browser, so they can read
data and secrets directly.

- Add `"use client"` only when a component needs state, effects, event
  handlers, or browser APIs. Put it on the smallest leaf that needs them, not
  on a page or layout.
- Fetch data in the Server Component and pass plain, serializable props down.
- Everything a Client Component imports ships to the browser.

### 3. Read `process.env` in one module only

- `src/lib/config.ts` is the only file that reads `process.env`; everything
  else imports typed values from its `config` object. Give each variable a
  local default or fail loudly when it is required.
- It starts with `import "server-only"`, so importing it from a Client
  Component fails the build. Client Components receive values as props.
- List every variable with a placeholder in `.env.example` (committed). Real
  values go in `.env.local` (gitignored).
- `NEXT_PUBLIC_*` values are inlined into the browser bundle at build time.
  Never put a secret in one.

### 4. Finish every change

- Ship each change as its own pull request through the loop in
  `docs/pr-loop.md`.
- `pnpm check` passes before you push; CI runs the same command.
- Format with `pnpm format` instead of by hand.
- Keep commits small and messages honest: the course verification reads them.
- Read the guide for a Next.js API before using it (see below).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
