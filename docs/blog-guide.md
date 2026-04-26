# Blog Implementation Guide

This guide explains how to create, publish, and manage blog posts on Ting Ting.

---

## Quick Start: Add Your First Post

### Step 1: Create a New Post File
```bash
# Create the file with kebab-case-slug.mdx
touch content/posts/my-first-post.mdx
```

### Step 2: Add Frontmatter (Metadata)
```yaml
---
title: "My Amazing Blog Post Title"
description: "A short description for preview cards and social sharing. Keep under 160 characters."
date: "2026-04-27"
slug: "my-first-post"
tags: ["tag1", "tag2"]
published: true
---
```

### Step 3: Write Content
```markdown
Write your post content in **Markdown** syntax.

You can use:
- Headings (## ## ###)
- **Bold** and *italic* text
- Lists and numbered items
- Code blocks (with syntax highlighting)
- Links and images

[Learn more about Markdown →](https://markdownguide.org/)
```

### Step 4: Build & Test
```bash
npm run build    # Generates SSG routes
npm start        # Serve locally at http://localhost:3000
# Visit http://localhost:3000/bai-viet/my-first-post
```

### Step 5: Commit & Deploy
```bash
git add content/posts/my-first-post.mdx
git commit -m "blog: add my first post"
git push origin main    # Auto-deploys to Vercel
```

---

## File Structure

### Filename Convention
- **Format:** `kebab-case-slug.mdx`
- **Example:** `meo-mua-sam-shopee.mdx`
- **URL:** `/bai-viet/meo-mua-sam-shopee`
- **Keep it:** Descriptive, lowercase, no spaces

### Directory
```
content/
└── posts/
    ├── post-1.mdx
    ├── post-2.mdx
    └── post-3.mdx
```

---

## Frontmatter Reference

### Required Fields

| Field | Type | Example | Notes |
|-------|------|---------|-------|
| `title` | string | "Mẹo mua sắm tiết kiệm" | Keep under 60 characters for SEO |
| `description` | string | "Hướng dẫn chi tiết..." | Under 160 chars, used in previews & OG tags |
| `date` | string | "2026-04-26" | Format: YYYY-MM-DD |
| `slug` | string | "meo-mua-sam" | Must match filename (without .mdx) |
| `tags` | array | ["shopee", "tips"] | 1-3 tags recommended |
| `published` | boolean | true | Set to `false` to hide post |

### Optional Fields
```yaml
---
title: "Your Title"
description: "Your description"
date: "2026-04-26"
slug: "your-slug"
tags: ["tag1", "tag2"]
published: true
# Optional future fields (for v0.2.0+):
# author: "Author Name"
# image: "/images/posts/cover.jpg"
# category: "Tips"
---
```

---

## Content Writing

### Markdown Syntax

#### Headings
```markdown
# H1 (Don't use — reserved for title)
## H2 Subheading
### H3 Sub-subheading
#### H4 and so on
```

#### Text Formatting
```markdown
**Bold text** or __bold__
*Italic text* or _italic_
***Bold and italic***
~~Strikethrough~~
`inline code`
```

#### Lists
```markdown
Unordered:
- Item 1
- Item 2
  - Nested item
  
Ordered:
1. First
2. Second
3. Third
```

#### Code Blocks
````markdown
```javascript
// Code block with syntax highlighting
const greeting = "Hello, Ting Ting!";
console.log(greeting);
```

```python
# Python code
def hello():
    print("Hello")
```
````

#### Blockquotes
```markdown
> This is a blockquote.
> Great for highlighting important info.
```

#### Links
```markdown
[Link text](https://example.com)
[Internal link](/bai-viet)
```

#### Images
```markdown
![Alt text](https://example.com/image.jpg)
![Image with path](/images/posts/my-image.jpg)
```

#### Horizontal Rule
```markdown
---
```

### Markdown + React (MDX)

You can embed React components inside markdown:

```jsx
# My Post

Here's some markdown.

<button onClick={() => alert('Hello!')}>
  Click me!
</button>

More markdown below.
```

**Common use cases:**
- Custom callout boxes
- Interactive demos
- Embedded videos
- Custom styling

---

## Writing Best Practices

### Content Quality
1. **Clear headline:** Descriptive, action-oriented, searchable
   - ✅ Good: "Mẹo mua sắm Shopee tiết kiệm nhất 2026"
   - ❌ Bad: "Shopping Tips"

2. **Strong intro:** Hook reader in first paragraph
   - Explain what they'll learn
   - Why it matters to them

