# Phase 02 — Context Provider, Layout Wiring & SEO Metadata

## Context Links
- Depends on Phase 1 (`ctv-config.ts`, `ctv-server.ts`).
- Target file: `src/app/layout.tsx` (current: static `export const metadata`, Server Component).

## Overview
- **Priority:** P1
- **Status:** done
- Provide a client `useCtv()` hook, wire the resolved config into the root layout for
  client components, and add per-host SEO metadata (noindex + canonical) for CTV hosts.

## Key Insights
- Layout is a Server Component → can call `getCtvConfig()` and read `headers()`.
- Static `export const metadata` must become `export async function generateMetadata()`
  to branch on host. Existing metadata fields preserved; only `robots` + `alternates`
  change for non-default hosts.
- Provider value is plain serializable data → safe across the server/client boundary.

## Requirements
- Functional: client components get CTV config via `useCtv()`; CTV hosts emit
  `robots: { index:false, follow:true }` + `alternates.canonical: https://vnting.com{path}`.
- Non-functional: default host output byte-identical to today (no SEO regression).

## Architecture
```
layout (server)
 ├─ generateMetadata(): getCtvMeta() → if !isDefault → override robots+canonical
 └─ RootLayout(): getCtvConfig() → <CtvProvider value={config}>{children}</CtvProvider>
client components → useCtv() → context value
```

## Files to Create
1. `src/lib/ctv-context.tsx` (<40 lines)

## Files to Modify
1. `src/app/layout.tsx`

## Implementation Steps

### 1. `src/lib/ctv-context.tsx`
- `"use client";`
- `import { createContext, useContext } from "react";`
- `import { DEFAULT_CTV, type CtvConfig } from "./ctv-config";`
- `const CtvContext = createContext<CtvConfig>(DEFAULT_CTV);`
- `export function CtvProvider({ value, children }: { value: CtvConfig; children: React.ReactNode }) { return <CtvContext.Provider value={value}>{children}</CtvContext.Provider>; }`
- `export function useCtv(): CtvConfig { return useContext(CtvContext); }`
- Default value = `DEFAULT_CTV` so any accidental out-of-provider use is safe.

### 2. `src/app/layout.tsx`
- Add imports: `getCtvConfig`, `getCtvMeta` from `@/lib/ctv-server`; `CtvProvider` from `@/lib/ctv-context`.
- Replace `export const metadata: Metadata = {...}` with:
  - Keep the current object as `const baseMetadata: Metadata = {...}` (unchanged fields).
  - `export async function generateMetadata(): Promise<Metadata> {`
    - `const { isDefault, path } = await getCtvMeta();`
    - `if (isDefault) return baseMetadata;`
    - `return { ...baseMetadata, robots: { index: false, follow: true }, alternates: { canonical: \`${SITE_URL}${path}\` } };`
  - `}`
- Make `RootLayout` async: `const ctv = await getCtvConfig();`
- Wrap: `<ThemeProvider><CtvProvider value={ctv}>{children}</CtvProvider></ThemeProvider>`.
- Leave the existing Organization JSON-LD as-is (keeps `SITE_URL`, brand-level, fine on all hosts).

## Todo List
- [x] Create `src/lib/ctv-context.tsx` (provider + useCtv)
- [x] Refactor `layout.tsx` metadata → `generateMetadata` with host branch
- [x] Make `RootLayout` async, resolve config, wrap children in `CtvProvider`
- [x] `npm run build` passes; default host metadata unchanged (diff `robots`/`alternates`)

**Note:** Added `export const dynamic = "force-dynamic"` to `layout.tsx` — required to
ensure per-request rendering for host-based personalization (reading `headers()` alone
does not force dynamic rendering for routes that had `generateStaticParams`; child routes
would bake in DEFAULT_CTV at build time if not explicitly marked dynamic).

## Success Criteria
- Default host: `<meta name="robots" content="index, follow">`, no extra canonical override.
- CTV host: `robots noindex, follow` + `<link rel="canonical" href="https://vnting.com{path}">`.
- `useCtv()` returns correct config inside a client component on a CTV host.

## Risk Assessment
- **Blog pages own metadata** may override layout `robots`. Note: if any route exports
  its own `robots: index`, add the same noindex branch there OR accept layout-level only.
  Verify `src/app/blogs/**` metadata; flag if a per-route override exists (likely none).
- **Dynamic rendering:** `generateMetadata` + `getCtvConfig` read `headers()` → route
  becomes dynamic. Acceptable (host-based personalization requires it). See Phase 4 risk.

## Security Considerations
- Provider value contains only public links + image paths. No secrets.

## Next Steps
- Phase 3 switches the 10 consumers to `useCtv()` / `getCtvConfig()`.
