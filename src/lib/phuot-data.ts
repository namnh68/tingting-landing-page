// Dữ liệu cẩm nang phượt Hà Nội ⇌ Đà Nẵng 8N7Đ (hè 2026, gia đình 4 người).
// Nội dung & cấu trúc bám theo file lịch trình gốc. Giá vé/giờ mở cửa là mức
// tham khảo 2025–2026 — nên kiểm tra lại sát ngày đi.

// === Placeholder: điền thông tin thật ===
export const OG_IMAGE_PATH = "/og-phuot-ha-noi-da-nang.png"; // ảnh preview riêng cho trang cẩm nang (1200×630)

export const HERO_STATS = [
  { icon: "📅", text: "8 ngày 7 đêm" },
  { icon: "🛣️", text: "~1.700 km" },
  { icon: "👨‍👩‍👧‍👦", text: "4 thành viên" },
] as const;

// ---- Tổng quan: bảng hành trình 8 ngày ----
export type OverviewRow = {
  n: number;
  date: string; // "20/6 · T7"
  route: string;
  highlight: string;
  km: string; // "~510"
  sleep: string; // "🌙 Đồng Hới"
};

export const OVERVIEW: OverviewRow[] = [
  { n: 1, date: "20/6 · T7", route: "Hà Nội → Thiên Cầm → Đồng Hới", highlight: "Cao tốc, biển Thiên Cầm, ven biển Cửa Nhượng–Kỳ Xuân, hải sản Bao Cấp 1994, biển Nhật Lệ", km: "~510", sleep: "🌙 Đồng Hới" },
  { n: 2, date: "21/6 · CN", route: "Đồng Hới → Huế (ven biển Quảng Trị)", highlight: "Đặc sản Đồng Hới, cánh đồng điện gió Lệ Thủy, hải sản Cửa Tùng, Thành cổ QT – Vĩ tuyến 17, phố đêm Huế", km: "~195", sleep: "🌙 Huế" },
  { n: 3, date: "22/6 · T2", route: "Huế → An Bàng / Hội An", highlight: "Đại Nội Huế, đèo Hải Vân – Hải Vân Quan, biển An Bàng, phố cổ Hội An", km: "~130", sleep: "🌙 An Bàng" },
  { n: 4, date: "23/6 · T3", route: "Hội An → Đà Nẵng", highlight: "Biển An Bàng, rừng dừa Bảy Mẫu, Ngũ Hành Sơn, biển Mỹ Khê – Cầu Rồng", km: "~45", sleep: "🌙 Đà Nẵng" },
  { n: 5, date: "24/6 · T4", route: "Đà Nẵng (trọn ngày)", highlight: "Bán đảo Sơn Trà – Chùa Linh Ứng, tắm biển, chợ Hàn mua quà", km: "~40", sleep: "🌙 Đà Nẵng" },
  { n: 6, date: "25/6 · T5", route: "Đà Nẵng → Huế", highlight: "Sáng thư giãn Đà Nẵng, hầm Hải Vân – Lăng Cô, chiều tối khám phá Huế", km: "~100", sleep: "🌙 Huế" },
  { n: 7, date: "26/6 · T6", route: "Huế → Cửa Lò (Nghệ An)", highlight: "Cao tốc, chiều tắm biển Cửa Lò / VinWonders Cửa Hội, súp lươn xứ Nghệ", km: "~370", sleep: "🌙 Cửa Lò" },
  { n: 8, date: "27/6 · T7", route: "Cửa Lò → Hà Nội", highlight: "Cao tốc toàn tuyến, mua quà xứ Nghệ, về HN đầu giờ chiều", km: "~310", sleep: "🏠 Về nhà" },
];

// ---- Lưu ý chung cả chuyến ----
export const GENERAL_NOTES: { label: string; text: string }[] = [
  { label: "Lộ trình", text: "CHIỀU ĐI ưu tiên cảnh đẹp — đi cao tốc tới nút giao Cẩm Quan (Hà Tĩnh) rẽ vào biển Thiên Cầm, rồi men đường ven biển qua Cửa Nhượng – Kỳ Xuân; Ngày 2 đi ven biển Quảng Trị (Cửa Tùng) + điểm lịch sử. CHIỀU VỀ ưu tiên cao tốc Bắc–Nam cho nhanh & êm." },
  { label: "Mẹo ăn hải sản", text: "Hà Tĩnh ăn ở Kỳ Xuân / Hoành Sơn (bãi vắng, chill); Quảng Trị ăn bãi Trung Giang – Cửa Tùng (lùi về phía Cửa Tùng 1–2km ngon hơn); Lăng Cô ăn ở bãi biển hoặc cảng Chân Mây, TRÁNH đầm Lập An." },
  { label: "Thời tiết tháng 6", text: "Miền Trung nắng gắt, thường 36–40°C ban ngày. Mang kem chống nắng SPF50+, mũ, ô, và bạt che kính lái (bắt buộc — xe đỗ ngoài nắng rất nóng)." },
  { label: "Nếu có bé < 1 tuổi", text: "Xuất phát buổi sáng từ 8h (trừ Ngày 1 đi sớm 5h30). Nghỉ trưa dài mỗi ngày, mang địu/xe đẩy, dừng nghỉ mỗi 1,5–2h khi đi đường dài." },
  { label: "Áo phao khi tắm biển", text: "Nếu nhà có áo phao thì mang theo để tắm biển — sóng ở biển Nhật Lệ / Bảo Ninh khá mạnh." },
  { label: "Cao tốc", text: "Nên dán thẻ thu phí không dừng (ETC) và nạp sẵn tiền. Đổ đầy xăng trước các chặng dài." },
  { label: "Cho tài xế", text: "Lái các chặng dài dễ buồn ngủ, kém tỉnh táo — nên chuẩn bị sẵn playlist nhạc lái xe và đồ uống giúp tỉnh táo (cà phê, bò húc) để sẵn trong hộp/thùng mát. Thấy mệt thì tấp vào trạm nghỉ, đừng cố lái." },
  { label: "Đặt trước", text: "Đặt khách sạn trước (mùa hè cao điểm, riêng Cửa Lò dễ cháy phòng). Giá vé/giờ mở cửa là mức tham khảo 2025–2026, nên kiểm tra lại sát ngày đi." },
];