3. **Structure:** Use subheadings to organize
   - Break long posts into sections
   - One idea per section
   - Use bullet points for lists

4. **Clarity:** Write for your audience
   - Vietnamese audience (mix of tech & non-tech)
   - Short paragraphs
   - Simple sentence structure
   - Define jargon when needed

5. **CTA (Call-to-action):** End with action
   - "Join Ting Ting group to get these deals"
   - "Share your experience in the comments"
   - Link to Zalo group

### SEO Optimization
1. **Keywords in title & description**
   - Include what users search for
   - E.g., "mua sắm", "hoàn tiền", "Shopee"

2. **First paragraph mentions main keyword**
   - Search engines read the top content

3. **Descriptive headings**
   - Use H2/H3 for subheadings
   - Include keywords naturally

4. **Internal links**
   - Link to other blog posts
   - Link to home page sections
   - Link to Zalo group

### Date & Maintenance
1. **Publish date:** When the post goes live
   - Use current date or future date (for scheduling)
   - Format: YYYY-MM-DD

2. **Keep it current:**
   - Update dates on revised posts
   - Mark outdated information
   - Refresh examples annually

---

## Examples

### Example 1: Tips Post
```yaml
---
title: "5 Mẹo Mua Sắm Shopee Tiết Kiệm Nhất 2026"
description: "Hướng dẫn chi tiết 5 cách mua hàng Shopee rẻ nhất và nhận hoàn tiền lên 80% hoa hồng affiliate."
date: "2026-04-26"
slug: "5-meo-mua-sam-shopee-tiet-kiem"
tags: ["shopee", "tips", "hoan-tien"]
published: true
---

Mua sắm trên Shopee ngày càng phổ biến, nhưng ít người biết cách tận dụng **hoàn tiền hoa hồng affiliate** để tiết kiệm thêm mỗi đơn hàng.

## 1. Dùng Link Hoàn Tiền Trước Khi Mua

Thay vì tìm sản phẩm trực tiếp:

1. Copy link sản phẩm bạn muốn mua
2. Gửi vào nhóm Zalo **Ting Ting**
3. Bot gửi lại link affiliate
4. Mua hàng qua link đó — giá giống hệt, nhưng bạn nhận lại 80% hoa hồng

## 2. Kết Hợp Với Voucher Của Shopee

Bạn vẫn dùng được:
- Mã giảm giá (voucher)
- Flash Sale
- Freeship Xtra

Tiền hoàn hoa hồng là **khoản thêm** hoàn toàn độc lập.

## 3. Thời Điểm Mua Sắm Tốt Nhất

- **Ngày đôi** (1/1, 2/2...): hoa hồng thường cao hơn
- **Shopee Sale**: nhiều voucher + hoàn tiền cao
- **Cuối tháng**: nhiều chương trình cashback từ ngân hàng

## Kết Luận

Chỉ cần thêm 1 bước gửi link vào nhóm Ting Ting, bạn đã có thể tiết kiệm thêm đáng kể mỗi tháng.

[Tham gia nhóm Ting Ting ngay →](https://zalo.me/g/icqgkh803)
```

### Example 2: How-To Post
```yaml
---
title: "Hướng Dẫn Chi Tiết: Cách Hoàn Tiền Qua Ting Ting"
description: "Step-by-step guide để nhận hoàn tiền affiliate từ mua sắm Shopee & TikTok Shop. Dễ dàng, nhanh chóng, không phí."
date: "2026-04-27"
slug: "huong-dan-hoan-tien-chi-tiet"
tags: ["huong-dan", "hoan-tien", "tiktok-shop"]
published: true
---

Bạn mới biết đến Ting Ting? Hướng dẫn này sẽ giúp bạn hiểu rõ cách nhận hoàn tiền, từ bước đầu tiên cho đến nhận tiền trong tài khoản.

## Bước 1: Tham Gia Nhóm Zalo

[Nhấp vào đây để tham gia nhóm Ting Ting](https://zalo.me/g/icqgkh803)

- Hoàn toàn miễn phí
- Không cần bất kỳ thông tin nhạy cảm nào
- Nhận lời chào hỏi từ community moderator

## Bước 2: Copy Link Sản Phẩm Bạn Muốn Mua

...
```

---

## Publishing Workflow

### Before Publishing
- [ ] Save file with correct filename (kebab-case)
- [ ] Complete all frontmatter fields
- [ ] Spellcheck (Vietnamese grammar)
- [ ] Test markdown rendering locally
- [ ] Verify all links work
- [ ] Read through once for clarity
- [ ] Ensure no typos in slug & description

