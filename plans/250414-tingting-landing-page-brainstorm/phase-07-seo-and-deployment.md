# Phase 7: SEO, Metadata & Deployment

## Context Links
- [Plan Overview](./plan.md)
- [Phase 6: Animations & Polish](./phase-06-animations-and-polish.md)
- [Next.js Metadata docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Effort:** 0.5h
- **Description:** Configure comprehensive SEO metadata, Open Graph tags, structured data, generate favicon, and deploy to Vercel.

## Key Insights
- Next.js 15 App Router uses `metadata` export and `generateMetadata` for SEO
- Open Graph images crucial for Zalo/Facebook sharing (OG image)
- Vietnamese content needs `lang="vi"` (already set in layout)
- `output: "export"` in next.config.ts for full static export (SSG)
- Vercel auto-deploys from GitHub repo

## Requirements

### Functional
- Complete metadata: title, description, OG tags, Twitter cards
- Favicon and apple-touch-icon
- robots.txt and sitemap.xml
- Structured data (JSON-LD for Organization)

### Non-functional
- Lighthouse SEO score > 95
- OG image renders correctly on Zalo/Facebook share
- Page fully static (no server required)

## Related Code Files

### Files to Modify
- `src/app/layout.tsx` — Comprehensive metadata export
- `next.config.ts` — Static export configuration

### Files to Create
- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/og-image.png` (1200x630)
- `src/app/robots.ts`
- `src/app/sitemap.ts`

## Implementation Steps

### Step 1: Comprehensive Metadata

Update `src/app/layout.tsx` metadata:
```tsx
import type { Metadata } from "next";

const SITE_URL = "https://tingting.vercel.app"; // Update after deployment

export const metadata: Metadata = {
  title: "Ting Ting - San deal hoi - Hoan hoa hong | Hoan tien Shopee, TikTok Shop",
  description:
    "Tham gia nhom Zalo Ting Ting de nhan hoan tien len den 80% hoa hong khi mua sam tren Shopee va TikTok Shop. Mien phi, an toan, tu dong.",
  keywords: [
    "hoan tien shopee",
    "hoan tien tiktok shop",
    "hoa hong affiliate",
    "mua sam tiet kiem",
    "ting ting",
    "cashback vietnam",
    "nhom zalo hoan tien",
  ],
  authors: [{ name: "Ting Ting" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Ting Ting",
    title: "Ting Ting - Hoan tien len den 80% khi mua sam Shopee, TikTok",
    description:
      "Gui link san pham vao nhom Zalo, nhan hoan 80% hoa hong affiliate. Mien phi, tu dong, an toan.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ting Ting - San deal hoi - Hoan hoa hong",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ting Ting - Hoan tien len den 80%",
    description: "Nhom Zalo hoan tien Shopee & TikTok Shop. Mien phi 100%.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(SITE_URL),
};
```

### Step 2: Create robots.ts

`src/app/robots.ts`:
```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tingting.vercel.app/sitemap.xml",
  };
}
```

### Step 3: Create sitemap.ts

`src/app/sitemap.ts`:
```ts
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tingting.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
```

### Step 4: Configure next.config.ts

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

**Note:** `output: "export"` generates fully static HTML. `images.unoptimized: true` is required because the Next.js image optimization server won't be available.

Since `output: "export"` does not support `next/image` optimization, the `<Image>` components will render standard `<img>` tags. This is fine for a landing page with few images.

### Step 5: Create Asset Placeholders

Ensure these files exist in `public/`:
- `public/favicon.ico` — 32x32 favicon (use the orange brand color)
- `public/apple-touch-icon.png` — 180x180 for iOS
- `public/og-image.png` — 1200x630 for social sharing
- `public/qr-code.jpg` — Zalo group QR code

For now, create placeholder images. The actual assets should be designed/provided later.

### Step 6: Add Structured Data (JSON-LD)

Add to `src/app/layout.tsx` inside the `<head>` (or use Next.js metadata approach):

```tsx
// Inside RootLayout, before {children}:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Ting Ting",
      description: "Nhom Zalo hoan tien Shopee va TikTok Shop",
      url: "https://tingting.vercel.app",
    }),
  }}
/>
```

### Step 7: Deploy to Vercel

```bash
# Option 1: Connect GitHub repo (recommended)
# 1. Push code to GitHub
# 2. Go to vercel.com → Import project → Select repo
# 3. Vercel auto-detects Next.js, deploys

# Option 2: CLI deploy
npx vercel --prod
```

Vercel settings:
- Framework preset: Next.js
- Build command: `next build` (default)
- Output directory: `out` (for static export)
- Environment variables: none needed

### Step 8: Post-Deploy Verification

Checklist:
1. Page loads on Vercel URL
2. All sections render correctly
3. Dark/light mode works
4. QR code visible
5. All links work (especially Zalo group link)
6. Share URL on Zalo/Facebook — check OG image renders
7. Run Lighthouse audit (target > 90 all categories)
8. Test on real mobile device

## Todo List

- [x] Add comprehensive metadata to layout.tsx (title, description, OG, Twitter)
- [x] Create robots.ts
- [x] Create sitemap.ts
- [x] Configure next.config.ts with `output: "export"`
- [x] Create/add favicon, apple-touch-icon, og-image placeholders
- [x] Add JSON-LD structured data
- [x] Push to GitHub
- [x] Deploy to Vercel
- [x] Verify OG image renders on social share
- [x] Run Lighthouse audit and fix any issues

## Success Criteria

- Lighthouse SEO score > 95
- Lighthouse Performance score > 90
- OG image renders when URL shared on Zalo/Facebook
- robots.txt accessible at /robots.txt
- sitemap.xml accessible at /sitemap.xml
- Page fully functional on Vercel deployment
- No console errors in production

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Static export breaks dynamic features | Low | Medium | Landing page is fully static, no dynamic routes |
| OG image not rendering on Zalo | Medium | Medium | Test with multiple share debuggers |
| Vercel build failure | Low | Low | Test `npm run build` locally first |
| Missing assets (QR, favicon) | High | Low | Use placeholders, replace later |

## Security Considerations
- No API keys or secrets needed
- All content is public
- External links use `rel="noopener noreferrer"`
- No server-side code in production (fully static)

## Next Steps
- Replace placeholder assets with real images (QR code, OG image, favicon)
- Monitor analytics and conversion rates
- Iterate on content based on user feedback
