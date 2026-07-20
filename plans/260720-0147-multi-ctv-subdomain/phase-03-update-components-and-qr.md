# Phase 03 — Update Consumers & QR Asset Convention

## Context Links
- Depends on Phase 1 (`getCtvConfig`) + Phase 2 (`useCtv`, provider).
- Grep-verified current usage table below.

## Overview
- **Priority:** P1
- **Status:** done
- Replace direct `ZALO_GROUP_LINK` / `ZALO_PERSONAL_LINK` / hardcoded QR imports with
  CTV-resolved values across 10 files. Establish per-CTV QR path convention.

## Key Insights (verified current usage)
| File | Type | Uses | Access path |
|------|------|------|-------------|
| `header.tsx` | client | group (×2) | `useCtv()` |
| `sticky-cta.tsx` | client | group | `useCtv()` |
| `floating-buttons.tsx` | client | group + personal | `useCtv()` |
| `faq.tsx` | client | group (via FAQ_ITEMS link) | `useCtv()` |
| `cam-nang/phuot-guide.tsx` | client | group (×2) | `useCtv()` |
| `footer.tsx` | server | group | `getCtvConfig()` (async) |
| `hero.tsx` | server | group (×2) + QR | `getCtvConfig()` (async) |
| `cta-final.tsx` | server | group + QR | `getCtvConfig()` (async) |
| `promotion.tsx` | server | group (via linkifyText) | `getCtvConfig()` (async) |
| `how-it-works.tsx` | server | group (×2, linkifyText) | `getCtvConfig()` (async) |

- Only `floating-buttons.tsx` needs the personal link.
- QR (`/qr-code.jpg`) rendered in `hero.tsx` + `cta-final.tsx` → swap to `ctv.qrImage`.
- `faq.tsx` embeds the link through `FAQ_ITEMS[].link.href` (constants). Do NOT mutate the
  constant per-request; instead in faq.tsx, when rendering an item whose `link.text` is
  the group-link item, substitute `href = zaloGroupLink` from `useCtv()`.

## Requirements
- All CTV-personalized values resolve at render from context/server helper.
- Default host output unchanged (same links/QR as today).

## Files to Modify
Client (add/keep `"use client"`, call `useCtv()` at top of component body):
`header.tsx`, `sticky-cta.tsx`, `floating-buttons.tsx`, `faq.tsx`, `cam-nang/phuot-guide.tsx`.

Server (make component `async`, `const ctv = await getCtvConfig();` at top):
`footer.tsx`, `hero.tsx`, `cta-final.tsx`, `promotion.tsx`, `how-it-works.tsx`.

## Files to Create
- `public/images/ctv/.gitkeep` — anchors the per-CTV QR directory convention.

## Implementation Steps
1. **Client components:**
   - Remove `ZALO_GROUP_LINK` / `ZALO_PERSONAL_LINK` from the constants import (keep other
     named imports like `NAV_ITEMS`, `HOW_IT_WORKS_STEPS`, `FAQ_ITEMS`).
   - Add `import { useCtv } from "@/lib/ctv-context";`
   - Inside component: `const { zaloGroupLink, zaloPersonalLink } = useCtv();`
   - Replace `ZALO_GROUP_LINK` → `zaloGroupLink`, `ZALO_PERSONAL_LINK` → `zaloPersonalLink`.
   - `hero.tsx`/`sticky-cta.tsx` build link arrays at module scope referencing the const —
     move that array construction inside the component (or map at render) so it reads context.
2. **`faq.tsx`:** at render, for the item carrying a `link`, compute
   `href = item.link.text.includes("Zalo") ? zaloGroupLink : item.link.href`. Keep KISS.
3. **Server components:**
   - Remove the constants import for the links; add `import { getCtvConfig } from "@/lib/ctv-server";`
   - Convert `export function X(` → `export async function X(`; first line: `const { zaloGroupLink, qrImage } = await getCtvConfig();`
   - `hero.tsx` + `cta-final.tsx`: replace `src="/qr-code.jpg"` → `src={qrImage}`.
   - Verify parent (`page.tsx`) renders these as `<Hero />` etc. — async server children render fine; no change needed unless a component is used inside a client boundary (none of these are).
4. **QR convention:** new CTV QR lives at `public/images/ctv/{slug}/qr.jpg`; config `qrImage`
   points there, else `DEFAULT_QR` (`/qr-code.jpg`). Documented in Phase 4 runbook.
5. Run `npm run lint` + `npm run build`.

## Todo List
- [x] Update 5 client components → `useCtv()`
- [x] Update `faq.tsx` group-link substitution
- [x] Convert 5 server components → async + `getCtvConfig()`
- [x] Swap QR `src` in hero + cta-final to `qrImage`
- [x] Add `public/images/ctv/.gitkeep`
- [x] lint + build clean

**Dynamic rendering deviation (required post-phase):**
All blog routes (`src/app/blogs/page.tsx`, `src/app/blogs/phuot-ha-noi-da-nang/page.tsx`,
`src/app/blogs/[slug]/page.tsx`) also marked with `export const dynamic = "force-dynamic"`.
Initially had `generateStaticParams`, which caused them to bake in DEFAULT_CTV at build
time regardless of request Host header. Removed `generateStaticParams` from `[slug]/page.tsx`
and made all routes explicitly dynamic — matches layout's `force-dynamic`. Small marketing
site; acceptable per phase-04 risk assessment (YAGNI static blog optimization).

## Success Criteria
- Default host: identical links/QR to pre-change (visual + DOM diff).
- Seeded CTV host: shows CTV group link everywhere, personal link in floating-buttons,
  CTV QR in hero + cta-final.
- No component still imports `ZALO_GROUP_LINK`/`ZALO_PERSONAL_LINK` except `constants.ts`
  itself (grep to confirm).

## Risk Assessment
- **Module-scope const arrays** (hero CTA list) capturing old constant → move into render.
- **Async server component parents:** ensure no server comp is imported into a client
  component (would break `await`). Verified: all 5 render from server `page.tsx`.
- **faq coupling to constants** — substitution keeps constant untouched; low risk.

## Security Considerations
- None new; values remain public marketing links.

## Next Steps
- Phase 4: runbook, docs sync, local testing.