// ---- Lịch trình chi tiết ----
export type TRow = { time: string; act: string; map?: string; eat?: string; note?: string; km?: string };
export type Slot = { label: string; rows: TRow[] };
export type Day = {
  n: number;
  tag: string; // "T7 · 20/6"
  chip: string; // "Ngày 1 · Đồng Hới"
  title: string;
  meta: string;
  slots: Slot[];
  hotel: string;
};

export const DAYS: Day[] = [
  {
    n: 1,
    tag: "T7 · 20/6",
    chip: "Ngày 1 · Đồng Hới",
    title: "Hà Nội → Thiên Cầm → Đồng Hới (Quảng Bình)",
    meta: "~510 km · đi sớm 5h30 · chiều đi: cao tốc → Thiên Cầm → đường ven biển · Nghỉ đêm: Đồng Hới",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "05:30", act: "Xuất phát Hà Nội, đi cao tốc Bắc–Nam (Pháp Vân–Cầu Giẽ → Cao Bồ–Mai Sơn → Mai Sơn–QL45 → Nghi Sơn–Diễn Châu → Diễn Châu–Bãi Vọt → Bãi Vọt–Hàm Nghi), xuống nút giao Cẩm Quan (Cẩm Xuyên, Hà Tĩnh).", eat: "Đổ đầy xăng tối hôm trước; đồ ăn nhẹ, sữa cho bé", note: "Đi sớm để né nắng & kịp lịch. Ăn sáng tại trạm dừng cao tốc. Che bạt kính khi dừng.", km: "HN → Thiên Cầm ~380 km" },
        { time: "~08:30", act: "Nghỉ giải lao tại trạm dừng cao tốc (Nghệ An / Hà Tĩnh): vệ sinh, cà phê, bé vận động.", note: "Nghỉ ~20 phút. Nghỉ mỗi 1,5–2h cho bé." },
        { time: "10:30", act: "Biển Thiên Cầm (Cẩm Xuyên, Hà Tĩnh): bãi cát mịn thoai thoải, còn hoang sơ. Dạo biển, chụp ảnh, bé nghịch cát mép nước.", map: "Bãi biển Thiên Cầm Cẩm Xuyên Hà Tĩnh", note: "Từ nút giao Cẩm Quan vào Thiên Cầm ~15km. Nắng gắt — mũ, ô, kem chống nắng.", km: "~15 km" },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:30", act: "Đi đường ven biển Hà Tĩnh: Thiên Cầm → ghé Hải đăng Cửa Nhượng (chụp ảnh) → Kỳ Xuân. Cung ven biển ngắm cảnh rất đẹp.", map: "Hải đăng Cửa Nhượng Hà Tĩnh", note: "Đường ven biển thoáng, ít xe.", km: "~30 km" },
        { time: "12:15", act: "Ăn trưa + nghỉ tại Nhà hàng Hải sản Bao Cấp 1994 (ngay bãi Kỳ Xuân). Ăn xong nằm võng nghỉ ~30–45 phút.", map: "https://maps.app.goo.gl/L4fzG6E27mX1ppxcA", eat: "Hải sản tươi: ghẹ, mực, tôm, cá (~200–400k/người) · Bao Cấp 1994 – 0358571276", note: "Dự phòng: Hải sản Dân Hường 0919973458." },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "14:15", act: "Kỳ Xuân → Đồng Hới: qua Kỳ Anh – Đèo Ngang (cung QL1A/ven biển, cảnh đẹp). Có thể ra lại cao tốc nếu muốn nhanh.", note: "Đèo Ngang ngắn, cảnh đẹp.", km: "~105 km" },
        { time: "16:30", act: "Nhận phòng khách sạn (gần biển Nhật Lệ / Bảo Ninh). Tắm rửa, thay đồ.", note: "Che bạt kính khi gửi xe. Đặt phòng trước (T7 cao điểm)." },
        { time: "17:00", act: "Tắm biển Nhật Lệ (chiều mát, ánh sáng đẹp). Có ghế + ô cho thuê.", map: "Bãi biển Nhật Lệ Đồng Hới", note: "Áo phao cho bé lớp 2. Bé 1 tuổi chỉ nghịch cát/mép nước. Ghế 25k, tắm nước ngọt 8k." },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "19:00", act: "Ăn tối đặc sản Đồng Hới tại Nhà hàng Nhàn Bistro. Dạo bờ kè sông Nhật Lệ nếu bé còn khỏe.", map: "https://maps.app.goo.gl/siS5XEftNbzo4vsF6", eat: "Nhàn Bistro (nhà hàng, đặc sản Quảng Bình) · hải sản Nhà hàng Hằng (tươi)", note: "Gọi đặt bàn trước. Ngủ trước 22h để mai đỡ mệt." },
      ] },
    ],
    hotel: "Ngủ Đồng Hới (600k–2tr): Riverside / SAM Hotel (3★ giá tốt) · Phương Bắc Luxury (sát biển + hồ bơi) · Mường Thanh Holiday 4★ (khu vui chơi trẻ em). Đặt trước — T7 cao điểm.",
  },
  {
    n: 2,
    tag: "CN · 21/6",
    chip: "Ngày 2 · Huế",
    title: "Đồng Hới → Huế (ven biển Quảng Trị)",
    meta: "~195 km · lái ~4h · ven biển Quảng Trị + điểm lịch sử · xuất phát 8h · Nghỉ đêm: Huế",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "08:00", act: "Ăn sáng đặc sản Đồng Hới.", eat: "Cháo canh Bà Hồng – 51 Nguyễn Hữu Cảnh (bán sáng) · cơm gà đồi – 134 Lý Thường Kiệt · nem lụi/bún thịt nướng", note: "Cháo canh bán tới ~10h là hết — ăn sớm." },
        { time: "08:45", act: "Chơi nhẹ: đồi cát Quang Phú (chơi cát, chụp ảnh) hoặc biển Bảo Ninh yên tĩnh.", map: "Đồi cát Quang Phú Đồng Hới", note: "Sáng sớm mát, hợp bé. Chọn 1 điểm." },
        { time: "09:30", act: "Trả phòng, lên đường." },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "09:45", act: "Đồng Hới → ven biển Quảng Trị (Cửa Tùng / Cửa Việt) theo QL1A.", eat: "Mang nước mát, đồ ăn nhẹ; bé có thể ngủ trên xe", note: "Che bạt kính khi dừng. Nghỉ 1 lần cho bé.", km: "~90 km" },
        { time: "~10:15", act: "Trên đường xuôi Nam, ghé check-in Cánh đồng điện gió Lệ Thủy (cụm điện gió B&T) — 60 tua-bin khổng lồ giữa đồi cát trắng, cách Đồng Hới ~20km. Vào tự do, không mất vé.", map: "https://maps.app.goo.gl/mLtC9HFpw6RJyD1P9", note: "Đẹp nhất lúc bình minh/hoàng hôn; sáng nắng còn dịu, hợp chụp ảnh. Cát nắng gắt — mũ, nước, kem chống nắng.", km: "~20 km" },
        { time: "11:30", act: "Ăn trưa hải sản tại bãi biển Trung Giang (gần cầu Cửa Tùng) — ngon, bổ, rẻ; tắm biển ngắn cho bé.", map: "Bãi biển Trung Giang Cửa Tùng Quảng Trị", eat: "Hải sản bãi Trung Giang, Cửa Tùng – 0944363357", note: "Mẹo: Cửa Việt lùi về phía Cửa Tùng 1–2km có bãi đẹp + quán ngon hơn. Áo phao cho bé.", km: "~5 km" },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "13:15", act: "Tham quan lịch sử: Vĩ tuyến 17 – Cầu Hiền Lương (đôi bờ Bến Hải) & Thành cổ Quảng Trị.", map: "Cầu Hiền Lương Vĩ tuyến 17 Quảng Trị", note: "Điểm lịch sử ý nghĩa. Đi nhẹ nhàng vì trưa nắng; mang mũ, nước.", km: "~30 km" },
        { time: "14:30", act: "Quảng Trị → Huế. Nhận phòng khách sạn, nghỉ ngơi cho bé.", km: "~60 km" },
        { time: "16:30", act: "Ăn chè Thanh — phố Mai Thúc Loan, Huế.", map: "https://maps.app.goo.gl/Czw5KYagqXLFYPxb6", eat: "Chè Huế nhiều loại, món tráng miệng chiều mát." },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "18:00", act: "Ăn tối Bún bò Huế Bà Nga (đường Nguyễn Chí Diểu) — bún bò rất ngon. Sau đó dạo Huế về đêm: phố đi bộ Nguyễn Đình Chiểu, cầu gỗ lim sông Hương, chợ đêm.", map: "https://maps.app.goo.gl/tkJ1oBM6ZPG2Uv74A", eat: "Bún bò Huế Bà Nga – đường Nguyễn Chí Diểu", note: "Tối Huế mát, dễ chịu. Dùng xe đẩy cho bé 1 tuổi." },
      ] },
    ],
    hotel: "Ngủ Huế (600k–2tr): Gardenia (phố đi bộ) · Rosaleen Boutique (hồ bơi, cách sông Hương 5') · Kinh Kỳ · Alba Spa / Thanh Lịch Royal.",
  },
  {
    n: 3,
    tag: "T2 · 22/6",
    chip: "Ngày 3 · An Bàng",
    title: "Huế → An Bàng / Hội An (qua đèo Hải Vân)",
    meta: "~130 km · lái ~3h (đường đèo) · xuất phát 8h · Nghỉ đêm: An Bàng",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "08:00", act: "Ăn sáng bánh mì Trường Tiền – O Tho.", eat: "Bánh mì Trường Tiền – O Tho" },
        { time: "08:30", act: "Tham quan Đại Nội Huế (Hoàng thành). Đi sớm khi còn mát, thuê xe điện trong khu di tích cho đỡ mỏi chân với bé.", map: "Đại Nội Huế", note: "Vé 2026: người lớn 200k; bé 7–12 tuổi 40k; dưới 7 tuổi miễn phí. Mở cửa từ 7h." },
        { time: "11:00", act: "Về khách sạn trả phòng." },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:30", act: "Ăn trưa đặc sản Huế trước khi lên đường.", eat: "Bánh bèo–nậm–lọc: Bà Đỏ – 1 Nguyễn Bỉnh Khiêm · Quán Hạnh – 11–15 Phó Đức Chính" },
        { time: "12:45", act: "Huế → An Bàng qua đèo Hải Vân: ngắm vịnh Lăng Cô, dừng check-in Hải Vân Quan (pháo đài 1826, view 2 phía Lăng Cô – Đà Nẵng). Xuống đèo → xuyên Đà Nẵng → Hội An.", map: "Hải Vân Quan", note: "Hải Vân Quan mở tới ~17h30. Đèo nhiều cua — bé dễ SAY XE, mang thuốc/túi nôn. Đổ đèo đi số thấp, hạn chế rà phanh.", km: "~130 km" },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "16:00", act: "Nhận phòng homestay An Bàng. Tắm biển An Bàng (sóng êm hơn, hợp gia đình).", map: "Bãi biển An Bàng Hội An", note: "Áo phao cho bé lớp 2. Biển chiều mát." },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "18:00", act: "Ăn tối + dạo Phố cổ Hội An: đèn lồng, thả đèn hoa đăng sông Hoài, chụp ảnh.", map: "Phố cổ Hội An", eat: "Cao lầu Bá Lễ – 21 Thái Phiên · Cao lầu Hồng – Thái Phiên · mì Quảng Ông Hai", note: "Gửi xe ngoài phố cổ (~20k). Bé dùng địu/xe đẩy. Vé phố cổ 80k/khách VN (trẻ nhỏ miễn phí).", km: "An Bàng ↔ phố cổ ~4 km" },
      ] },
    ],
    hotel: "Ngủ An Bàng/Hội An (500k–2tr): Lemongrass Homestay (hồ bơi) · An Bang Beach Dolphin (sát biển) · Nalani · DragonSea / An Bang Garden (phòng rộng).",
  },
  {
    n: 4,
    tag: "T3 · 23/6",
    chip: "Ngày 4 · Đà Nẵng",
    title: "Hội An → Đà Nẵng",
    meta: "~45 km · lái ~1h · xuất phát 8h · Nghỉ đêm: Đà Nẵng",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "06:30", act: "(Tùy chọn – 1 người) Đi chợ An Bàng buổi sáng mua hải sản tươi, cà phê view biển.", note: "Không bắt buộc; cả nhà có thể ngủ thêm." },
        { time: "08:00", act: "Cả nhà: tắm biển An Bàng buổi sáng (mát) hoặc cà phê view biển thư giãn.", eat: "Ăn sáng: bánh mì Phượng – 2B Phan Châu Trinh · bánh mì Madam Khánh · cơm gà Bà Buội" },
        { time: "09:30", act: "Rừng Dừa Bảy Mẫu (Cẩm Thanh): trải nghiệm thuyền thúng ~1h — bé lớp 2 rất thích.", map: "Rừng dừa Bảy Mẫu Cẩm Thanh Hội An", note: "Vé cổng ~30k; thuyền thúng 150–200k/người.", km: "~7 km" },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:30", act: "Ăn trưa Hội An trước khi rời đi.", eat: "Cơm gà Giếng Đình – 9 Phan Châu Trinh · Cơm gà Bà Buội · mì Quảng", note: "Trưa Hội An nóng — chọn quán mát." },
        { time: "12:30", act: "Di chuyển Hội An → Đà Nẵng. Nhận phòng khách sạn gần biển Mỹ Khê.", km: "~28 km" },
        { time: "13:15", act: "Nghỉ trưa tại khách sạn (bé ngủ). Có thể bơi hồ khách sạn.", note: "Nghỉ tránh nắng đỉnh điểm ~35°C." },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "15:30", act: "Ngũ Hành Sơn (Thủy Sơn): chùa, hang động, view thành phố. Đi thang máy lên cho đỡ leo bậc.", map: "Ngũ Hành Sơn Đà Nẵng", note: "Vé 40k; HS 10k; dưới 6 tuổi miễn phí; thang máy 15k/lượt. Đi lúc bớt nóng.", km: "~8 km" },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "17:30", act: "Hoàng hôn biển Mỹ Khê (một trong những bãi đẹp nhất). Dạo chơi, bé nghịch cát.", map: "Bãi biển Mỹ Khê Đà Nẵng", note: "Bãi miễn phí, ghế 50–100k." },
        { time: "18:30", act: "Ăn tối tại Hải sản Năm Đảnh — quán ngon, bổ, rẻ.", map: "https://maps.app.goo.gl/su28Wk7ykz3LwEJi8", eat: "Hải sản tươi giá hợp lý · hoặc bánh tráng thịt heo Cốm Đại Lộc – 103 Trưng Nữ Vương · bún chả cá Bà Phiến" },
        { time: "19:30", act: "Ngắm Cầu Rồng, cầu Tình Yêu, tượng Cá chép hóa rồng.", map: "Cầu Rồng Đà Nẵng", note: "Cầu Rồng phun lửa/nước chỉ tối T7–CN 21h (hôm nay T3 không có show)." },
      ] },
    ],
    hotel: "Ngủ Đà Nẵng – 3 đêm (600k–2tr): Sunlit Sea (căn hộ rộng, hồ bơi) · Soho Boutique (phòng 28–60m²) · Dylan / Lotus Rock · Adaline / Sekong.",
  },
  {
    n: 5,
    tag: "T4 · 24/6",
    chip: "Ngày 5 · Đà Nẵng",
    title: "Đà Nẵng (trọn ngày khám phá)",
    meta: "nội đô ~40 km · xuất phát 8h · Nghỉ đêm: Đà Nẵng",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "08:00", act: "Ăn sáng đặc sản Đà Nẵng.", eat: "Mì Quảng Bà Mua – 19–21 Trần Bình Trọng · Mì Xứ Quảng – 02 Phan Đăng Lưu · bún chả cá Ông Tạ" },
        { time: "08:40", act: "Bán đảo Sơn Trà: Chùa Linh Ứng (tượng Phật Bà 67m, miễn phí), đỉnh Bàn Cờ (view toàn Đà Nẵng), ngắm khỉ/voọc, bãi Rạng. Chủ yếu đi ô tô — hợp bé.", map: "Chùa Linh Ứng Sơn Trà Đà Nẵng", note: "Đi buổi sáng khi mát & ít mây. Đường lên đèo dốc, lái cẩn thận. Ăn mặc kín đáo khi vào chùa.", km: "~15 km" },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:30", act: "Ăn trưa.", eat: "Hải sản Bé Mặn / Bé Anh · hoặc mì Quảng Bà Vị – 166 Lê Đình Dương" },
        { time: "12:30", act: "Nghỉ trưa tại khách sạn (bé ngủ), bơi hồ hoặc spa/massage cho bố mẹ.", note: "Nghỉ dài tránh nắng đỉnh điểm." },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "15:00", act: "Chọn 1: Bảo tàng 3D Art in Paradise (trong nhà, mát, bé thích) HOẶC tắm biển Mỹ Khê / Công viên Biển Đông.", map: "Art in Paradise Đà Nẵng", note: "Vé bảo tàng 3D ~140k NL / 100k trẻ. Bà Nà Hills (Cầu Vàng) cần dành trọn 1 ngày riêng — khá mệt với bé 1 tuổi." },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "17:00", act: "Chợ Hàn mua đặc sản làm quà.", map: "Chợ Hàn Đà Nẵng", eat: "Mua: bánh khô mè, mực rim, đặc sản Đà Nẵng", note: "Ăn tối và nghỉ ngơi tại Đà Nẵng." },
      ] },
    ],
    hotel: "Ngủ Đà Nẵng (tiếp tục ở khách sạn Ngày 4).",
  },
  {
    n: 6,
    tag: "T5 · 25/6",
    chip: "Ngày 6 · Huế",
    title: "Đà Nẵng → Huế (qua hầm Hải Vân)",
    meta: "~100 km · lái ~2h · ngày nhẹ nhàng · xuất phát 8h · Nghỉ đêm: Huế",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "08:00", act: "Ăn sáng.", eat: "Mì Quảng Bà Vị – 166 Lê Đình Dương · bún chả cá Bà Phiến – 63 Lê Hồng Phong · cà phê Đà Nẵng" },
        { time: "08:40", act: "Sáng cuối ở Đà Nẵng: tắm biển Mỹ Khê lần cuối / cà phê view Sơn Trà / mua quà bổ sung.", note: "Ngày nhẹ, không vội." },
        { time: "10:45", act: "Về khách sạn trả phòng.", note: "Kiểm tra hành lý, không để quên đồ." },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:15", act: "Đà Nẵng → Huế qua hầm Hải Vân (nhanh, bé đỡ say xe). Đổi vị: dừng ăn trưa quán ven đường khu Lộc An – Phú Lộc.", map: "Bánh ướt heo quay Bà Sửu QL1A Lộc An Phú Lộc Huế", eat: "Bánh ướt heo quay Bà Sửu – QL1A, Lộc An, Phú Lộc (heo quay ăn kèm rau sống, đồ chua; ngon bổ rẻ, tiện chặng đường dài)", note: "Hầm Hải Vân nhanh & an toàn hơn đèo cho chiều về.", km: "~100 km" },
        { time: "13:15", act: "Tới Huế, nhận phòng khách sạn." },
        { time: "14:00", act: "Nghỉ trưa cho bé." },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "16:00", act: "Khám phá thêm Huế: một lăng vua gần trung tâm (lăng Tự Đức / lăng Khải Định) HOẶC dạo Đại Nội buổi chiều, hoặc thuyền sông Hương.", map: "Lăng Khải Định Huế", note: "Lăng tẩm có vé riêng (~150k/lăng, bé nhỏ miễn/giảm). Chọn 1 điểm cho nhẹ nhàng." },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "18:00", act: "Ăn tối bánh ép tại Bánh ép Gia Di (04 Phùng Chí Kiên) — quán bánh ép nổi tiếng nhất nhì Huế.", map: "https://maps.app.goo.gl/NohNhHyRgigeN7wEA", eat: "Bánh ép bột lọc ép nóng với trứng, pate, thịt/tôm; ăn kèm rau răm, đu đủ chua ngọt, mắm cay. Menu đa dạng: hàu phô mai, trứng cút nướng, bánh tráng trứng…", note: "Đồ ăn ngon, lạ, quán rộng — đông khách." },
        { time: "19:30", act: "Dạo phố đêm Huế và chợ Đông Ba buổi tối.", map: "Chợ Đông Ba Huế", note: "Đêm cuối ở Huế — thử nốt đặc sản Huế." },
      ] },
    ],
    hotel: "Ngủ Huế (600k–2tr): như Ngày 2 — có thể đặt lại đúng khách sạn cũ cho tiện.",
  },
  {
    n: 7,
    tag: "T6 · 26/6",
    chip: "Ngày 7 · Cửa Lò",
    title: "Huế → Cửa Lò (Nghệ An)",
    meta: "~370 km · lái ~5–6h · chiều về ưu tiên cao tốc · xuất phát 7h30 · Nghỉ đêm: Cửa Lò",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "07:00", act: "Ăn sáng, trả phòng.", eat: "Bún bò Bà Tuyết – 47 Nguyễn Công Trứ · Mệ Kéo – 20 Bạch Đằng · hoặc bánh mì Trường Tiền" },
        { time: "07:30", act: "Xuất phát Huế → Cửa Lò, ưu tiên cao tốc Bắc–Nam (Cam Lộ–La Sơn → Vạn Ninh–Bùng → Bùng–Vũng Áng → Vũng Áng–Hàm Nghi → Bãi Vọt–Diễn Châu).", eat: "Đồ ăn nhẹ, nước mát, sữa cho bé", note: "Cao tốc nhanh & êm hơn QL1A. Nghỉ mỗi 1,5–2h. Che bạt kính khi dừng.", km: "~120 km" },
        { time: "09:30", act: "Nghỉ giải lao trạm dừng cao tốc (Quảng Bình): vệ sinh, cà phê, bé vận động." },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:30", act: "Ăn trưa khu vực Hà Tĩnh (gần nút giao cao tốc). Nghỉ ngơi cho bé sau ăn.", eat: "Cơm bình dân / hải sản Hà Tĩnh", km: "~150 km" },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "14:00", act: "Tới Cửa Lò (xuống nút giao Diễn Châu → TP Vinh → Cửa Lò), nhận phòng khách sạn gần biển. Nghỉ ngơi.", note: "Mùa hè Cửa Lò rất đông — ĐẶT PHÒNG TRƯỚC ≥2 tuần.", km: "~100 km" },
        { time: "15:30", act: "Chọn 1: Tắm biển Cửa Lò (bãi cát thoai thoải – hợp bé) HOẶC VinWonders Cửa Hội (cáp treo vượt biển ra đảo Hòn Ngư, công viên nước – bé lớp 2 rất thích).", map: "Biển Cửa Lò Nghệ An", note: "VinWonders cần ~nửa ngày; nếu chọn thì rút ngắn nghỉ. Áo phao cho bé." },
      ] },
      { label: "🌙 Tối", rows: [
        { time: "18:30", act: "Ăn tối hải sản + đặc sản xứ Nghệ. Có thể đi câu mực đêm (tùy chọn).", eat: "Súp/cháo lươn: Bà Lan (Vinh) · Xoan Tường (SVĐ Vinh); tại Cửa Lò: Lươn Đồng Thảo/Quỳnh – Mai Thúc Loan · hải sản Hương Sơn 69", note: "Đêm biển mát mẻ. Ngủ sớm để mai về." },
      ] },
    ],
    hotel: "Ngủ Cửa Lò (600k–2tr): Bình Minh 3★ · Kingdom · Thái An (phòng gia đình 4–5 người) · Mường Thanh Grand 4★. ĐẶT ≥2 TUẦN — rất dễ cháy phòng.",
  },
  {
    n: 8,
    tag: "T7 · 27/6",
    chip: "Ngày 8 · Về HN",
    title: "Cửa Lò → Hà Nội (về nhà)",
    meta: "~310 km · lái ~4,5h · ưu tiên cao tốc toàn tuyến · xuất phát 8h · về HN đầu giờ chiều",
    slots: [
      { label: "🌅 Sáng", rows: [
        { time: "06:30", act: "(Tùy chọn) Tắm biển Cửa Lò buổi sáng sớm lần cuối.", note: "Biển sáng vắng, mát." },
        { time: "07:30", act: "Ăn sáng, trả phòng. Nếu qua TP Vinh có thể ăn súp/cháo lươn xứ Nghệ.", eat: "Súp/cháo lươn: Bà Lan – 2 Trần Hưng Đạo · Xoan Tường – SVĐ Vinh" },
        { time: "08:15", act: "Mua quà đặc sản xứ Nghệ trước khi về.", eat: "Cu đơ Hà Tĩnh, tương Nam Đàn, bánh gai, mực khô" },
        { time: "08:45", act: "Xuất phát Cửa Lò → Hà Nội, đi cao tốc toàn tuyến (Diễn Châu–Bãi Vọt ngược ra Nghi Sơn–QL45–Mai Sơn–Cao Bồ–Cầu Giẽ–Pháp Vân).", note: "Cao tốc nhanh & thẳng, tránh QL1A đông." },
      ] },
      { label: "☀️ Trưa", rows: [
        { time: "11:30", act: "Ăn trưa khu vực Thanh Hóa / Ninh Bình (gần nút giao cao tốc). Nghỉ ngơi cho bé.", eat: "Cơm / bún – gần nút giao cao tốc", note: "Dừng ~15–20 phút rồi đi tiếp.", km: "~150 km" },
      ] },
      { label: "🌤️ Chiều", rows: [
        { time: "13:30", act: "Về tới Hà Nội. Kết thúc hành trình! 🎉", note: "Còn nguyên buổi chiều nghỉ ngơi. Rửa xe hôm sau.", km: "~160 km" },
      ] },
    ],
    hotel: "Về nhà.",
  },
];

