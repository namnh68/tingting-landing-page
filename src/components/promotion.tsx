import { FiGift, FiShield, FiZap } from "react-icons/fi";
import { ScrollReveal, ScrollRevealItem } from "@/components/scroll-reveal";

const BENEFITS = [
  {
    icon: FiGift,
    title: "Miễn phí trọn đời",
    description: "Không mất phí tham gia. Chỉ cần vào nhóm Zalo và gửi link sản phẩm.",
    gradient: "from-pink-500 to-rose-600",
  },
  {
    icon: FiShield,
    title: "An toàn tuyệt đối",
    description: "Vẫn là link sản phẩm gốc, chỉ gắn thêm mã Aff để nhận hoa hồng.",
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    icon: FiZap,
    title: "Tự động & nhanh chóng",
    description: "Bot xử lý tự động 24/7, trả link có hoa hồng ngay lập tức.",
    gradient: "from-amber-500 to-orange-600",
  },
];

export function Promotion() {
  return (
    <section className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Tại sao chọn <span className="text-gradient">VnTing?</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Đơn giản, minh bạch, và luôn vì lợi ích của bạn
          </p>
        </ScrollReveal>

        <ScrollReveal stagger staggerDelay={0.15} className="grid md:grid-cols-3 gap-6">
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <ScrollRevealItem
                key={benefit.title}
                className="rounded-2xl bg-surface-primary dark:bg-dark-primary p-7 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-md`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-secondary dark:text-gray-400 leading-relaxed">
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
