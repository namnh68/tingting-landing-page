# Phase 01 — Config, Server Helper & Middleware

## Context Links
- Brainstorm: `plans/reports/brainstorm-260720-0147-multi-ctv-subdomain.md`
- Current values: `src/lib/constants.ts` (ZALO_GROUP_LINK, ZALO_PERSONAL_LINK)

## Overview
- **Priority:** P1 (foundation for all later phases)
- **Status:** done
- Build the static hostname→CTV map, resolution logic, a server-side accessor, and
  the middleware that forwards the resolved id + pathname to downstream rendering.

## Key Insights
- No `output: "export"` → middleware + `headers()` are supported on Vercel. Verified.
- Unmatched host MUST fall back to default (never 404/crash) — resolution is pure.
- Middleware runs per-request: matcher must exclude static/asset/meta routes.

## Requirements
- Functional: given a Host header, resolve `{ zaloGroupLink, zaloPersonalLink, qrImage }`.
- Non-functional: O(1) map lookup, no external calls, no crash on unknown host.

## Architecture / Data Flow
```
Request Host (strip :port, lowercase)
   → resolveCtvConfig(host)  → CtvConfig (or DEFAULT_CTV)
middleware sets request headers:  x-ctv-id = matched key | "default"
                                  x-ctv-path = nextUrl.pathname
   → NextResponse.next({ request: { headers } })
```

## Files to Create
1. `src/lib/ctv-config.ts` (<120 lines)
2. `src/lib/ctv-server.ts` (<40 lines)
3. `src/middleware.ts` (<50 lines)

## Implementation Steps

### 1. `src/lib/ctv-config.ts`
- Import `ZALO_GROUP_LINK`, `ZALO_PERSONAL_LINK` from `./constants`.
- Export constants:
  - `export const CTV_ID_HEADER = "x-ctv-id";`
  - `export const CTV_PATH_HEADER = "x-ctv-path";`
  - `export const DEFAULT_HOST = "vnting.com";`
  - `export const DEFAULT_QR = "/qr-code.jpg";`
- Define `export interface CtvConfig { zaloGroupLink: string; zaloPersonalLink: string; qrImage: string; }`
- `export const DEFAULT_CTV: CtvConfig = { zaloGroupLink: ZALO_GROUP_LINK, zaloPersonalLink: ZALO_PERSONAL_LINK, qrImage: DEFAULT_QR };`
- `export const CTV_MAP: Record<string, CtvConfig> = { /* key = full hostname */ };`
  - Seed with one commented example entry (e.g. `"ainguyen.vnting.com"`) showing shape
    incl. `qrImage: "/images/ctv/ainguyen/qr.jpg"`. Keep example commented so build is clean.
- `normalizeHost(host)`: lowercase, strip port (`host.split(":")[0]`), strip leading `www.`.
- `export function resolveCtvConfig(host?: string | null): CtvConfig`:
  - if no host → `DEFAULT_CTV`; else lookup `CTV_MAP[normalizeHost(host)] ?? DEFAULT_CTV`.
- `export function resolveCtvId(host?: string | null): string`:
  - returns matched key or `"default"` (used by middleware to forward a short id).
- `export function getConfigById(id: string): CtvConfig`:
  - `id === "default"` → `DEFAULT_CTV`; else `CTV_MAP[id] ?? DEFAULT_CTV`.
- `export function isDefaultHost(host?: string | null): boolean`:
  - true if normalized host is empty, `DEFAULT_HOST`, or not present in `CTV_MAP`.

### 2. `src/lib/ctv-server.ts`
- `import { headers } from "next/headers";`
- `import { getConfigById, isDefaultHost, CTV_ID_HEADER, CTV_PATH_HEADER, DEFAULT_HOST } from "./ctv-config";`
- `export async function getCtvConfig(): Promise<CtvConfig>`:
  - `const h = await headers(); return getConfigById(h.get(CTV_ID_HEADER) ?? "default");`
- `export async function getCtvMeta(): Promise<{ isDefault: boolean; path: string }>`:
  - read `x-ctv-id` + `x-ctv-path`; `isDefault = id === "default"`; `path = h.get(CTV_PATH_HEADER) ?? "/"`.
  - (Used by layout `generateMetadata` in Phase 2.)

### 3. `src/middleware.ts`
- `import { NextResponse, type NextRequest } from "next/server";`
- `import { resolveCtvId, CTV_ID_HEADER, CTV_PATH_HEADER } from "@/lib/ctv-config";`
- `export function middleware(req: NextRequest)`:
  - `const host = req.headers.get("host");`
  - Dev-only override: if `process.env.NODE_ENV === "development"`, allow `?ctv=<key>`
    query param to force an id (browser testing without /etc/hosts). Guard strictly.
  - `const id = devOverride ?? resolveCtvId(host);`
  - Clone headers: `const h = new Headers(req.headers); h.set(CTV_ID_HEADER, id); h.set(CTV_PATH_HEADER, req.nextUrl.pathname);`
  - `return NextResponse.next({ request: { headers: h } });`
- `export const config = { matcher: [ "/((?!_next/|api/|images/|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)" ] };`
  - The `.*\\..*` clause excludes any path with a file extension (assets). Verify regex
    still matches `/`, `/blogs`, `/blogs/phuot-ha-noi-da-nang`.

## Todo List
- [x] Create `src/lib/ctv-config.ts` with types, map, resolvers, DEFAULT_CTV
- [x] Create `src/lib/ctv-server.ts` with getCtvConfig + getCtvMeta
- [x] Create `src/middleware.ts` with resolution, dev override, matcher
- [x] `npm run build` — no type/matcher errors; `/` and `/blogs/*` still render

**Note:** YAGNI-trimmed unused exports post-implementation (code review).
`resolveCtvConfig()`, `isDefaultHost()`, and `DEFAULT_HOST` const removed — only
`resolveCtvId()` + `getConfigById()` are in actual runtime path.

## Success Criteria
- `curl -s -H "Host: vnting.com" localhost:3000` → default links.
- Unknown host (`Host: typo.vnting.com`) → default links, HTTP 200 (no 404).
- With a seeded CTV_MAP entry, that host → its links (verified in Phase 4).

## Risk Assessment
- **Matcher too broad** → middleware on assets = overhead. Mitigate: extension-exclude
  clause + explicit `_next/`, `images/`. Validate build output.
- **Bad regex** could 404 real routes. Mitigate: test `/`, `/blogs`, deep blog slug.

## Security Considerations
- Host header is client-controllable — only used to pick from a fixed allowlist map;
  unknown → default. No dynamic fetch, no injection surface.

## Next Steps
- Phase 2 consumes `getCtvConfig` (server) and provides client context.