// ---- Quán ăn ----
export type FoodCard = { city: string; dish: string; shops: string; note: string };
export const FOOD: FoodCard[] = [
  { city: "Đồng Hới", dish: "Cháo canh (đặc sản sáng)", shops: "Bà Hồng – 51 Nguyễn Hữu Cảnh · Gia Bảo – 08 Lý Thường Kiệt · O Hạnh – 04 Lê Thành Đồng", note: "Chỉ bán sáng, ~6–10h là hết. Sợi bột gạo dai, có chả ram/chả bò." },
  { city: "Đồng Hới", dish: "Hải sản", shops: "Nhàn Bistro · Nhà hàng Hằng · các quán ven biển Bảo Ninh", note: "Tươi, giá hợp lý. Gọi đặt bàn trước buổi tối." },
  { city: "Huế", dish: "Bún bò Huế", shops: "Bà Nga – Nguyễn Chí Diểu (rất ngon) · Bà Tuyết – 47 Nguyễn Công Trứ (6–11h) · Mệ Kéo – 20 Bạch Đằng (6–10h)", note: "Ngon nhất buổi sáng; nước dùng đậm vị ruốc, sả." },
  { city: "Huế", dish: "Cơm hến", shops: "Bà Cam – Nguyễn Huệ · Thu Hiền – Phan Bội Châu · 17 Hàn Mặc Tử", note: "Món dân dã, cay — gọi ít ớt cho bé." },
  { city: "Huế", dish: "Bánh bèo – nậm – lọc", shops: "Bà Đỏ – 1 Nguyễn Bỉnh Khiêm · Quán Hạnh – 11–15 Phó Đức Chính · Bánh Chi", note: "Quán Hạnh có cả nem lụi, không gian rộng hợp gia đình." },
  { city: "Huế", dish: "Chè Huế", shops: "Hẻm chè Hùng Vương (29 Hùng Vương) · chè Ông Lạc", note: "Tráng miệng buổi tối, nhiều loại chè." },
  { city: "Huế", dish: "Bánh ép", shops: "Gia Di – 04 Phùng Chí Kiên", note: "Bánh ép bột lọc ép nóng (trứng, pate, thịt/tôm), ăn kèm rau răm, đu đủ chua ngọt, mắm cay. Quán rộng, khách đông; menu có cả hàu phô mai, trứng cút nướng." },
  { city: "Hội An", dish: "Cao lầu", shops: "Cao lầu Bá Lễ – 21 Thái Phiên · Cao lầu Hồng – Thái Phiên · Cao lầu Thanh", note: "Món đặc trưng chỉ Hội An mới có." },
  { city: "Hội An", dish: "Cơm gà", shops: "Bà Buội – 22 Phan Châu Trinh · Giếng Đình – 9 Phan Châu Trinh · Bà Nga", note: "Quán lâu năm, đông trưa." },
  { city: "Hội An", dish: "Mì Quảng & Bánh mì", shops: "Mì Quảng Ông Hai – 6A Trương Minh Lượng · Bánh mì Phượng – 2B Phan Châu Trinh · Bánh mì Madam Khánh", note: "Bánh mì Phượng rất đông — đi sáng sớm / chiều muộn." },
  { city: "Đà Nẵng", dish: "Mì Quảng", shops: "Bà Mua – 19–21 Trần Bình Trọng · Bà Vị – 166 Lê Đình Dương · Mì Xứ Quảng – 02 Phan Đăng Lưu", note: "Sợi mì dai, topping tôm thịt đầy đặn." },
  { city: "Đà Nẵng", dish: "Bún chả cá", shops: "Ông Tạ · Bà Phiến – 63 Lê Hồng Phong", note: "Món sáng ngon, nước dùng ngọt thanh từ xương cá." },
  { city: "Đà Nẵng", dish: "Bánh tráng cuốn thịt heo", shops: "Cốm Đại Lộc – 103 Trưng Nữ Vương · Đặc sản Trần · Mậu", note: "Chấm mắm nêm đặc trưng." },
  { city: "Đà Nẵng", dish: "Hải sản", shops: "Năm Đảnh (ngon bổ rẻ) · Bé Mặn · Bé Anh · Cua Biển", note: "Ven biển Mỹ Khê / Võ Nguyên Giáp, hải sản tươi." },
  { city: "Lăng Cô (ĐN↔Huế)", dish: "Hải sản Lăng Cô", shops: "Các quán ven biển Lăng Cô / cảng Chân Mây (tránh đầm Lập An)", note: "Ăn trưa chặng ĐN→Huế; hàu, tôm tươi." },
  { city: "Vinh – Cửa Lò", dish: "Súp / cháo lươn", shops: "Bà Lan – 2 Trần Hưng Đạo (Vinh) · Xoan Tường – SVĐ Vinh · Sỹ Bính – Đào Tấn (Vinh)", note: "Đặc sản xứ Nghệ; nếu ghé TP Vinh nên ăn tại đây." },
  { city: "Cửa Lò", dish: "Lươn & hải sản", shops: "Lươn Đồng Thảo / Lươn niêu Quỳnh – Mai Thúc Loan · NH Hương Sơn 69 · Padma", note: "Tại Cửa Lò tiện đường, không gian rộng." },
];

