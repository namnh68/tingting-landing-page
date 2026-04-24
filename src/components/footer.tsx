import { ZALO_GROUP_LINK } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-surface-tertiary dark:border-dark-tertiary bg-surface-secondary dark:bg-dark-secondary">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold text-gradient mb-2">
              Ting Ting
            </div>
            <p className="text-sm text-text-secondary dark:text-gray-400">
              Săn deal hời — Hoàn hoa hồng. Tiết kiệm thông minh với Shopee và TikTok Shop.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Liên kết</h4>
            <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
              <li>
                <a href="#how-it-works" className="hover:text-brand-orange transition-colors">
                  Cách hoạt động
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-brand-orange transition-colors">
                  So sánh lợi ích
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-orange transition-colors">
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href={ZALO_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-orange transition-colors"
                >
                  Nhóm Zalo
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 dark:text-white">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-400">
              <li>Zalo: Nhóm Ting Ting</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-surface-tertiary dark:border-dark-tertiary">
          <p className="text-xs text-text-muted text-center leading-relaxed">
            Disclaimer: Hoa hồng phụ thuộc vào chính sách affiliate của từng sàn thương mại
            (Shopee, TikTok Shop). Tỷ lệ hoàn và thời gian xử lý có thể thay đổi. Ting Ting
            hoàn lại 80% hoa hồng affiliate nhận được. Không phải là dịch vụ tài chính.
          </p>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Ting Ting. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
