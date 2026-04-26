export const ZALO_GROUP_LINK = "https://zalo.me/g/icqgkh803";

export const STATS = {
  members: { value: 100, suffix: "+", label: "Thành viên tin tưởng" },
  orders: { value: 1000, suffix: "+", label: "Đơn hàng hoàn tiền thành công" },
  refunded: { value: 10, suffix: " triệu+", label: "VND đã hoàn cho thành viên" },
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Gửi link sản phẩm",
    description: "Copy link sản phẩm từ Shopee hoặc TikTok Shop, gửi vào nhóm Zalo Ting Ting.",
  },
  {
    step: 2,
    title: "Nhận link hoàn tiền",
    description: "Bot tự động gửi lại link affiliate. Bạn mua hàng bình thường qua link này.",
  },
  {
    step: 3,
    title: "Nhận hoàn 80% hoa hồng",
    description: "Đơn hàng thành công, bạn nhận lại 80% hoa hồng affiliate. Chuyển khoản trực tiếp!",
  },
] as const;

export const NAV_ITEMS = [
  { label: "Cách hoạt động", href: "#how-it-works" },
  { label: "So sánh", href: "#comparison" },
  { label: "Đánh giá", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Bài viết", href: "/bai-viet" },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Dịch vụ này là gì và tại sao tôi lại được nhận tiền?",
    answer:
      "Là mô hình Hoàn tiền. Bạn mua hàng qua link của Bot, chúng tôi nhận hoa hồng từ sàn (Shopee/TikTok) và chia lại 80% số tiền đó cho bạn.",
  },
  {
    question: "Có mất phí tham gia không?",
    answer:
      "Hoàn toàn miễn phí. Bạn không phải trả bất kỳ chi phí nào để sử dụng Bot và tham gia nhóm."
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
      "Mua điện thoại 10 triệu, được hoàn lại gần 300k. Chỉ cần gửi link là xong, dễ quá!",
    orderAmount: "10,000,000đ",
    refundAmount: "~300,000đ",
  },
  {
    name: "Thanh Huyền",
    content:
      "Tham gia 2 tháng, tổng hoàn được gần 1 triệu. Mua gì cũng gửi link trước, không mất gì mà được tiền.",
    orderAmount: "Nhiều đơn",
    refundAmount: "~1,000,000đ",
  },
  {
    name: "Bùi Ngọc",
    content:
      "Bot trả link ngay tức thì, không phải chờ đợi. Rất tiện lợi!",
    orderAmount: "",
    refundAmount: "",
  },
   {
    name: "Hồng Anh",
    content:
      "Bot trả link ngay tức thì, không phải chờ đợi. Rất tiện lợi!",
    orderAmount: "",
    refundAmount: "",
  },
] as const;

export const FEEDBACK_IMAGES = [
  {
    src: "/images/feedback/feedback-01.jpg",
    alt: "Thành viên hoàn tiền thành công qua Ting Ting",
    caption: "Hoàn tiền đơn Shopee",
  },
  {
    src: "/images/feedback/feedback-02.jpg",
    alt: "Chat xác nhận hoàn tiền từ nhóm Ting Ting",
    caption: "Hoàn tiền đơn TikTok Shop",
  },
  {
    src: "/images/feedback/feedback-03.jpg",
    alt: "Thành viên chia sẻ trải nghiệm nhóm Ting Ting",
    caption: "Feedback thành viên",
  },
] as const;