// ---- Chỗ nghỉ ----
export type StayCard = { area: string; name: string; price: string; note: string };
export const STAY: StayCard[] = [
  { area: "Đồng Hới · 1 đêm", name: "Riverside Hotel Quảng Bình (3★)", price: "~600k–1,1tr/đêm", note: "Gần sông Nhật Lệ, yên tĩnh, giá tốt — hợp 1 đêm." },
  { area: "Đồng Hới · 1 đêm", name: "SAM Quảng Bình Hotel (3★)", price: "~600k–1,2tr/đêm", note: "Trung tâm, sạch đẹp, tiện nghi đầy đủ." },
  { area: "Đồng Hới · 1 đêm", name: "Phương Bắc Luxury Hotel", price: "~800k–1,7tr/đêm", note: "Sát biển Nhật Lệ, hồ bơi ngoài trời, xe đạp miễn phí." },
  { area: "Đồng Hới · 1 đêm", name: "Mường Thanh Holiday Quảng Bình (4★)", price: "~1–2tr/đêm", note: "Sát biển, hồ bơi, khu vui chơi trẻ em — hợp gia đình." },
  { area: "Huế · 2 đêm", name: "Gardenia Hue Hotel", price: "~600k–1tr/đêm", note: "Trong khu phố đi bộ, yên tĩnh, giá mềm." },
  { area: "Huế · 2 đêm", name: "Rosaleen Boutique Hotel", price: "~650k–1,3tr/đêm", note: "36 Chu Văn An, cách sông Hương 5' đi bộ, hồ bơi tầng 2, phòng rộng có ban công." },
  { area: "Huế · 2 đêm", name: "Khách sạn Kinh Kỳ", price: "~700k–1,4tr/đêm", note: "Trung tâm, tiện đi bộ ăn tối." },
  { area: "Huế · 2 đêm", name: "Alba Spa · Thanh Lịch Royal", price: "~900k–1,8tr/đêm", note: "Gần sông Hương, có spa/hồ bơi, phòng đẹp." },
  { area: "An Bàng / Hội An · 1 đêm", name: "Hoi An Lemongrass Homestay", price: "~500k–700k/đêm", note: "Hồ bơi, lớp nấu ăn, thuê xe đạp miễn phí; giá rẻ." },
  { area: "An Bàng / Hội An · 1 đêm", name: "An Bang Beach Dolphin Homestay", price: "~700k–1,3tr/đêm", note: "Cách biển 2' đi bộ, hồ bơi + bãi biển riêng." },
  { area: "An Bàng / Hội An · 1 đêm", name: "Nalani Homestay", price: "~600k–1,2tr/đêm", note: "Gần biển, hồ bơi nhỏ sân vườn, yên tĩnh." },
  { area: "An Bàng / Hội An · 1 đêm", name: "DragonSea · An Bang Garden Homestay", price: "~800k–2tr/đêm", note: "Phòng rộng có hiên/sân vườn, hợp gia đình." },
  { area: "Đà Nẵng · 3 đêm", name: "Sunlit Sea Hotel & Apartment", price: "~600k–1,2tr/đêm", note: "Cách biển Mỹ Khê 200m, hồ bơi, buffet sáng; có phòng căn hộ rộng." },
  { area: "Đà Nẵng · 3 đêm", name: "Soho Boutique Hotel", price: "~600k–1,3tr/đêm", note: "Hồ bơi ngoài trời, phòng 28–60m² — rộng cho gia đình." },
  { area: "Đà Nẵng · 3 đêm", name: "Dylan Hotel · Lotus Rock 05", price: "~650k–1,4tr/đêm", note: "Gần biển, hồ bơi tầng thượng view biển." },
  { area: "Đà Nẵng · 3 đêm", name: "Adaline Hotel & Suite · Sekong Hotel", price: "~750k–1,8tr/đêm", note: "Cách biển 300–500m, hồ bơi, buffet sáng — ở 3 đêm thoải mái." },
  { area: "Cửa Lò · 1 đêm", name: "Bình Minh Hotel (3★)", price: "~600k–1,2tr/đêm", note: "Cách biển ~100m, giá tốt, sạch sẽ." },
  { area: "Cửa Lò · 1 đêm", name: "Kingdom Hotel", price: "~600k–2tr/đêm", note: "Cách biển/Quảng trường 300–500m, phòng 1–3 người, hợp gia đình trẻ." },
  { area: "Cửa Lò · 1 đêm", name: "Khách sạn Thái An", price: "~800k–2tr/đêm", note: "Nhiều loại phòng gia đình 4–5 người — tiện cho nhà 4 người." },
  { area: "Cửa Lò · 1 đêm", name: "Mường Thanh Grand Cửa Lò (4★)", price: "~890k–2tr/đêm", note: "232 Bình Minh, phòng hướng biển, hồ bơi; hay có khuyến mãi." },
];

