import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PhuotGuide } from "@/components/cam-nang/phuot-guide";
import { OG_IMAGE_PATH } from "@/lib/phuot-data";

export const dynamic = "force-static";

const SITE_URL = "https://tingting.vercel.app";
const PAGE_PATH = "/blogs/phuot-ha-noi-da-nang";

const TITLE = "Cẩm nang phượt ô tô Hà Nội – Đà Nẵng 8 ngày 7 đêm";
const DESCRIPTION =
  "Lịch trình phượt ô tô Hà Nội – Đà Nẵng 8N7Đ cho gia đình: chiều đi ven biển, chiều về cao tốc, ~1.650 km. Điểm nhấn, ăn gì, ngủ đâu từng ngày, kèm checklist sắm đồ trước chuyến đi.";

export const metadata: Metadata = {
  title: `${TITLE} - VnTing`,
  description: DESCRIPTION,
  keywords: [
    "phượt hà nội đà nẵng",
    "lịch trình phượt ô tô",
    "du lịch đà nẵng gia đình",
    "phượt miền trung 8 ngày",
    "cẩm nang phượt",
    "vnting hoàn tiền",
  ],
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: "VnTing",
    locale: "vi_VN",
    type: "article",
    images: [{ url: `${SITE_URL}${OG_IMAGE_PATH}`, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}${OG_IMAGE_PATH}`],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  author: { "@type": "Organization", name: "VnTing" },
  publisher: { "@type": "Organization", name: "VnTing", url: SITE_URL },
  url: `${SITE_URL}${PAGE_PATH}`,
  image: `${SITE_URL}${OG_IMAGE_PATH}`,
};

export default function PhuotHaNoiDaNangPage() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div>
        <PhuotGuide />
        <div className="bg-surface-primary pb-10 text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-orange hover:underline"
          >
            ← Tất cả bài viết
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
