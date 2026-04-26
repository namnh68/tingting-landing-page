---
phase: 1
title: "Setup Dependencies & Sample Content"
status: completed
effort: 30m
completed: 2026-04-26
---

# Phase 1: Setup Dependencies & Sample Content

## Overview

Cài packages cần thiết và tạo cấu trúc thư mục `content/posts/` với 2 bài viết mẫu.

## Implementation Steps

### 1. Cài packages

```bash
npm install gray-matter next-mdx-remote
```

- `gray-matter` — parse YAML frontmatter từ MDX files
- `next-mdx-remote` — render MDX content trong React Server Components

### 2. Tạo thư mục content

```
content/
└── posts/
    ├── meo-mua-sam-shopee-tiet-kiem.mdx
    └── huong-dan-hoan-tien-tiktok-shop.mdx
```

### 3. Frontmatter schema cho mỗi bài

```yaml
---
title: "Mẹo mua sắm Shopee tiết kiệm nhất 2026"
description: "Hướng dẫn chi tiết cách mua hàng Shopee và nhận hoàn tiền qua Ting Ting, tiết kiệm lên đến 80% hoa hồng."
date: "2026-04-26"
slug: "meo-mua-sam-shopee-tiet-kiem"
tags: ["shopee", "meo-mua-sam", "hoan-tien"]
published: true
---
```

**Bắt buộc:** `title`, `description`, `date`, `slug`, `published`
**Tuỳ chọn:** `tags`, `coverImage`

### 4. Nội dung bài mẫu 1: `meo-mua-sam-shopee-tiet-kiem.mdx`

```mdx
---
title: "Mẹo mua sắm Shopee tiết kiệm nhất 2026"
description: "Hướng dẫn chi tiết cách mua hàng Shopee và nhận hoàn tiền qua Ting Ting, tiết kiệm lên đến 80% hoa hồng."
date: "2026-04-26"
slug: "meo-mua-sam-shopee-tiet-kiem"
tags: ["shopee", "meo-mua-sam", "hoan-tien"]
published: true
---

Mua sắm trên Shopee ngày càng phổ biến, nhưng ít người biết cách tận dụng **hoàn tiền hoa hồng affiliate** để tiết kiệm thêm mỗi đơn hàng.

## 1. Dùng link hoàn tiền trước khi mua

Thay vì tìm sản phẩm trực tiếp, hãy:

1. Copy link sản phẩm bạn muốn mua
2. Gửi vào nhóm Zalo **Ting Ting**
3. Bot gửi lại link affiliate
4. Mua hàng qua link đó — giá giống hệt, nhưng bạn nhận lại 80% hoa hồng

## 2. Kết hợp với voucher của Shopee

Bạn vẫn dùng được:
- Mã giảm giá (voucher)
- Flash Sale
- Freeship Xtra

Tiền hoàn hoa hồng là **khoản thêm** hoàn toàn độc lập với các ưu đãi trên.

## 3. Thời điểm mua sắm tốt nhất

- **Ngày đôi** (1/1, 2/2...): hoa hồng thường cao hơn
- **Shopee Sale**: nhiều voucher + hoàn tiền cao
- **Cuối tháng**: nhiều chương trình cashback từ ngân hàng

## Kết luận

Chỉ cần thêm 1 bước gửi link vào nhóm Ting Ting, bạn đã có thể tiết kiệm thêm đáng kể mỗi tháng mà không cần thay đổi thói quen mua sắm.

[Tham gia nhóm Ting Ting ngay →](https://zalo.me/g/icqgkh803)
```

### 5. Nội dung bài mẫu 2: `huong-dan-hoan-tien-tiktok-shop.mdx`

```mdx
---
title: "Hướng dẫn hoàn tiền TikTok Shop qua Ting Ting"
description: "Cách nhận hoàn tiền khi mua hàng TikTok Shop qua nhóm Zalo Ting Ting. Đơn giản, tự động, miễn phí."
date: "2026-04-25"
slug: "huong-dan-hoan-tien-tiktok-shop"
tags: ["tiktok-shop", "hoan-tien", "huong-dan"]
published: true
---

TikTok Shop đang ngày càng phổ biến với nhiều deal giá tốt. Cùng với Ting Ting, bạn có thể nhận thêm **hoàn tiền 80% hoa hồng** cho mỗi đơn hàng.

## Cách thực hiện

### Bước 1: Tìm sản phẩm trên TikTok Shop

Duyệt TikTok hoặc vào app TikTok Shop, tìm sản phẩm bạn muốn mua. **Chưa mua ngay.**

### Bước 2: Copy link sản phẩm

- Nhấn **Chia sẻ** trên sản phẩm
- Chọn **Copy link**

### Bước 3: Gửi vào nhóm Ting Ting

Dán link vào nhóm Zalo Ting Ting. Bot sẽ phản hồi **ngay lập tức** với link affiliate.

### Bước 4: Mua hàng qua link bot gửi

Nhấn vào link bot gửi, hoàn tất đơn hàng bình thường. Giá không thay đổi.

### Bước 5: Nhận hoàn tiền

Sau khi đơn hoàn thành (thường 30-45 ngày), bạn nhận **80% hoa hồng** chuyển khoản trực tiếp.

## Lưu ý quan trọng

- Phải mua qua **đúng link bot gửi** mới được tính hoa hồng
- Không huỷ đơn sau khi đã dùng link affiliate
- Hoàn tiền tính theo giá gốc sản phẩm (không bao gồm phí vận chuyển)

[Tham gia nhóm Ting Ting ngay →](https://zalo.me/g/icqgkh803)
```

## Todo

- [x] Chạy `npm install gray-matter next-mdx-remote`
- [x] Tạo thư mục `content/posts/`
- [x] Tạo file `content/posts/meo-mua-sam-shopee-tiet-kiem.mdx`
- [x] Tạo file `content/posts/huong-dan-hoan-tien-tiktok-shop.mdx`

## Success Criteria

- `npm install` không lỗi
- 2 file MDX tồn tại với frontmatter đúng schema
