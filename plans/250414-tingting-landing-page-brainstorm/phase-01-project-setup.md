# Phase 1: Project Setup

## Context Links
- [Brainstorm Summary](./brainstorm-summary.md)
- [Plan Overview](./plan.md)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)

## Overview
- **Priority:** P1 (Critical)
- **Status:** Complete
- **Effort:** 1h
- **Description:** Initialize Next.js 15 project with App Router, install all dependencies, configure Tailwind CSS v4 with PostCSS, and set up TypeScript.

## Key Insights
- Next.js 15 uses App Router by default with `create-next-app`
- Tailwind CSS v4 uses CSS-first configuration (`@import "tailwindcss"` in CSS, no `tailwind.config.ts`)
- Tailwind v4 requires `@tailwindcss/postcss` plugin instead of the old `tailwindcss` PostCSS plugin
- `create-next-app` with `--tailwind` flag may scaffold Tailwind v3 config — must verify and upgrade if needed

## Requirements

### Functional
- Next.js 15 project with App Router and `src/` directory
- TypeScript strict mode
- Tailwind CSS v4 with PostCSS integration
- All dependencies installed and importable

### Non-functional
- Clean project structure matching the agreed layout
- No unused boilerplate from create-next-app
- ESLint configured

## Architecture

```
Project Init Flow:
  create-next-app → clean boilerplate → install deps → configure Tailwind v4 → verify build
```

## Related Code Files

### Files to Create
- `package.json` (via create-next-app, then modify)
- `postcss.config.mjs`
- `next.config.ts`
- `tsconfig.json`
- `src/app/globals.css` (Tailwind v4 setup)
- `src/app/layout.tsx` (skeleton)
- `src/app/page.tsx` (skeleton)
- `src/lib/constants.ts` (empty scaffold)
- `public/images/` (directory)

### Files to Delete (boilerplate cleanup)
- Any default Next.js SVG assets not needed
- Default page content

## Implementation Steps

### Step 1: Create Next.js 15 Project

```bash
npx create-next-app@latest tingting-landingpage \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack
```

Since the git repo already exists, run from inside the project directory or move files after creation.

**Alternative (if project dir already exists):**
```bash
cd /path/to/tingting-landingpage
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --turbopack
```

### Step 2: Install Additional Dependencies

```bash
npm install framer-motion next-themes react-icons
```

### Step 3: Configure Tailwind CSS v4

**IMPORTANT:** Tailwind v4 uses CSS-first configuration. No `tailwind.config.ts` needed.

Check if `create-next-app` generated a Tailwind v3 or v4 config. If v3:

```bash
# Remove old config if present
rm tailwind.config.ts

# Install Tailwind v4 PostCSS plugin
npm install -D tailwindcss @tailwindcss/postcss
```

Create `postcss.config.mjs`:
```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

### Step 4: Setup globals.css with Tailwind v4

Replace `src/app/globals.css` with:
```css
@import "tailwindcss";

/* Custom theme tokens defined in Phase 2 */
```

### Step 5: Clean Boilerplate

Remove default Next.js page content. Set `src/app/page.tsx` to:
```tsx
export default function Home() {
  return (
    <main>
      <h1>Ting Ting Landing Page</h1>
    </main>
  );
}
```

Strip default `layout.tsx` to minimal:
```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ting Ting - San deal hoi - Hoan hoa hong",
  description: "Mua sam thong minh - Hoan tien len den 80%",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
```

### Step 6: Create Directory Structure

```bash
mkdir -p src/components src/hooks src/lib public/images
```

### Step 7: Create Scaffold Files

`src/lib/constants.ts`:
```ts
// Content constants — populated in Phase 3-5
export const ZALO_GROUP_LINK = "https://zalo.me/g/YOUR_GROUP_ID";

export const STATS = {
  members: 100,
  orders: 300,
  refunded: 5000000,
} as const;
```

### Step 8: Verify Build

```bash
npm run build
npm run dev
```

Confirm:
- Dev server starts on localhost:3000
- No TypeScript errors
- Tailwind classes apply correctly
- No console errors

## Todo List

- [x] Initialize Next.js 15 project with App Router
- [x] Install framer-motion, next-themes, react-icons
- [x] Configure Tailwind CSS v4 (CSS-first, postcss.config.mjs)
- [x] Clean boilerplate (remove default SVGs, page content)
- [x] Create directory structure (components, hooks, lib, public/images)
- [x] Create constants.ts scaffold
- [x] Verify build compiles successfully
- [x] Verify dev server runs without errors

## Success Criteria

- `npm run build` completes with zero errors
- `npm run dev` serves page at localhost:3000
- Tailwind utility classes render correctly (test with a `bg-red-500` class)
- TypeScript strict mode enabled, no type errors
- All dependencies in package.json and importable

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| create-next-app scaffolds Tailwind v3 | Medium | Low | Check config, upgrade manually if needed |
| Dependency version conflicts | Low | Medium | Pin versions, use `--legacy-peer-deps` if needed |
| PostCSS config mismatch | Low | Medium | Use `@tailwindcss/postcss` plugin, not `tailwindcss` |

## Next Steps
- Phase 2: Layout & Theme System
