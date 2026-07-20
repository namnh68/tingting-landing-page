# Phase 04 — Ops Runbook, Docs Sync & Local Testing

## Context Links
- Depends on Phases 1–3 code landing.
- Docs to update: `docs/system-architecture.md`, `docs/project-changelog.md`.

## Overview
- **Priority:** P2
- **Status:** done
- Non-code phase: document how to add a CTV, sync repo docs, and define a concrete
  local test method for host-based routing.
- **Part C (local testing):** DONE — all three test methods executed and verified.
- **Parts A & B (runbook + docs sync):** DONE — `docs/system-architecture.md` "Multi-CTV
  Personalization" section + `docs/project-changelog.md` v0.2.0 entry added by docs-manager.

## Part A — Operational Runbook: add a new CTV
*(Synced to `docs/system-architecture.md` "Multi-CTV Personalization" section)*

Steps to onboard CTV `{slug}` (subdomain `{slug}.vnting.com`):
1. Obtain from CTV: Zalo group link, Zalo personal link, QR image (PNG/JPG).
2. Save QR → `public/images/ctv/{slug}/qr.jpg`.
3. Add entry to `CTV_MAP` in `src/lib/ctv-config.ts`, keyed by full hostname:
   ```ts
   "{slug}.vnting.com": {
     zaloGroupLink: "https://zalo.me/g/...",
     zaloPersonalLink: "https://zalo.me/...",
     qrImage: "/images/ctv/{slug}/qr.jpg", // or DEFAULT_QR if none yet
   },
   ```
4. Commit + push → Cloudflare Workers / OpenNext auto-deploys.
5. Configure DNS at authoritative provider → CNAME to Cloudflare Workers runtime endpoint.
6. Wait for propagation + SSL auto-provision (~minutes). Verify links + QR + `noindex`.

**CTV custom domain** (their own domain): same as steps 1–4, but the CTV configures the
CNAME on their DNS provider per Cloudflare's shown target. Key the `CTV_MAP` entry by their
full domain. Add both apex and `www` if needed.

**Deploy platform note:** This repo deploys to Cloudflare Workers via OpenNext (see
`package.json` `deploy`/`preview` scripts, `wrangler.jsonc`), not Vercel. Adjust DNS
step per actual Cloudflare Workers deployment target.

## Part B — Docs sync (per documentation-management rules)
*(DONE — see `docs/system-architecture.md` "Multi-CTV Personalization" section and
`docs/project-changelog.md` v0.2.0 entry.)*

## Part C — Local testing method
Middleware keys off the `Host` header. Three complementary methods:

1. **curl + Host header (primary, fastest):**
   ```bash
   npm run dev
   curl -s -H "Host: vnting.com"        localhost:3000 | grep -o 'zalo.me[^"]*' | head
   curl -s -H "Host: ainguyen.vnting.com" localhost:3000 | grep -o 'zalo.me[^"]*' | head
   curl -s -H "Host: typo.vnting.com"   -o /dev/null -w "%{http_code}\n" localhost:3000  # expect 200
   ```
   Seed a temporary `ainguyen.vnting.com` entry in `CTV_MAP` for the test.
2. **Dev query-param override (browser visual check):** middleware honors `?ctv={key}`
   only when `NODE_ENV === "development"` → open `localhost:3000/?ctv=ainguyen`.
3. **/etc/hosts alias (full end-to-end incl. metadata):**
   `127.0.0.1 ainguyen.vnting.com` then browse `http://ainguyen.vnting.com:3000` and
   view-source to confirm `robots noindex` + canonical.

Verification checklist:
- [x] Default host → default links + QR, `robots index,follow`.
- [x] CTV host → CTV links + QR, `robots noindex,follow`, canonical → vnting.com.
- [x] Unknown host → default links, HTTP 200 (no 404/crash).
- [x] Static assets (`/qr-code.jpg`, `/_next/...`) NOT processed by middleware.
- [x] `grep -rn "ZALO_GROUP_LINK\|ZALO_PERSONAL_LINK" src/components` → no hits (verified during Phase 3).

**Test methods executed:**
1. [x] curl + Host header (dev `next start` after build) — all variants pass.
2. [x] Dev query-param override (`?ctv=` in dev mode) — verified in browser.
3. [x] Cloudflare Workers preview runtime (`npm run preview`) — full end-to-end verified
        (most realistic deploy target for this repo).

## Todo List
- [x] Add runbook section to `docs/system-architecture.md` (Cloudflare Workers-correct)
- [x] Add changelog entry to `docs/project-changelog.md`
- [x] Run all three local test methods; complete verification checklist
- [x] Deleted temporary test CTV_MAP entry (verified clean before code review)

## Success Criteria
- Runbook reproducible by a non-author in <10 min per CTV.
- All verification checklist items pass locally.

## Risk Assessment
- **Middleware per-request cost:** matcher excludes assets/_next; work is a Map lookup +
  header set (µs). Negligible. Monitor Cloudflare Workers invocations if CTV count grows.
- **Dynamic rendering:** every route touching a CTV consumer requires explicit
  `export const dynamic = "force-dynamic"` (layout-level alone is NOT sufficient — see
  Phase 3 deviation note). For a small marketing site this is acceptable; Cloudflare
  still caches static assets at the edge. If TTFB regresses, revisit (YAGNI for now).
- **Typo'd / unmapped host** → `getConfigById`/`resolveCtvId` fall back to `DEFAULT_CTV`;
  never 404.

## Security Considerations
- Host header is untrusted but only indexes a fixed allowlist. No secrets in config/docs.

## Unresolved Questions
1. **FAQ link scope:** implemented as planned (CTV group link shown in FAQ answer). No
   pushback received — considered resolved unless product feedback says otherwise.
2. **Blog routes noindex:** RESOLVED — yes. Verified live: `/blogs`, `/blogs/[slug]`,
   `/blogs/phuot-ha-noi-da-nang` all inherit noindex+canonical from layout metadata on
   CTV hosts (confirmed via curl against Cloudflare Workers preview).
3. **QR intake:** who collects/validates each CTV's QR image before onboarding (process
   ownership, not code) — still open, flagged in brainstorm.
4. **Custom-domain www handling:** confirm whether CTV custom domains need both apex + www
   entries in `CTV_MAP` (depends on their DNS setup) — still open, operational not code.
5. **External CTV domain on a different Cloudflare account/registrar:** the runbook's
   Cloudflare Workers custom-domain flow assumes the domain lives in the same Cloudflare
   account. If a CTV's own domain is elsewhere, onboarding steps differ (their DNS → point
   to Cloudflare, then add to this Workers project) — needs operator confirmation when the
   first such case arises.
