import Image from "next/image";
import { SiShopee, SiTiktok } from "react-icons/si";
import { FiGift, FiZap, FiShield, FiPercent } from "react-icons/fi";
import { ZALO_GROUP_LINK } from "@/lib/constants";
import { ScrollReveal } from "@/components/scroll-reveal";

const MARQUEE_ITEMS = [
  { label: "Thời trang", rate: "15%" },
  { label: "Điện tử", rate: "12%" },
  { label: "Mỹ phẩm", rate: "18%" },
  { label: "Nhà cửa", rate: "10%" },
  { label: "Giày dép", rate: "14%" },
  { label: "Đồ chơi", rate: "8%" },
  { label: "Thực phẩm", rate: "6%" },
  { label: "Sách vở", rate: "10%" },
  { label: "Thú cưng", rate: "12%" },
  { label: "Thể thao", rate: "11%" },
];

const HIGHLIGHTS = [
  { label: "Miễn phí", Icon: FiGift },
  { label: "Tự động 24/7", Icon: FiZap },
  { label: "An toàn", Icon: FiShield },
];

export function Hero() {
  return (
    <section id="hero-section" className="relative pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/8 via-brand-yellow/4 to-transparent dark:from-brand-orange/5 dark:via-transparent dark:to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl dark:bg-brand-orange/3" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: content */}
          <ScrollReveal variant="fade-up" delay={0.1} className="text-center md:text-left">
            {/* Platform badges */}
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-8 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EE4D2D]/10 px-3.5 py-1.5 text-xs font-bold text-[#EE4D2D] ring-1 ring-[#EE4D2D]/20">
                <SiShopee className="h-3.5 w-3.5" />
                Shopee
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-black/5 dark:bg-white/10 px-3.5 py-1.5 text-xs font-bold text-black dark:text-white ring-1 ring-black/10 dark:ring-white/20">
                <SiTiktok className="h-3.5 w-3.5" />
                TikTok Shop
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0F146D]/10 px-3.5 py-1.5 text-xs font-bold text-[#0F146D] dark:text-blue-300 ring-1 ring-[#0F146D]/20 dark:ring-blue-400/20">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4 4h4v12h8v4H4z"/>
                </svg>
                Lazada
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] dark:text-white">
              Hoàn <span className="text-gradient">80% hoa hồng</span>{" "}
              mỗi đơn hàng online
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg text-text-secondary dark:text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Gửi link sản phẩm vào nhóm Zalo — nhận link mua hàng có hoa hồng — mua xong được hoàn tiền. Không mất phí, không rủi ro.
            </p>

            {/* Highlight pills */}
            <div className="mt-7 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
              {HIGHLIGHTS.map(({ label, Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface-secondary dark:bg-dark-tertiary px-4 py-2 text-sm font-medium text-text-primary dark:text-gray-200"
                >
                  <Icon className="h-4 w-4 text-brand-orange dark:text-brand-yellow" />
                  {label}
                </span>
              ))}
            </div>

          </ScrollReveal>

          {/* Right: QR card with glow */}
          <ScrollReveal variant="fade-up" delay={0.3} className="flex justify-center md:justify-end">
            <div className="rounded-3xl card-glass glow-brand p-8 text-center">
              <Image
                src="/qr-code.jpg"
                alt="QR Code nhóm Zalo Vn Ting Ting"
                width={240}
                height={240}
                className="rounded-2xl mx-auto"
                priority
              />
              <p className="mt-5 text-sm font-medium text-text-secondary dark:text-gray-400">
                Quét mã QR để vào nhóm Zalo
              </p>
              <a
                href={ZALO_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Tham gia nhóm ngay
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Marquee cashback ticker */}
      <div className="marquee-container border-t border-brand-orange/10 dark:border-brand-yellow/10 bg-surface-secondary/60 dark:bg-dark-secondary/60 py-3.5">
        <div className="animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-5 text-sm whitespace-nowrap"
            >
              <FiPercent className="h-3.5 w-3.5 text-brand-orange dark:text-brand-yellow" />
              <span className="font-medium text-text-primary dark:text-gray-300">{item.label}</span>
              <span className="rounded-full bg-brand-orange/10 dark:bg-brand-yellow/10 px-2 py-0.5 text-xs font-bold text-brand-orange dark:text-brand-yellow">
                {item.rate}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
