# Fix TypeScript Routing Errors in bbi-client

## Steps
- [x] Remove `createFileRoute` and related unused imports from `src/routes/about.tsx`
- [x] Remove `createFileRoute`, `redirect`, and related unused imports from `src/routes/dashboard/index.tsx`
- [x] Remove `createFileRoute`, `redirect`, `useAuthStore` and related unused imports from `src/routes/index.tsx`
- [x] Remove `createFileRoute` and related unused imports from `src/routes/login.tsx`
- [x] Remove `createFileRoute` and related unused imports from `src/routes/offices.tsx`
- [x] Run `pnpm typecheck` to verify errors are resolved
- [x] Run `pnpm build` to verify full build passes


