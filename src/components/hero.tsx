import Image from "next/image";
import { ZALO_GROUP_LINK } from "@/lib/constants";
import { ScrollReveal } from "@/components/scroll-reveal";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 via-brand-yellow/5 to-transparent dark:from-brand-orange/5 dark:via-transparent dark:to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <ScrollReveal variant="fade-up" delay={0.1} className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight dark:text-white">
              Mua sắm thông minh{" "}
              <span className="text-gradient">Hoàn tiền lên đến 80%</span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary dark:text-gray-400 max-w-lg mx-auto md:mx-0">
              Gửi link sản phẩm Shopee, TikTok Shop vào nhóm Zalo — nhận hoàn
              80% hoa hồng affiliate. Miễn phí, an toàn, tự động.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a
                href={ZALO_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-full bg-gradient-brand px-8 py-3.5 text-center text-lg font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                Tham gia nhóm Zalo
              </a>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto rounded-full border-2 border-brand-orange px-8 py-3.5 text-center text-lg font-semibold text-brand-orange hover:bg-brand-orange hover:text-white transition-colors dark:border-brand-yellow dark:text-brand-yellow dark:hover:bg-brand-yellow dark:hover:text-dark-primary"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3} className="flex justify-center md:justify-end">
            <div className="relative rounded-2xl bg-white p-6 shadow-2xl dark:bg-dark-secondary">
              <Image
                src="/qr-code.jpg"
                alt="QR Code nhóm Zalo Ting Ting"
                width={280}
                height={280}
                className="rounded-xl"
                priority
              />
              <p className="mt-3 text-center text-sm font-medium text-text-secondary dark:text-gray-400">
                Quét mã để tham gia nhóm Zalo
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
