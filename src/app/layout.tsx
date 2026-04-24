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

const SITE_URL = "https://tingting.vercel.app";

export const metadata: Metadata = {
  title: "Ting Ting - Săn deal hời - Hoàn hoa hồng | Hoàn tiền Shopee, TikTok Shop",
  description:
    "Tham gia nhóm Zalo Ting Ting để nhận hoàn tiền lên đến 80% hoa hồng khi mua sắm trên Shopee và TikTok Shop. Miễn phí, an toàn, tự động.",
  keywords: [
    "hoàn tiền shopee",
    "hoàn tiền tiktok shop",
    "hoa hồng affiliate",
    "mua sắm tiết kiệm",
    "ting ting",
    "cashback vietnam",
    "nhóm zalo hoàn tiền",
  ],
  authors: [{ name: "Ting Ting" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Ting Ting",
    title: "Ting Ting - Hoàn tiền lên đến 80% khi mua sắm Shopee, TikTok",
    description:
      "Gửi link sản phẩm vào nhóm Zalo, nhận hoàn 80% hoa hồng affiliate. Miễn phí, tự động, an toàn.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ting Ting - Săn deal hời - Hoàn hoa hồng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ting Ting - Hoàn tiền lên đến 80%",
    description: "Nhóm Zalo hoàn tiền Shopee & TikTok Shop. Miễn phí 100%.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ting Ting",
              description: "Nhóm Zalo hoàn tiền Shopee và TikTok Shop",
              url: SITE_URL,
            }),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
