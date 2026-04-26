# Hướng dẫn quản lý bài viết (Blog)

Tất cả bài viết nằm trong thư mục `content/posts/`. Mỗi bài là 1 file `.mdx`.

---

## Thêm bài viết mới

1. Tạo file mới trong `content/posts/`, đặt tên theo slug, ví dụ:
   ```
   content/posts/meo-mua-hang-tiki-hoan-tien.mdx
   ```

2. Thêm frontmatter ở đầu file:
   ```yaml
   ---
   title: "Mẹo mua hàng Tiki và nhận hoàn tiền"
   description: "Hướng dẫn cách nhận 80% hoa hồng khi mua hàng Tiki qua Ting Ting."
   date: "2026-05-01"
   slug: "meo-mua-hang-tiki-hoan-tien"
   tags: ["tiki", "hoan-tien"]
   published: true
   ---
   ```
   > **Lưu ý:** `slug` phải khớp tên file (không có `.mdx`).

3. Viết nội dung bên dưới frontmatter bằng Markdown thông thường.

4. Deploy lại (hoặc chạy `npm run build`) — bài sẽ tự xuất hiện trên `/bai-viet` và trong sitemap.

---

## Sửa bài viết

Mở file `.mdx` tương ứng, chỉnh nội dung hoặc frontmatter, rồi deploy lại.

> Đổi `title`/`description` → cập nhật ngay trên trang.  
> Đổi `slug` → URL thay đổi, cần cập nhật cả tên file.

---

## Ẩn bài viết (không xoá)

Đổi `published: true` thành `published: false` trong frontmatter:

```yaml
published: false
```

Bài sẽ biến khỏi danh sách và sitemap sau lần build tiếp. URL cũ trả về 404.

---

## Xoá bài viết

Xoá file `.mdx` khỏi `content/posts/` rồi deploy lại.

---

## Thêm hình ảnh vào bài viết

1. Đặt ảnh vào thư mục `public/images/posts/`, ví dụ:
   ```
   public/images/posts/shopee-cashback-example.jpg
   ```

2. Chèn vào nội dung bài bằng cú pháp Markdown:
   ```markdown
   ![Ví dụ hoàn tiền Shopee](/images/posts/shopee-cashback-example.jpg)
   ```

> **Quy tắc đặt tên ảnh:** dùng kebab-case, mô tả nội dung ảnh, ví dụ `shopee-link-bot-reply.jpg`, `tiktok-copy-link-step.png`.

---

## Quy tắc đặt tên file

| Đúng | Sai |
|------|-----|
| `meo-mua-shopee-2026.mdx` | `MeoMuaShopee.mdx` |
| `huong-dan-hoan-tien.mdx` | `huong dan hoan tien.mdx` |

Chỉ dùng chữ thường, dấu gạch ngang, không dấu tiếng Việt, không khoảng trắng.

---

## Frontmatter schema

| Field | Bắt buộc | Mô tả |
|-------|----------|-------|
| `title` | ✓ | Tiêu đề bài, hiển thị trên trang và SEO |
| `description` | ✓ | Mô tả ngắn, dùng cho meta description và card preview |
| `date` | ✓ | Ngày đăng, định dạng `YYYY-MM-DD` |
| `slug` | ✓ | URL slug, phải khớp tên file |
| `published` | ✓ | `true` để hiển thị, `false` để ẩn |
| `tags` | | Danh sách tag, hiển thị trên card và trang bài viết |
