# Hướng dẫn thêm domain/subdomain cho CTV

Tài liệu thao tác nhanh khi onboard một CTV mới (subdomain riêng với link Zalo nhóm,
Zalo cá nhân, QR code riêng). Chi tiết kiến trúc xem `docs/system-architecture.md` §
"Multi-CTV Personalization".

## A. Subdomain dưới `vnting.com` (trường hợp thường gặp)

Ví dụ onboard CTV `ainguyen` → subdomain `ainguyen.vnting.com`.

### 1. Chuẩn bị ảnh QR

```bash
mkdir -p public/images/ctv/ainguyen
cp <đường-dẫn-QR-của-CTV>.jpg public/images/ctv/ainguyen/qr.jpg
```

### 2. Thêm cấu hình vào `src/lib/ctv-config.ts`

Key **phải là full hostname**, không phải chỉ slug:

```typescript
export const CTV_MAP: Record<string, CtvConfig> = {
  "ainguyen.vnting.com": {
    zaloGroupLink: "https://zalo.me/g/xxxxxxx",
    zaloPersonalLink: "https://zalo.me/0xxxxxxxxx",
    qrImage: "/images/ctv/ainguyen/qr.jpg",
    shareRate: 80, // % hoa hồng chia lại cho khách của nhóm này (vd 70 hoặc 80)
  },
};
```

> Nhầm key (thiếu `.vnting.com`) → middleware không match được, subdomain sẽ fallback về
> link mặc định.

### 3. Kiểm tra local trước khi deploy

```bash
npm run build
npm run preview   # chạy trên Cloudflare Workers runtime thật (wrangler)
curl -H "Host: ainguyen.vnting.com" http://localhost:8787/ | grep zalo.me
```

### 4. Deploy code

```bash
git add src/lib/ctv-config.ts public/images/ctv/ainguyen
git commit -m "feat: add CTV ainguyen"
git push origin main   # CI/CD tự deploy lên Cloudflare Workers
```

### 5. Trỏ domain trên Cloudflare Dashboard

- Vào **Workers & Pages → chọn worker này → Settings → Domains & Routes → Add custom domain**
- Nhập `ainguyen.vnting.com` — Cloudflare tự tạo DNS record + cấp SSL (đợi ~5 phút)

### 6. Test production

```bash
curl -H "Host: ainguyen.vnting.com" https://vnting.com/
```

Checklist:
- [ ] Link Zalo nhóm/cá nhân đúng của CTV
- [ ] QR code load được, đúng ảnh
- [ ] Tỉ lệ ăn chia (`shareRate`) hiển thị đúng % đã thoả thuận (hero, footer, how-it-works, bảng so sánh, SEO description)
- [ ] `<meta name="robots" content="noindex, follow">`
- [ ] `<link rel="canonical" href="https://vnting.com...">`

## B. Domain riêng của CTV (không phải subdomain vnting.com)

Bước 1–4 giống mục A, chỉ khác bước trỏ domain (bước 5), tùy account:

| Trường hợp | Cách làm |
|---|---|
| Cùng account Cloudflare, khác zone | Thêm domain vào Workers & Pages settings của account này |
| Account Cloudflare khác | CTV trỏ DNS domain của họ về Cloudflare, add domain vào account Cloudflare của họ, bên mình tạo **Route** (không phải custom domain) trỏ vào worker này |
| Nhà đăng ký khác (không dùng Cloudflare) | Thêm Route trong Workers settings, CTV cấu hình CNAME theo hướng dẫn Cloudflare đưa ra |

## Gỡ CTV (rollback)

```bash
# Xóa entry trong CTV_MAP (src/lib/ctv-config.ts)
# Xóa thư mục public/images/ctv/{slug}
git commit -m "chore: remove CTV ainguyen"
git push origin main
```

## Câu hỏi còn mở (chưa có quy trình chính thức)

- Ai thu thập/kiểm tra ảnh QR của từng CTV trước khi onboard.
- CTV dùng domain riêng có cần cấu hình cả apex domain lẫn `www` không (tùy DNS setup của họ).
- Domain CTV nằm ở account Cloudflare/nhà đăng ký khác — cần xác nhận thao tác cụ thể khi có ca đầu tiên.
