# Fix ClientsTable Import Error & Related Issues

## Steps (6/6 completed)

### 1. ✅ Fix import in ClientsTable.tsx
- Verified: Already correct (`from "@/types"`)
- Edit `src/client/src/components/crm/ClientsTable.tsx`: Change ClientStatus import from `useClients.ts` → `@/types`

### 2. ✅ Update Client type definition
- Aligned with backend: Added `company_name`, `contact_name`, `created_at: bigint`
- Edit `src/client/src/types/index.ts`: Align Client interface with backend response (company_name, contact_name, created_at: bigint)

### 3. ✅ Fix CSP warning in index.html
- Removed ignored `frame-ancestors 'none';` from meta
- Edit `src/client/index.html`: Remove ignored `frame-ancestors` from meta CSP

### 4. ✅ (Optional) Add proper CSP headers
- Added Vite server.headers() with frame-ancestors
- Edit `src/client/vite.config.js`: Configure server.headers() for CSP

### 5. ✅ Restart dev server & test
- Run: `cd src/client && pnpm dev`
- Expected: No SyntaxError for ClientStatus import, ClientsTable renders with data, no CSP 'frame-ancestors' meta warning in console

### 6. ✅ Final validation
- Import error fixed by correct path + type alignment
- CSP warning fixed by removing invalid meta directive + proper headers
- Client type now matches backend/table usage

**Progress: Wait for step-by-step confirmation after each edit.**

