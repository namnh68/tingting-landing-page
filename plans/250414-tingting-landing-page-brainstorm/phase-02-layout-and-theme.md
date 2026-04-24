# Phase 2: Layout & Theme System

## Context Links
- [Plan Overview](./plan.md)
- [Phase 1: Project Setup](./phase-01-project-setup.md)
- [next-themes docs](https://github.com/pacocoursey/next-themes)
- [Google Fonts: Be Vietnam Pro](https://fonts.google.com/specimen/Be+Vietnam+Pro)

## Overview
- **Priority:** P1 (Critical)
- **Status:** Complete
- **Effort:** 2h
- **Description:** Set up root layout with Be Vietnam Pro font, implement dark/light theme system using next-themes, define Tailwind v4 custom theme tokens, and create global styles.

## Key Insights
- Tailwind v4 uses `@theme` directive in CSS to define custom design tokens (replaces `tailwind.config.ts` `theme.extend`)
- `next-themes` requires a `ThemeProvider` wrapping the app, set `attribute="class"` for Tailwind dark mode
- Next.js 15 `next/font` handles Google Fonts with zero layout shift
- `suppressHydrationWarning` required on `<html>` tag when using next-themes to avoid SSR mismatch

## Requirements

### Functional
- Dark/light mode toggle that persists across sessions (localStorage)
- Be Vietnam Pro font loaded via next/font/google
- Consistent color palette across both themes
- Smooth transition when switching themes

### Non-functional
- No flash of unstyled content (FOUC) on theme load
- Font loads with `swap` display strategy
- CSS custom properties for theme colors

## Architecture

```
Theme Flow:
  next-themes ThemeProvider (attribute="class")
    → <html class="dark"> or <html class="light">
    → Tailwind v4 dark: variant activates
    → CSS custom properties switch values

Font Flow:
  next/font/google (Be Vietnam Pro)
    → CSS variable --font-be-vietnam-pro
    → Applied to <body> via className
    → Tailwind @theme references the variable
```

## Related Code Files

### Files to Modify
- `src/app/layout.tsx` — Add font, ThemeProvider, html attributes
- `src/app/globals.css` — Add @theme tokens, custom properties, global styles

### Files to Create
- `src/components/theme-toggle.tsx` — Dark/light toggle button
- `src/components/theme-provider.tsx` — Client component wrapper for next-themes

## Implementation Steps

### Step 1: Configure Be Vietnam Pro Font

In `src/app/layout.tsx`:
```tsx
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});
```

### Step 2: Create Theme Provider (Client Component)

Create `src/components/theme-provider.tsx`:
```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
```

**Key decisions:**
- `attribute="class"` — Tailwind dark mode uses class strategy
- `defaultTheme="light"` — Light is default for a Vietnamese market audience
- `enableSystem={false}` — Explicit toggle only, no OS preference
- `disableTransitionOnChange={false}` — Allow smooth transitions

### Step 3: Update Root Layout

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ting Ting - San deal hoi - Hoan hoa hong",
  description: "Mua sam thong minh - Hoan tien len den 80% hoa hong tu Shopee, TikTok Shop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 4: Define Tailwind v4 Theme Tokens

In `src/app/globals.css`:
```css
@import "tailwindcss";

/* === Custom Theme Tokens (Tailwind v4 CSS-first config) === */
@theme {
  /* Font family */
  --font-sans: var(--font-be-vietnam-pro), "Be Vietnam Pro", system-ui, sans-serif;

  /* Brand colors */
  --color-brand-orange: #FF6B35;
  --color-brand-yellow: #F7931E;
  --color-brand-red: #E63946;

  /* Light theme surface colors */
  --color-surface-primary: #FFFFFF;
  --color-surface-secondary: #F8FAFC;
  --color-surface-tertiary: #F1F5F9;

  /* Dark theme surface colors */
  --color-dark-primary: #0F172A;
  --color-dark-secondary: #1E293B;
  --color-dark-tertiary: #334155;

  /* Text colors */
  --color-text-primary: #0F172A;
  --color-text-secondary: #475569;
  --color-text-muted: #94A3B8;

  /* Gradient stops */
  --color-gradient-start: #FF6B35;
  --color-gradient-end: #F7931E;
}

/* === Global Styles === */
@layer base {
  /* Smooth theme transition */
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-surface-primary text-text-primary transition-colors duration-300;
  }

  /* Dark mode overrides */
  .dark body {
    @apply bg-dark-primary;
    color: #E2E8F0;
  }

  /* Selection color */
  ::selection {
    background-color: #FF6B35;
    color: white;
  }
}

/* === Utility Classes === */
@layer utilities {
  .text-gradient {
    @apply bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent;
  }

  .bg-gradient-brand {
    @apply bg-gradient-to-r from-gradient-start to-gradient-end;
  }
}
```

### Step 5: Create Theme Toggle Component

Create `src/components/theme-toggle.tsx`:
```tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="rounded-full p-2 hover:bg-surface-tertiary dark:hover:bg-dark-tertiary transition-colors"
        aria-label="Toggle theme"
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 hover:bg-surface-tertiary dark:hover:bg-dark-tertiary transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <FiSun className="h-5 w-5 text-brand-yellow" />
      ) : (
        <FiMoon className="h-5 w-5 text-text-secondary" />
      )}
    </button>
  );
}
```

**Key pattern:** `mounted` state prevents hydration mismatch. Render placeholder during SSR.

### Step 6: Verify Theme System

Test checklist:
1. Page loads in light mode (default)
2. Toggle switches to dark mode
3. Dark mode persists after page refresh
4. No FOUC on initial load
5. Smooth transition between themes
6. Be Vietnam Pro font renders correctly
7. Vietnamese characters display properly

## Todo List

- [x] Install and configure Be Vietnam Pro via next/font/google
- [x] Create ThemeProvider client component wrapping next-themes
- [x] Update root layout with font variable, ThemeProvider, suppressHydrationWarning
- [x] Define Tailwind v4 @theme tokens in globals.css (colors, fonts)
- [x] Add dark mode CSS overrides in globals.css
- [x] Create .text-gradient and .bg-gradient-brand utility classes
- [x] Create ThemeToggle component with hydration-safe mounting
- [x] Verify smooth theme transitions (no FOUC)
- [x] Verify Be Vietnam Pro renders Vietnamese characters correctly
- [x] Run `npm run build` to confirm no errors

## Success Criteria

- Theme toggle switches between dark and light modes
- Theme persists in localStorage across page reloads
- No hydration mismatch warnings in console
- Be Vietnam Pro font loads and renders Vietnamese text
- Tailwind custom colors (brand-orange, surface-primary, etc.) work in both modes
- Smooth color transitions on theme switch

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Hydration mismatch from theme | Medium | Medium | suppressHydrationWarning + mounted state |
| FOUC on first load | Low | Medium | next-themes script injection handles this |
| Font not loading Vietnamese subset | Low | High | Explicitly include "vietnamese" subset |
| Tailwind v4 @theme syntax errors | Medium | Medium | Test incrementally, check docs |

## Security Considerations
- No user input at this stage
- Font loaded from Google Fonts CDN (trusted source)
- Theme stored in localStorage only (no sensitive data)

## Next Steps
- Phase 3: Core Components (Header, Hero, Social Proof, How It Works)
