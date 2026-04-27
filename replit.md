# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

**App**: Big Bucks Innovation Pvt Ltd — enterprise-grade AI, networking, and business solutions, pre-incubated at IIT Delhi.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- `artifacts/big-bucks-innovation` — React + Vite frontend. Public site (home, about, products, careers, contact, offices) + authenticated dashboard (leads, clients, projects, tasks, reports, settings). Uses TanStack Router.
- `artifacts/api-server` — Express backend. Auth routes at `/api/auth/` (session, logout, me). Firebase Admin SDK for token verification.

## Authentication

Firebase Auth (Google + Email/Password). Frontend uses `src/lib/firebase.ts` (client SDK). Backend uses Firebase Admin SDK in `artifacts/api-server/src/lib/firebase-admin.ts`.

Required secrets:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID` (optional)
- `FIREBASE_PROJECT_ID` (backend)
- `FIREBASE_CLIENT_EMAIL` (backend)
- `FIREBASE_PRIVATE_KEY` (backend)
- `JWT_SECRET` (backend session signing)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
