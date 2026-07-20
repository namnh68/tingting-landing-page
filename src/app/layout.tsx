import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { getCtvConfig, getCtvMeta } from "@/lib/ctv-server";
import { CtvProvider } from "@/lib/ctv-context";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

const SITE_URL = "https://vnting.com";

// Every route reads the CTV config (directly or via context from this layout), which
// depends on the request Host header — force per-request rendering everywhere so
// host-based personalization (links/QR/SEO) isn't baked in at build time.
export const dynamic = "force-dynamic";

function buildMetadata(shareRate: number): Metadata {
  return {
    icons: {
      icon: "/icon.svg",
      apple: "/icon.svg",
    },
    title: "VnTing - Hệ thống hoàn tiền hoa hồng Shopee, TikTok Shop, Lazada",
    description: `Tham gia nhóm Zalo VnTing để nhận hoàn tiền lên đến ${shareRate}% hoa hồng khi mua sắm trên Shopee và TikTok Shop. Miễn phí, an toàn, tự động.`,
    keywords: [
      "hoàn tiền shopee",
      "hoàn tiền tiktok shop",
      "hoa hồng affiliate",
      "mua sắm tiết kiệm",
      "ting ting",
      "cashback vietnam",
      "nhóm zalo hoàn tiền",
    ],
    authors: [{ name: "VnTing" }],
    openGraph: {
      type: "website",
      locale: "vi_VN",
      url: SITE_URL,
      siteName: "VnTing",
      title: "VnTing - Nền tảng giúp tiết kiệm hơn khi mua sắm Online",
      description: `Gửi link sản phẩm vào nhóm Zalo, nhận hoàn ${shareRate}% hoa hồng affiliate. Miễn phí, tự động, an toàn.`,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "VnTing - Săn deal hời - Hoàn hoa hồng",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `VnTing - Hoàn tiền lên đến ${shareRate}%`,
      description: "Nhóm Zalo hoàn tiền Shopee & TikTok Shop. Miễn phí 100%.",
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
    metadataBase: new URL(SITE_URL),
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { isDefault, path } = await getCtvMeta();
  const { shareRate } = await getCtvConfig();
  const base = buildMetadata(shareRate);
  if (isDefault) return base;
  return {
    ...base,
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}${path}` },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ctv = await getCtvConfig();
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${nunito.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "VnTing",
              description: "Nhóm Zalo hoàn tiền Shopee và TikTok Shop",
              url: SITE_URL,
            }),
          }}
        />
        <ThemeProvider>
          <CtvProvider value={ctv}>{children}</CtvProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
