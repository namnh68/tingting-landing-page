# Domain-Based Content Solution

**Date:** 2026-06-04  
**Stack:** Next.js 15 App Router · Vercel multi-domain

## Problem

Single Vercel deployment with multiple domains — need to serve different QR images and Zalo group links per domain.

## Solution: Server Component Host Detection

Read the `host` request header in Next.js Server Components. No middleware, no extra infrastructure.

### File Structure

```
src/lib/domain-config.ts       ← domain → config map
src/app/page.tsx               ← reads host, passes config down
public/qr/
  ├── default-qr.png
  ├── domain-a-qr.png
  └── domain-b-qr.png
```

### Implementation

**`src/lib/domain-config.ts`**
```ts
type DomainConfig = {
  zaloGroupLink: string;
  zaloQrImage: string;
  brandName?: string;
};

const DOMAIN_CONFIGS: Record<string, DomainConfig> = {
  "domain-a.com": {
    zaloGroupLink: "https://zalo.me/g/xxxxx",
    zaloQrImage: "/qr/domain-a-qr.png",
  },
  "domain-b.com": {
    zaloGroupLink: "https://zalo.me/g/yyyyy",
    zaloQrImage: "/qr/domain-b-qr.png",
  },
};

const DEFAULT_CONFIG: DomainConfig = {
  zaloGroupLink: "https://zalo.me/g/default",
  zaloQrImage: "/qr/default-qr.png",
};

export function getDomainConfig(host: string): DomainConfig {
  const domain = host.split(":")[0]; // strip port for local dev
  return DOMAIN_CONFIGS[domain] ?? DEFAULT_CONFIG;
}
```

**`src/app/page.tsx`** (Server Component)
```tsx
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";

export default async function Page() {
  const host = (await headers()).get("host") ?? "";
  const config = getDomainConfig(host);

  return <HomePage config={config} />;
}
```

## How Vercel Handles It

- Each domain added to the Vercel project routes to the same deployment
- Vercel forwards the original `Host` header — `headers()` returns the accessed domain
- No environment variables or edge config needed

## Adding a New Domain

1. Add domain to Vercel project dashboard
2. Add entry to `DOMAIN_CONFIGS` in `src/lib/domain-config.ts`
3. Add QR image to `public/qr/`
4. Deploy

## Notes

- `DEFAULT_CONFIG` handles `localhost` and unknown domains gracefully
- `headers()` is async in Next.js 15 — must `await` it
- Works in Server Components and Route Handlers, not Client Components
