import { FiX, FiCheck } from "react-icons/fi";
import { ScrollReveal } from "@/components/scroll-reveal";

const COMPARISON_ROWS = [
  {
    feature: "Hoàn tiền",
    normal: "0%",
    tingting: "Lên đến 80% hoa hồng",
    normalBad: true,
  },
  {
    feature: "Giá sản phẩm",
    normal: "Giống nhau",
    tingting: "Giống nhau",
    normalBad: false,
  },
  {
    feature: "Bước thêm",
    normal: "Không",
    tingting: "Chỉ 1 bước gửi link",
    normalBad: false,
  },
  {
    feature: "Hỗ trợ",
    normal: "Tự lo",
    tingting: "24/7 trong nhóm Zalo",
    normalBad: true,
  },
  {
    feature: "Sàn thương mại",
    normal: "—",
    tingting: "Shopee, TikTok Shop",
    normalBad: true,
  },
];

export function Comparison() {
  return (
    <section id="comparison" className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            So sánh{" "}
            <span className="text-gradient">lợi ích</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Mua bình thường vs. Mua qua Ting Ting
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          {/* Desktop table */}
          <div className="hidden md:block overflow-hidden rounded-2xl border border-surface-tertiary dark:border-dark-tertiary">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-tertiary dark:bg-dark-tertiary">
                  <th className="px-6 py-4 text-left text-sm font-semibold dark:text-white">
                    Tiêu chí
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-text-secondary dark:text-gray-400">
                    Mua bình thường
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-brand-orange">
                    Mua qua Ting Ting
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i % 2 === 0
                        ? "bg-surface-primary dark:bg-dark-primary"
                        : "bg-surface-secondary dark:bg-dark-secondary"
                    }
                  >
                    <td className="px-6 py-4 text-sm font-medium dark:text-white">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-text-secondary dark:text-gray-400">
                      <span className="inline-flex items-center gap-1 justify-center">
                        {row.normalBad && <FiX className="h-4 w-4 text-red-500" />}
                        {row.normal}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-medium text-brand-orange dark:text-brand-yellow">
                      <span className="inline-flex items-center gap-1 justify-center">
                        <FiCheck className="h-4 w-4 text-green-500" />
                        {row.tingting}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-4">
            {COMPARISON_ROWS.map((row) => (
              <div
                key={row.feature}
                className="rounded-xl bg-surface-primary dark:bg-dark-primary p-4 shadow-sm"
              >
                <div className="text-sm font-semibold mb-2 dark:text-white">
                  {row.feature}
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="text-text-secondary dark:text-gray-400">
                    <div className="text-xs text-text-muted mb-1">Bình thường</div>
                    {row.normal}
                  </div>
                  <div className="text-brand-orange dark:text-brand-yellow font-medium">
                    <div className="text-xs text-text-muted mb-1">Ting Ting</div>
                    {row.tingting}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
