export const ZALO_GROUP_LINK = "https://zalo.me/g/YOUR_GROUP_ID";

export const STATS = {
  members: { value: 100, suffix: "+", label: "Thành viên tin tưởng" },
  orders: { value: 300, suffix: "+", label: "Đơn hàng hoàn tiền thành công" },
  refunded: { value: 5, suffix: " triệu+", label: "VND đã hoàn cho thành viên" },
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
] as const;

export const FAQ_ITEMS = [
  {
    question: "Có mất phí tham gia không?",
    answer: "Hoàn toàn miễn phí! Bạn không cần trả bất kỳ chi phí nào để tham gia nhóm và sử dụng dịch vụ hoàn tiền.",
  },
  {
    question: "Hoàn tiền bao lâu?",
    answer: "Thời gian hoàn tiền theo chu kỳ của từng sàn thương mại. Shopee thường từ 30-45 ngày, TikTok Shop từ 15-30 ngày sau khi đơn hàng hoàn tất.",
  },
  {
    question: "Có an toàn không?",
    answer: "Hoàn toàn an toàn! Link sản phẩm vẫn là link chính hãng từ Shopee/TikTok Shop. Chúng tôi chỉ thêm mã affiliate để theo dõi hoa hồng, không ảnh hưởng đến đơn hàng của bạn.",
  },
  {
    question: "Áp dụng cho sàn thương mại nào?",
    answer: "Hiện tại hỗ trợ Shopee và TikTok Shop — hai sàn thương mại điện tử lớn nhất Việt Nam.",
  },
  {
    question: "Tiền hoàn về đâu?",
    answer: "Tiền hoàn sẽ được chuyển khoản trực tiếp vào tài khoản ngân hàng của bạn. Hỗ trợ tất cả ngân hàng tại Việt Nam.",
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Thành viên A.",
    content: "Mua điện thoại 10 triệu, được hoàn lại gần 300k. Chỉ cần gửi link là xong, dễ quá!",
    refundAmount: "~300,000đ",
  },
  {
    name: "Thành viên B.",
    content: "Tham gia 2 tháng, tổng hoàn được gần 1 triệu. Mua gì cũng gửi link trước, không mất gì mà được tiền.",
    refundAmount: "~1,000,000đ",
  },
  {
    name: "Thành viên C.",
    content: "Bot trả link nhanh lắm, gửi link xong 5 giây là có link mới. Rất tiện lợi!",
    refundAmount: "",
  },
] as const;
