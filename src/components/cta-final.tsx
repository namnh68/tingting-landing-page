import Image from "next/image";
import { ZALO_GROUP_LINK } from "@/lib/constants";
import { ScrollReveal } from "@/components/scroll-reveal";

export function CTAFinal() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <ScrollReveal variant="fade-up">
          <div className="rounded-3xl bg-gradient-brand p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Sẵn sàng tiết kiệm?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-md mx-auto">
              Tham gia nhóm Zalo Ting Ting ngay — hơn 100 người đã tiết kiệm cùng chúng tôi!
            </p>

            <div className="inline-block rounded-2xl bg-white p-5 shadow-lg mb-6">
              <Image
                src="/qr-code.jpg"
                alt="QR Code nhóm Zalo Ting Ting"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>

            <p className="text-white/80 text-sm mb-6">
              Quét mã QR hoặc nhấn nút bên dưới
            </p>

            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-brand-orange shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Tham gia nhóm Zalo
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