### Publishing
```bash
# 1. Build locally to check for errors
npm run build

# 2. Start preview server
npm start
# Visit http://localhost:3000/bai-viet/your-slug

# 3. If all looks good, commit & push
git add content/posts/your-post.mdx
git commit -m "blog: add your post title"
git push origin main

# 4. Vercel auto-deploys
# → Live at https://tingting.vercel.app/bai-viet/your-slug
```

### After Publishing
- [ ] Test live URL on Vercel
- [ ] Share on Zalo group
- [ ] Share on social media (if applicable)
- [ ] Monitor for comments/feedback

---

## Managing Posts

### Edit an Existing Post
```bash
# 1. Edit the .mdx file
# 2. Change content, not slug (changes URL)
# 3. Optionally update date if major revision
# 4. Commit & push
git add content/posts/your-post.mdx
git commit -m "blog: update your post title"
git push origin main
```

### Hide/Unpublish a Post
```yaml
# Just change one line:
published: false
```
- Post won't appear in listing
- Direct URL returns 404
- Build still succeeds (no errors)

### Delete a Post
```bash
# 1. Delete the file
rm content/posts/old-post.mdx

# 2. Commit & push
git add -A
git commit -m "blog: remove outdated post"
git push origin main
```

---

## Reading Time Display

Reading time is calculated automatically:
- Formula: `total words ÷ 200`
- Minimum: 1 minute
- Displayed on card and detail page

**Example:**
- 1,000 words = 5 minutes
- 400 words = 2 minutes
- 150 words = 1 minute

No action needed — it's automatic!

---

## SEO Checklist

Before publishing, verify:
- [ ] **Title** (H1 implicit in frontmatter): Clear, keyword-rich, under 60 chars
- [ ] **Description:** Under 160 chars, includes keywords
- [ ] **Slug:** Matches filename, kebab-case, includes keywords
- [ ] **Tags:** 2-3 relevant tags
- [ ] **Date:** Correct and current
- [ ] **First 100 words:** Include main keyword naturally
- [ ] **Subheadings:** Use H2/H3, include keywords
- [ ] **Internal links:** Link to related posts & home
- [ ] **External links:** Cite sources, use noopener for external
- [ ] **Meta description:** Good? (Use frontmatter `description`)

---

## Troubleshooting

### Post Not Appearing in Listing
**Cause:** `published: false` or slug/filename mismatch
**Fix:**
```yaml
published: true
slug: "must-match-filename"  # Without .mdx
```

### Markdown Not Rendering
**Cause:** Syntax error or missing backticks
**Fix:**
- Check for unclosed code blocks (``` symbols)
- Validate YAML frontmatter (no trailing colons without values)
- Test locally: `npm run build`

### Build Fails
**Cause:** Invalid YAML or file encoding
**Fix:**
- Ensure file is UTF-8 encoded
- Validate YAML syntax (use online YAML validator)
- Check for special characters in frontmatter

### URL Not Working
**Cause:** Slug doesn't match filename
**Fix:**
- Filename: `meo-mua-sam.mdx`
- Slug in frontmatter: `meo-mua-sam`
- URL: `/bai-viet/meo-mua-sam` ✅

---

## Template

Use this as a starting point:

```yaml
---
title: "Your Title Here (Keep Under 60 Characters)"
description: "Brief summary of the post for sharing. Keep under 160 characters for SEO."
date: "2026-04-27"
slug: "your-post-slug"
tags: ["tag1", "tag2"]
published: true
---

Write your introduction here. Hook the reader with a compelling first paragraph that explains what they'll learn.

## Section 1: First Major Point

Expand on this point with examples and details.

## Section 2: Second Major Point

Continue with your content.

## Conclusion

Summarize key takeaways and include a call-to-action.

[Tham gia nhóm Ting Ting →](https://zalo.me/g/icqgkh803)
```

---

## Support & Questions

- **Blog rendering issues:** Check `src/lib/posts.ts` for utilities
- **MDX questions:** See [next-mdx-remote docs](https://github.com/hashicorp/next-mdx-remote)
- **Markdown help:** [Markdown Guide](https://markdownguide.org/)
- **SEO questions:** Contact team lead

---

**Last updated:** 2026-04-26  
**Version:** 0.1.0

For the latest blog posts, visit: https://tingting.vercel.app/bai-viet
