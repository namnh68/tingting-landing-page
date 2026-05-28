import Image from "next/image";
import { ZALO_GROUP_LINK } from "@/lib/constants";
import { ScrollReveal } from "@/components/scroll-reveal";

export function CTAFinal() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <ScrollReveal variant="fade-up">
          <div className="rounded-3xl bg-gradient-brand p-8 md:p-14 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Bắt đầu tiết kiệm ngay hôm nay
              </h2>
              <p className="text-white/85 text-lg mb-8 max-w-md mx-auto">
                Mỗi đơn hàng không qua VnTing là một khoản hoàn tiền bạn đang bỏ lỡ.
              </p>

              <div className="inline-block rounded-2xl bg-white p-4 shadow-lg mb-6">
                <Image
                  src="/qr-code.jpg"
                  alt="QR Code nhóm Zalo VnTing"
                  width={180}
                  height={180}
                  className="rounded-lg"
                />
              </div>

              <p className="text-white/70 text-sm mb-6">
                Quét mã QR hoặc nhấn nút bên dưới
              </p>

              <a
                href={ZALO_GROUP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-brand-orange shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Tham gia nhóm Zalo
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
