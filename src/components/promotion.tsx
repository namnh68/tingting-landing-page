import { FiGift, FiShield, FiZap } from "react-icons/fi";
import { ScrollReveal, ScrollRevealItem } from "@/components/scroll-reveal";

const BENEFITS = [
  {
    icon: FiGift,
    title: "Miễn phí trọn đời",
    description: "Không mất phí tham gia, chỉ cần tham gia vào nhóm Zalo, gửi link sản phẩm.",
  },
  {
    icon: FiShield,
    title: "An toàn tuyệt đối",
    description: "Vẫn là link sản phẩm của người mua, chỉ gắn thêm Aff để nhận được hoa hồng.",
  },
  {
    icon: FiZap,
    title: "Tự động & nhanh chóng",
    description: "Bot xử lý tự động, trả link có hoa hồng ngay lập tức",
  },
];

export function Promotion() {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <span className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-600 dark:text-green-400 mb-4">
            FREE — Miễn phí trọn đời
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Tại sao chọn{" "}
            <span className="text-gradient">Ting Ting?</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15} className="grid md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <ScrollRevealItem
                key={benefit.title}
                className="rounded-2xl bg-surface-primary dark:bg-dark-primary p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-orange/10 dark:bg-brand-orange/20">
                  <Icon className="h-7 w-7 text-brand-orange" />
                </div>
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400">
                  {benefit.description}
                </p>
              </ScrollRevealItem>
            );
          })}
        </ScrollReveal>
      </div>
    </section>
  );
}
