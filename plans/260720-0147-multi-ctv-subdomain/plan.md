---
title: "Multi-CTV Subdomain Landing Pages"
description: "Per-CTV Zalo group/personal link + QR by hostname via static config, middleware, and context — root domain unchanged."
status: done
priority: P2
effort: 5h
branch: main
tags: [multi-tenant, middleware, seo, nextjs]
created: 2026-07-20
---

# Multi-CTV Subdomain Landing Pages

Serve CTV-personalized Zalo group link, Zalo personal link, and QR image based on
request hostname (e.g. `ainguyen.vnting.com` or a CTV custom domain). All other
content identical. Root domain (`vnting.com`) + unknown hosts fall back to current
default values. No DB — static config file. Scale <20 CTVs (YAGNI).

## Architecture (decided — see brainstorm report)
Host header → `middleware.ts` resolves `ctv-config` → forwards `x-ctv-id` +
`x-ctv-path` → server components read via `getCtvConfig()` (headers()), client
components read via `useCtv()` context provided by root layout. Metadata sets
`noindex` + canonical→`vnting.com` for non-default hosts.

## Key repo facts (verified)
- No `output: "export"` in `next.config.ts` → middleware/`headers()` valid on server-rendered Next.js.
- **Deploy target: Cloudflare Workers via OpenNext** (not Vercel as originally assumed).
  See package.json `deploy`/`preview` scripts using `@opennextjs/cloudflare` + wrangler.jsonc.
  Middleware/`headers()` remain valid; only platform reference was stale.
- QR asset path in use: `/qr-code.jpg` (hero.tsx, cta-final.tsx).
- Consumers: **client** = header, sticky-cta, floating-buttons, phuot-guide, faq;
  **server** = footer, hero, cta-final, promotion, how-it-works. (10 files, faq incl.)
- Only `floating-buttons.tsx` uses the personal link. QR used in hero + cta-final.

## Phases
| # | File | Focus | Status |
|---|------|-------|--------|
| 1 | phase-01-config-and-middleware.md | ctv-config, server helper, middleware | done |
| 2 | phase-02-context-layout-metadata.md | CtvProvider/useCtv, layout wiring, SEO metadata | done |
| 3 | phase-03-update-components-and-qr.md | Update 10 consumers, QR asset convention | done |
| 4 | phase-04-docs-runbook-and-testing.md | Ops runbook, docs sync, local test method | done |

## Files created
- `src/lib/ctv-config.ts` — types, CTV_MAP, DEFAULT_CTV, resolveCtvId(), getConfigById()
- `src/lib/ctv-server.ts` — async `getCtvConfig()` / `getCtvMeta()` (reads headers())
- `src/lib/ctv-context.tsx` — "use client" CtvProvider + useCtv()
- `src/middleware.ts` — host→config resolution + header forwarding + matcher
- `public/images/ctv/.gitkeep` — per-CTV QR dir convention

## Files modified
- `src/app/layout.tsx` — generateMetadata (SEO), wrap children in CtvProvider
- `src/components/{header,sticky-cta,floating-buttons,faq}.tsx` — useCtv()
- `src/components/cam-nang/phuot-guide.tsx` — useCtv()
- `src/components/{footer,hero,cta-final,promotion,how-it-works}.tsx` — getCtvConfig()
- `docs/system-architecture.md`, `docs/project-changelog.md` — post-impl docs sync

## Dependencies / order
Phase 1 → Phase 2 (context+layout depend on config/server helper) → Phase 3
(components depend on both access paths) → Phase 4 (docs/test after code lands).

## Key decisions
- Dual access path (server helper + client context) to avoid converting 5 server
  components to client (bundle cost) — both are thin wrappers over `getConfigById`.
- `faq.tsx` added as a real 10th consumer (renders group link via FAQ_ITEMS).
- Manual domain add (custom subdomain or CNAME) is a runbook step, NOT code.
- YAGNI: removed unused exports from Phase 1 (`resolveCtvConfig`, `isDefaultHost`, `DEFAULT_HOST`)
  during code review — only `resolveCtvId` + `getConfigById` used in runtime path.
- Phase 2–3 required `export const dynamic = "force-dynamic"` on root layout + all blog routes
  to ensure per-request rendering (not cached at build time). Fix applied post-phase docs.

## Implementation Summary
- **Phases 1–4:** Complete. All code created/modified per spec, docs synced. Code-reviewed,
  lint/build clean, verified live on Cloudflare Workers preview (real deploy target).
- **Critical deviation fixed:** All routes now `force-dynamic` to ensure per-request rendering
  (required for host-based personalization). See phase-02 + phase-03 notes.
- **Deployment target clarified:** Cloudflare Workers / OpenNext, not Vercel (stale assumption corrected in plan).

## Unresolved questions
See phase-04 "Unresolved Questions" section — FAQ link scope and blog `noindex` resolved
during implementation. Still open (operational, non-code):
- QR image intake process
- Custom-domain `www` handling
- External CTV domain on a different Cloudflare account/registrar