// ---- Đồ đạc (checklist) ----
export type ChecklistItem = { group: string; text: string };
export const CHECKLIST: ChecklistItem[] = [
  { group: "Cho bé 1 tuổi", text: "Sữa, bình sữa, bỉm, khăn ướt, quần áo dự phòng, địu/xe đẩy gọn, thuốc hạ sốt trẻ em, kem hăm, đồ ăn dặm/snack, cháo gói ăn liền, bình giữ nhiệt, vài món đồ chơi quen thuộc." },
  { group: "Cho bé lớp 2", text: "Áo phao vừa size, kính bơi, mũ, dép quai hậu, quần áo bơi, thuốc chống say xe, sách/đồ chơi trên xe." },
  { group: "Chống nắng miền Trung", text: "Kem chống nắng SPF50+, mũ rộng vành, kính râm, ô, áo dài tay chống nắng, bạt che kính lái ô tô (bắt buộc)." },
  { group: "Trên xe", text: "Thùng đá đựng nước mát + sữa, snack/xúc xích cho chặng xuyên trưa, cà phê lon, bò húc, nước điện giải, đệm/giường gấp ô tô (cho trẻ nhỏ nằm ngủ trên xe), túi nôn, sạc điện thoại, giá đỡ điện thoại, tiền mặt lẻ (vé, gửi xe), thẻ thu phí cao tốc (ETC)." },
  { group: "Y tế", text: "Thuốc say xe, hạ sốt (lớn & bé), men tiêu hóa, oresol, dầu gió, băng cá nhân, thuốc dị ứng, nước rửa tay." },
  { group: "Giấy tờ & xe", text: "CCCD, giấy tờ xe, bằng lái, bảo hiểm; kiểm tra lốp/dầu/nước làm mát, đổ đầy xăng trước chặng dài; dán thẻ ETC để đi cao tốc." },
  { group: "Hành lý", text: "Đóng theo từng ngày (mỗi ngày 1 túi) cho gọn xe; chỉ mang 1/2–2/3 quần áo, tận dụng giặt là ở An Bàng/Đà Nẵng." },
  { group: "Đặt trước", text: "Khách sạn cả 5 điểm (đặt sớm, riêng Cửa Lò ≥2 tuần); bàn nhà hàng đông (Bao Cấp 1994); vé VinWonders Cửa Hội nếu đi." },
];
