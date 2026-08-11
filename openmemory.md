# notebooklm

## Overview

Turborepo monorepo with Next.js apps (`web`, `docs`), Express server (`server`), and shared packages.

## User Defined Namespaces

- frontend
- backend

## Architecture

- **apps/web** — Primary Next.js app (port 3000), shadcn CLI entry point
- **apps/docs** — Secondary Next.js app (port 3001)
- **apps/server** — Express API on Node
- **packages/ui** — Shared shadcn/ui component library (`@repo/ui`)
- **packages/typescript-config** — Shared TS configs (`base`, `nextjs`, `node`, `react-library`)
- **packages/eslint-config** — Shared ESLint configs

## Components

### @repo/ui (`packages/ui`)

Shared shadcn/ui design system for the monorepo.

- **Preset:** `b6sUj34d9` → `base-maia` style, olive base color, pointer cursor
- **Components:** `src/components/` (button, card, …)
- **Utils:** `src/lib/utils.ts` (`cn()`)
- **Theme CSS:** `src/styles/globals.css` (CSS variables + base layer)
- **Config:** `components.json` — CLI target for primitives

### apps/web shadcn integration

- Run `shadcn add` from `apps/web` (or `-c apps/web` from root)
- Primitives install to `packages/ui`, blocks to `apps/web/components`
- `apps/web/app/globals.css` imports Tailwind + `@repo/ui/globals.css`

### apps/web auth flow (Better Auth, Google)

Cross-origin: Next.js on `:3000`, Express+Better Auth on `:8080`.

- **Client:** `apps/web/lib/auth-client.ts` — `createAuthClient` from `better-auth/react`, `baseURL` from `NEXT_PUBLIC_API_URL`, `fetchOptions.credentials: "include"`
- **Env:** `apps/web/.env.local` → `NEXT_PUBLIC_API_URL=http://localhost:8080`
- **Login:** `apps/web/app/login/page.tsx` — split-screen, `signIn.social({ provider: "google", callbackURL: window.location.origin + redirect })` (absolute callbackURL so Better Auth redirects back to `:3000`, not the server)
- **Route guard:** client-side via `apps/web/components/auth-guard.tsx` using `useSession()` (proxy/middleware can't read cross-origin cookies reliably)
- **Protected routes:** `apps/web/app/(protected)/` route group — `layout.tsx` wraps children in `AuthGuard` + header (user menu, theme toggle)
- **User menu:** `apps/web/components/user-menu.tsx` — avatar dropdown with `signOut()`
- **Server `trustedOrigins`:** `apps/server/src/lib/auth.ts` uses `CORS_ORIGIN` env (defaults to `http://localhost:3000`) so the client origin is trusted

## Patterns

- shadcn monorepo: two `components.json` files (app + ui package), same style/baseColor
- Import shared components: `import { Button } from "@repo/ui/components/button"`
- No Next.js in `packages/ui` — only React + shadcn runtime deps
- Express `Request` augmentation: declare module `"express-serve-static-core"`; keep `@types/express-serve-static-core` as a direct server devDependency so the module resolves under Bun workspaces
- Express `asyncHandler`: typed as `Promise<unknown>` so controllers may `return res.status(...).json(...)` (return value is discarded; errors still go to `next`)
- Next.js 16.3 uses `proxy.ts` (not `middleware.ts`) for route middleware; for cross-origin auth, prefer client-side `useSession` gating over proxy cookie checks
- Better Auth social `callbackURL` must be absolute (`window.location.origin + path`) when client and server are on different ports
