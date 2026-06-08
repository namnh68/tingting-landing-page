export const ZALO_GROUP_LINK = "https://zalo.me/g/icqgkh803";
export const ZALO_PERSONAL_LINK = "https://zalo.me/0989210393";

export const STATS = {
  members: { value: 500, suffix: "+", label: "Thành viên tin tưởng" },
  orders: { value: 10000, suffix: "+", label: "Đơn hàng hoàn tiền thành công" },
  refunded: { value: 20, suffix: " triệu+", label: "VND đã hoàn cho thành viên hàng tháng" },
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Gửi link sản phẩm",
    description: "Gửi link sản phẩm từ Shopee hoặc TikTok, gửi vào nhóm Zalo VnTing.",
  },
  {
    step: 2,
    title: "Nhận link mua hàng",
    description: "Bot tự động gửi lại link mua hàng có tiền hoa hồng. Bạn mua hàng bình thường qua link này.",
  },
  {
    step: 3,
    title: "Nhận hoàn hoa hồng",
    description: "Đơn hàng thành công, bạn nhận lại tiền hoa hồng của đơn hàng đó.",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Cách hoạt động", href: "/#how-it-works" },
  { label: "So sánh", href: "/#comparison" },
  { label: "Đánh giá", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Bài viết", href: "/bai-viet" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Dịch vụ này là gì và tại sao tôi lại được nhận tiền?",
    answer:
      "Là mô hình hoàn tiền hoa hồng. Bạn mua hàng qua link có mã Aff của chúng tôi, chúng tôi nhận hoa hồng của sản phẩm bạn đã mua từ sàn (Shopee/TikTok), sau đó chia lại 80% số tiền đó cho bạn.",
  },
  {
    question: "Tiền hoa hồng có phải là tiền chênh giá so với thực tế mua hay không?",
    answer:
      "Hoàn toàn không. Bạn vẫn thao tác mua với giá bình thường. Khoản hoa hồng này được sàn và shop hỗ trợ thêm."
  },
  {
    question: "Tại sao lại chia tận 80% hoa hồng?",
    answer:
      "Chúng tôi muốn xây dựng cộng đồng lớn. Thay vì giữ tất cả, chúng tôi chia sẻ phần lớn lợi nhuận để bạn gắn bó lâu dài.",
  },
  {
    question: "Có được dùng thêm mã giảm giá (Voucher) không?",
    answer:
      "Có. Bạn vẫn dùng mã giảm giá, Freeship của sàn bình thường. Tiền hoàn là phần bạn nhận thêm. Và chúng tôi sẽ giúp bạn gắn mã 20-25% khi có chương trình của sàn.",
  },
  {
    question: "Tôi có phải chờ để nhận được link có hoa hồng không?",
    answer:
      "Không, khi bạn gửi link, sẽ có BOT gửi lại ngay lập tức, không làm mất cảm ứng mua sắm của bạn.",
  },
] as const;

export const TESTIMONIALS = [
{
    name: "Khánh An",
    content:
      "Mua điện thoại 5 triệu, được hoàn lại gần 300k. Chỉ cần gửi link là xong, dễ quá!",
    orderAmount: "5,000,000đ",
    refundAmount: "~300,000đ",
  },
  {
    name: "Bùi Ngọc",
    content:
      "Bot trả link ngay tức thì, không phải chờ đợi. Bot còn hỗ trợ kiểm tra đơn hàng, số dư tài khoản và chủ động rút tiền. Rất công nghệ và tiện lợi.",
    orderAmount: "",
    refundAmount: "",
  },
  {
    name: "Hồng Anh",
    content:
      "Tham gia 2 tháng, tổng hoàn được gần 1 triệu. Mua gì cũng gửi link trước, không mất gì mà được tiền.",
    orderAmount: "Nhiều đơn",
    refundAmount: "~1,000,000đ",
  },
  {
    name: "Khánh Linh",
    content:
      "Admin hỗ trợ nhiệt tình, thân thiện. Và hay được nhận thông báo Deal hời, mã giảm giá từ Admin. Quy trình đơn hàng, hoàn tiền minh bạch. Rất đáng tham gia!",
    orderAmount: "",
    refundAmount: "",
  },
] as const;

export const FEEDBACK_IMAGES = [
  {
    src: "/images/feedback/feedback-01.jpg",
    alt: "Thành viên hoàn tiền",
    caption: "Feedback thành viên",
  },
  {
    src: "/images/feedback/feedback-02.jpg",
    alt: "Hoàn tiền cho các thành viên trong nhóm",
    caption: "Hoàn tiền hoa hồng",
  },
  {
    src: "/images/feedback/feedback-03.png",
    alt: "Thành viên chia sẻ trải nghiệm nhóm VnTing",
    caption: "Bot gửi link cho thành viên",
  },
  {
    src: "/images/feedback/feedback-04.jpg",
    alt: "Thành viên chia sẻ trải nghiệm nhóm VnTing",
    caption: "Đơn hàng được nhận hoa hồng",
  },
] as const;
