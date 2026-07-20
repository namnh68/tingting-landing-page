# Brainstorm: Multi-CTV Subdomain Landing Pages

## Problem
Mỗi CTV (cộng tác viên) cần 1 subdomain riêng (vd `ainguyen.vnting.com`), hoặc domain riêng nếu CTV có sẵn. Nội dung landing page giữ nguyên, chỉ link tham gia nhóm Zalo + QR Zalo cần đổi theo CTV. App host trên Vercel, DNS `vnting.com` quản lý trên Cloudflare, đang CNAME apex → `668a1e35f48d7059.vercel-dns-017.com`.

## Current state (scouted)
- Next.js 15 App Router, hosted Vercel (repo cũng có wrangler/opennext config cho Cloudflare Workers nhưng KHÔNG dùng — xác nhận host chính là Vercel).
- Mọi thông tin (Zalo group link, Zalo personal link, QR ảnh, stats, FAQ...) hardcode tĩnh trong `src/lib/constants.ts`, dùng trực tiếp bởi ~9 component: `header.tsx`, `footer.tsx`, `hero.tsx`, `sticky-cta.tsx`, `floating-buttons.tsx`, `cta-final.tsx`, `promotion.tsx`, `how-it-works.tsx`, `cam-nang/phuot-guide.tsx`.
- Không có DB, không có concept multi-tenant/CTV nào tồn tại trước đó.

## Requirements xác nhận (qua AskUserQuestion)
- Quy mô: <20 CTV, thêm mới không thường xuyên → quản lý thủ công OK.
- Data CTV: file config tĩnh (JSON/TS trong repo), KHÔNG cần DB.
- Custom domain CTV riêng: admin add thủ công qua Vercel dashboard, CTV tự trỏ DNS.
- Personalize scope: chỉ Zalo group link + Zalo personal link + QR ảnh. Tên CTV KHÔNG hiển thị UI (chỉ dùng nội bộ để quản lý).
- SEO: subdomain chỉ dùng để share link (Zalo/FB cá nhân CTV), không cần Google index → set `noindex` + canonical về `vnting.com`.
- Root domain (`vnting.com`, không subdomain) giữ nguyên là bản mặc định/chung, không gắn CTV nào.

## Approaches evaluated

### A. Wildcard domain (`*.vnting.com`) trên Vercel — REJECTED
- Cần gói Vercel Pro trở lên (Hobby free không hỗ trợ wildcard domain).
- User không rõ gói hiện tại đang dùng, không muốn phát sinh chi phí/phức tạp không cần thiết.
- Overkill cho quy mô <20 CTV.

### B. Add từng subdomain riêng lẻ qua Vercel dashboard — CHOSEN
- Mỗi CTV = add domain `{slug}.vnting.com` thủ công trên Vercel (Settings → Domains → Add), y hệt flow user đã quen dùng cho custom domain CTV riêng.
- Hoạt động trên MỌI gói Vercel kể cả free — không cần biết/nâng cấp plan.
- Cloudflare: add CNAME `{slug}` → `668a1e35f48d7059.vercel-dns-017.com`, DNS-only (grey cloud, không proxy) để tránh xung đột SSL cert với Vercel — nhất quán với cách apex domain đang trỏ.
- Trade-off: thêm CTV mất ~vài phút thao tác thủ công/CTV (add domain + CNAME) — chấp nhận được vì <20 CTV, không thường xuyên.

## Kiến trúc code chọn (KISS, no DB)
1. `src/lib/ctv-config.ts`: map tĩnh `hostname → { zaloGroupLink, zaloPersonalLink, qrImage }`. Default/fallback = giá trị hiện tại trong `constants.ts` (dùng cho root domain + hostname lạ, tránh 404).
2. `src/middleware.ts`: đọc `host` header (strip port), tra `ctv-config`, gắn `x-ctv-id` vào request header cho downstream đọc. Không khớp → fallback default, KHÔNG lỗi.
3. Root layout (Server Component) đọc header 1 lần qua `headers()`, resolve CTV config, bọc children bằng 1 Context Provider — các client component hiện import `ZALO_GROUP_LINK` trực tiếp đổi sang đọc qua `useCtv()` hook. Tránh sửa rải rác 9 file theo kiểu prop-drilling.
4. QR ảnh riêng: `public/images/ctv/{slug}/qr.jpg`, fallback QR mặc định nếu CTV chưa có ảnh.
5. Metadata: set `robots: noindex, follow` + `alternates.canonical: https://vnting.com{path}` khi hostname ≠ default, để tránh Google phạt duplicate content.

## Quy trình vận hành: thêm 1 CTV mới
1. Thêm entry vào `ctv-config.ts` (slug, zaloGroupLink, zaloPersonalLink, qrImage path).
2. Thêm ảnh QR vào `public/images/ctv/{slug}/qr.jpg`.
3. Commit + push → Vercel tự deploy.
4. Vercel dashboard → Domains → Add `{slug}.vnting.com`.
5. Cloudflare DNS → Add CNAME `{slug}` → target Vercel hiển thị (thường trùng `668a1e35f48d7059.vercel-dns-017.com`), DNS-only.
6. Đợi propagate + Vercel auto SSL (vài phút).
Domain riêng của CTV: lặp lại bước 4-5 nhưng CTV tự cấu hình DNS bên họ.

## Risks
- Middleware chạy trên mọi request (kể cả static asset nếu matcher không loại trừ) — cần matcher exclude `_next`, ảnh, favicon để tránh overhead.
- Nếu tương lai CTV tăng >50-100 hoặc cần self-service, cách A (wildcard + Pro plan + form đăng ký) sẽ hợp lý hơn — note lại làm follow-up, không làm ngay theo YAGNI.
- Cloudflare proxy (orange cloud) trên subdomain mới có thể conflict SSL với Vercel nếu bật nhầm — luôn để DNS-only.

## Next steps
- User đồng ý chốt phương án B. Tiếp theo: chạy `/plan` để tạo implementation plan chi tiết (middleware, config schema, context provider, cập nhật 9 component, metadata noindex/canonical).

## Unresolved questions
- Chưa xác nhận gói Vercel hiện tại (không quan trọng nữa vì phương án B không cần wildcard).
- QR ảnh riêng từng CTV: ai cung cấp/upload — cần quy trình nhận ảnh QR từ CTV trước khi thêm entry.
