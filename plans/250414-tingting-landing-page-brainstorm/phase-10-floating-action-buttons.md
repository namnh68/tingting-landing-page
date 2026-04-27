---
title: "Phase 10 — Floating Action Buttons (Zalo)"
status: complete
priority: P1
effort: 1h
depends_on: [phase-09]
---

# Phase 10 — Floating Action Buttons (Zalo)

## Overview

Thêm 2 Floating Action Button (FAB) cố định ở góc phải màn hình để tăng conversion nhanh:
- **Liên hệ** — link Zalo cá nhân (điền sau)
- **Nhóm Zalo** — https://zalo.me/g/icqgkh803

FABs luôn visible, không che content chính, responsive trên mobile/desktop.

---

## Requirements

- 2 FAB button dọc, góc phải dưới, `fixed right-4 bottom-24 md:bottom-8`
- Icon Zalo (logo hoặc chat bubble) + label text ngắn
- Hover: scale + tooltip (desktop)
- Mobile: chỉ hiện icon, ẩn label để tiết kiệm space
- Không xung đột với `sticky-cta.tsx` (sticky bar mobile bottom-0)
- `ZALO_PERSONAL_LINK` placeholder trong `constants.ts` (user điền sau)

---

## Related Code Files

**Modify:**
- `src/lib/constants.ts` — thêm `ZALO_PERSONAL_LINK` constant
- `src/app/page.tsx` — import và render `<FloatingButtons />`

**Create:**
- `src/components/floating-buttons.tsx`

---

## Implementation Steps

### Task 1 — Thêm constant vào constants.ts

Trong `src/lib/constants.ts`, thêm:

```ts
export const ZALO_PERSONAL_LINK = "https://zalo.me/0989210393";
export const ZALO_GROUP_LINK = "https://zalo.me/g/icqgkh803";   // đã có, reuse
```

> Nếu `ZALO_GROUP_LINK` đã tồn tại trong file, không tạo duplicate — chỉ thêm `ZALO_PERSONAL_LINK`.

---

### Task 2 — Tạo floating-buttons.tsx

```tsx
"use client";

import { SiZalo } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { ZALO_PERSONAL_LINK, ZALO_GROUP_LINK } from "@/lib/constants";

const buttons = [
  {
    href: ZALO_PERSONAL_LINK,
    icon: <SiZalo className="w-5 h-5" />,
    label: "Liên hệ",
    ariaLabel: "Liên hệ qua Zalo cá nhân",
    bg: "bg-blue-500 hover:bg-blue-600",
  },
  {
    href: ZALO_GROUP_LINK,
    icon: <FaUsers className="w-5 h-5" />,
    label: "Nhóm Zalo",
    ariaLabel: "Tham gia nhóm Zalo",
    bg: "bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
  },
];

export default function FloatingButtons() {
  return (
    <div className="fixed right-4 bottom-24 md:bottom-10 z-50 flex flex-col gap-3">
      {buttons.map(({ href, icon, label, ariaLabel, bg }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={`
            group flex items-center gap-2 rounded-full px-3 py-3
            text-white shadow-lg transition-all duration-200
            hover:scale-105 hover:shadow-xl active:scale-95
            ${bg}
          `}
        >
          {icon}
          {/* Label: ẩn trên mobile, hiện khi hover trên desktop */}
          <span className="hidden md:block text-sm font-semibold whitespace-nowrap">
            {label}
          </span>
          {/* Mobile tooltip on hover */}
          <span
            className="
              absolute right-full mr-3 rounded-md bg-gray-900 px-2 py-1
              text-xs text-white whitespace-nowrap opacity-0
              group-hover:opacity-100 transition-opacity duration-150
              md:hidden pointer-events-none
            "
          >
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
```

> Nếu `react-icons` chưa có `SiZalo`, dùng `BsChatDots` hoặc text "Z" styled thay thế.

---

### Task 3 — Tích hợp vào page.tsx

```tsx
import FloatingButtons from "@/components/floating-buttons";

// Trong <body> hoặc sau <Footer />, trước <StickyCtaBar />:
<FloatingButtons />
```

---

### Task 4 — Kiểm tra z-index và spacing

- FABs: `z-50`, StickyCtaBar: `z-40` → không che nhau
- Mobile: `bottom-24` (tránh sticky CTA bar cao ~56px + padding)
- Desktop: `bottom-10`, sticky bar ẩn (`md:hidden`) nên không xung đột

---

## Todo List

- [ ] Task 1: Thêm `ZALO_PERSONAL_LINK` vào constants.ts
- [ ] Task 2: Tạo `src/components/floating-buttons.tsx`
- [ ] Task 3: Import & render trong `page.tsx`
- [ ] Task 4: Test z-index, spacing mobile/desktop
- [ ] Task 5: Điền link Zalo cá nhân thực vào `ZALO_PERSONAL_LINK`
- [ ] Update plan.md status → complete

---

## Success Criteria

- 2 FABs hiển thị góc phải dưới mọi viewport
- Không che content, không che sticky CTA bar
- Tap/click mở đúng link Zalo trong tab mới
- Touch target ≥ 44×44px trên mobile

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| `SiZalo` icon không có trong react-icons | Dùng `BsChatDots` hoặc inline SVG Zalo |
| FAB che sticky CTA bar mobile | `bottom-24` đủ cao hơn sticky bar 56px |
| Link cá nhân chưa có | Placeholder rõ ràng, TODO comment |
