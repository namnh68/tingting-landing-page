"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ZALO_GROUP_LINK } from "@/lib/constants";
import {
  HERO_STATS,
  OVERVIEW,
  GENERAL_NOTES,
  DAYS,
  FOOD,
  STAY,
  CHECKLIST,
  type TRow,
} from "@/lib/phuot-data";

const TABS = [
  { id: "tongquan", label: "🗺️ Tổng quan" },
  { id: "lichtrinh", label: "📅 Chi tiết" },
  { id: "quanan", label: "🍜 Quán ăn" },
  { id: "chonghi", label: "🏨 Chỗ nghỉ" },
  { id: "dodac", label: "🎒 Đồ đạc" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const mapsUrl = (q: string) =>
  q.startsWith("http")
    ? q
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

function MapLink({ q }: { q: string }) {
  return (
    <a
      href={mapsUrl(q)}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-1.5 inline-flex items-center gap-0.5 rounded-full bg-surface-secondary px-2 py-0.5 align-middle text-[11px] font-extrabold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.7a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4z" />
      </svg>
      Maps
    </a>
  );
}

/* ---------------- Timeline row ---------------- */
function TimeRow({ row }: { row: TRow }) {
  return (
    <div className="grid grid-cols-1 gap-2 border-b border-surface-tertiary px-4 py-3 last:border-b-0 sm:grid-cols-[118px_1fr] sm:gap-4 sm:px-6">
      <div className="h-fit w-fit rounded-[10px] border border-surface-secondary bg-surface-tertiary px-3 py-1.5 text-center text-[13px] font-extrabold leading-tight text-brand-orange sm:w-auto">
        {row.time}
      </div>
      <div>
        <p className="text-[14.5px] font-bold text-text-primary">
          {row.act}
          {row.map && <MapLink q={row.map} />}
        </p>
        {row.eat && (
          <p className="mt-1 text-[13.5px] font-semibold text-text-secondary">
            🍜 {row.eat}
          </p>
        )}
        {row.note && (
          <p className="mt-1.5 rounded-r-[10px] border-l-[3px] border-brand-yellow bg-surface-tertiary px-3 py-1.5 text-[13px] font-semibold text-[#8a3b64]">
            {row.note}
          </p>
        )}
        {row.km && (
          <span className="mt-1.5 inline-block rounded-full bg-surface-secondary px-2.5 py-0.5 text-xs font-extrabold text-brand-purple">
            {row.km}
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- Day card ---------------- */
function DayCard({ day }: { day: (typeof DAYS)[number] }) {
  return (
    <article
      id={`day-${day.n}`}
      className="scroll-mt-[240px] overflow-hidden rounded-[20px] border border-[rgba(219,39,119,0.12)] bg-white shadow-[0_8px_30px_rgba(219,39,119,0.08)] sm:scroll-mt-[184px]"
    >
      <div className="flex items-center gap-4 bg-gradient-brand px-5 py-4 text-white sm:px-6">
        <div className="shrink-0 rounded-xl border border-white/30 bg-white/20 px-3 py-2 text-center text-sm font-extrabold leading-tight">
          NGÀY {day.n}
          <span className="block text-[11px] font-bold opacity-90">{day.tag}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-[15.5px] font-extrabold uppercase leading-snug sm:text-lg">
            {day.title}
          </h3>
          <p className="mt-1 text-[12.5px] font-bold opacity-95 sm:text-[13px]">
            {day.meta}
          </p>
        </div>
      </div>

      {day.slots.map((slot) => (
        <div key={slot.label}>
          <div className="mx-4 mt-5 mb-0.5 flex items-center gap-2.5 text-[12.5px] font-extrabold uppercase tracking-[1.6px] text-brand-purple sm:mx-6">
            {slot.label}
            <span className="h-0.5 flex-1 rounded bg-gradient-to-r from-surface-secondary to-transparent" />
          </div>
          {slot.rows.map((row, i) => (
            <TimeRow key={i} row={row} />
          ))}
        </div>
      ))}

      <div className="m-4 rounded-[14px] border border-dashed border-brand-purple/35 bg-gradient-to-br from-surface-tertiary to-[#F5F3FF] px-4 py-3 text-[13.5px] font-semibold text-text-primary sm:m-6">
        🏨 <span className="font-extrabold">{day.hotel}</span>
      </div>
    </article>
  );
}

/* ---------------- Grid card (food / stay) ---------------- */
function GCard({
  tag,
  title,
  price,
  children,
}: {
  tag: string;
  title: string;
  price?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[18px] border border-[rgba(219,39,119,0.12)] bg-white p-5 shadow-[0_8px_30px_rgba(219,39,119,0.08)]">
      <span className="self-start rounded-full bg-gradient-brand px-3 py-0.5 text-[11.5px] font-extrabold uppercase tracking-wide text-white">
        {tag}
      </span>
      <h4 className="text-[15.5px] font-extrabold text-text-primary">{title}</h4>
      {price && <p className="text-[13.5px] font-extrabold text-brand-purple">{price}</p>}
      {children}
    </div>
  );
}

/* ---------------- Checklist ---------------- */
function ChecklistPanel() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const done = Object.values(checked).filter(Boolean).length;
  const total = CHECKLIST.length;

  return (
    <div>
      <p className="mb-4 text-sm font-semibold text-text-secondary">
        🎒 Checklist đồ đạc (gia đình có bé 1 tuổi + bé lớp 2) — tích ✓ để đánh dấu đã
        chuẩn bị.
      </p>

      <div className="mb-5 rounded-[16px] border border-dashed border-brand-purple/35 bg-gradient-to-br from-surface-tertiary to-[#F5F3FF] px-5 py-4 text-[13.5px] font-semibold text-text-primary">
        🛒 <span className="font-extrabold">Kinh nghiệm sắm đồ:</span> đặt online sớm
        1–2 tuần cho kịp giao hàng và dễ so giá. Mấy món này mua trên Shopee/TikTok Shop
        đều <span className="font-extrabold text-brand-orange">có hoa hồng</span> — gửi
        link sản phẩm vào nhóm VnTing, vẫn mua đúng shop đúng giá, nhưng được{" "}
        <span className="font-extrabold text-brand-orange">hoàn lại tới 80% hoa hồng</span>{" "}
        của đơn. Gom cả danh sách dưới đây, chắc cũng đủ thêm bữa hải sản ở Kỳ Xuân 🦐
        <div className="mt-3 flex flex-col items-start gap-2.5 sm:flex-row sm:items-center">
          <a
            href="https://vnting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            Tìm hiểu thêm tại vnting.com →
          </a>
          <a
            href={ZALO_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-orange underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            Hoặc vào nhóm để bắt đầu mua hàng
          </a>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-extrabold text-brand-orange">
          Đã chuẩn bị {done}/{total} nhóm
        </span>
        <div className="h-2 max-w-[220px] flex-1 overflow-hidden rounded-full bg-surface-secondary">
          <div
            className="h-full rounded-full bg-gradient-brand transition-all duration-300"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CHECKLIST.map((item, i) => (
          <label
            key={i}
            className="flex cursor-pointer gap-3 rounded-[18px] border border-[rgba(219,39,119,0.12)] bg-white p-4 shadow-[0_8px_30px_rgba(219,39,119,0.06)] transition-colors hover:border-brand-orange/40"
          >
            <input
              type="checkbox"
              checked={!!checked[i]}
              onChange={() => setChecked((p) => ({ ...p, [i]: !p[i] }))}
              className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-brand-orange"
            />
            <span>
              <span className="mb-1 block self-start rounded-full bg-surface-secondary px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-brand-orange">
                {item.group}
              </span>
              <span
                className={`text-[13.5px] font-semibold ${
                  checked[i] ? "text-text-muted line-through" : "text-text-primary"
                }`}
              >
                {item.text}
              </span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

/* ================= Main ================= */
export function PhuotGuide() {
  const [tab, setTab] = useState<TabId>("tongquan");
  const [pendingDay, setPendingDay] = useState<number | null>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  const goDay = (n: number) => {
    setPendingDay(n);
    setTab("lichtrinh");
  };

  // after switching to lichtrinh, scroll to the requested day
  useEffect(() => {
    if (tab === "lichtrinh" && pendingDay != null) {
      const el = document.getElementById(`day-${pendingDay}`);
      requestAnimationFrame(() =>
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
      setPendingDay(null);
    }
  }, [tab, pendingDay]);

  const changeTab = (id: TabId) => {
    setTab(id);
    requestAnimationFrame(() =>
      panelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  };

  const stats = useMemo(() => HERO_STATS, []);

  return (
    <div className="bg-surface-primary text-text-primary">
      {/* ===== HERO ===== */}
      <header className="relative overflow-hidden bg-gradient-brand px-5 pb-10 pt-20 text-center text-white sm:pb-12 sm:pt-24">
        <span className="pointer-events-none absolute -right-24 -top-40 h-72 w-72 rounded-full bg-white/20 blur-2xl" />
        <span className="pointer-events-none absolute -bottom-32 -left-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest">
            🚗 Family Road Trip · Hè 2026
          </span>
          <h1 className="mx-auto mt-3 max-w-2xl text-[26px] font-extrabold leading-tight sm:text-4xl">
            Lịch trình phượt ô tô
            <span className="block">Hà Nội ⇌ Đà Nẵng</span>
          </h1>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {stats.map((s) => (
              <span
                key={s.text}
                className="rounded-2xl border border-white/25 bg-white/15 px-4 py-2 text-[13.5px] font-extrabold backdrop-blur"
              >
                {s.icon} {s.text}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ===== TABS ===== */}
      <nav className="sticky top-16 z-40 border-b border-[rgba(219,39,119,0.12)] bg-surface-primary/95 px-3 py-2.5 backdrop-blur sm:px-6">
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => changeTab(t.id)}
              className={`rounded-full px-2 py-2 text-center text-[12.5px] font-extrabold leading-tight transition-all sm:text-[14.5px] ${
                tab === t.id
                  ? "bg-gradient-brand text-white shadow-[0_4px_14px_rgba(219,39,119,0.35)]"
                  : "text-text-secondary hover:bg-surface-secondary hover:text-brand-orange"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <p className="mt-2 text-center text-[12px] font-medium leading-snug text-text-muted sm:text-[13px]">
          <a
            href="https://vnting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-extrabold text-brand-orange hover:underline"
          >
            VnTing
          </a>{" "}
          giúp bạn mua sắm online tiết kiệm hơn — đây là cẩm nang lộ trình chi tiết cho
          gia đình mê phượt ô tô.
        </p>
      </nav>

      <main ref={panelsRef} className="mx-auto max-w-5xl scroll-mt-28 px-4 py-8 sm:px-6">

        {/* ===== TỔNG QUAN ===== */}
        <div className={tab === "tongquan" ? "space-y-6" : "hidden"}>
            <div className="overflow-hidden rounded-[20px] border border-[rgba(219,39,119,0.12)] bg-white shadow-[0_8px_30px_rgba(219,39,119,0.08)]">
              <div className="bg-surface-secondary px-5 py-3.5 text-[15px] font-extrabold tracking-wide text-brand-orange">
                HÀNH TRÌNH 8 NGÀY — BẤM VÀO TỪNG NGÀY ĐỂ XEM CHI TIẾT
              </div>

              {/* desktop table */}
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full border-collapse text-[14.5px]">
                  <thead>
                    <tr className="bg-surface-secondary text-left text-xs uppercase tracking-wide text-brand-orange">
                      <th className="px-4 py-3">Ngày</th>
                      <th className="px-4 py-3">Hành trình</th>
                      <th className="px-4 py-3">Điểm nhấn</th>
                      <th className="px-4 py-3">KM</th>
                      <th className="px-4 py-3">Nghỉ đêm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {OVERVIEW.map((r) => (
                      <tr
                        key={r.n}
                        onClick={() => goDay(r.n)}
                        className="cursor-pointer border-t border-surface-secondary transition-colors hover:bg-surface-tertiary"
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-extrabold text-brand-orange">
                          Ngày {r.n}
                          <span className="block text-xs font-bold text-text-secondary">
                            {r.date}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold">{r.route}</td>
                        <td className="px-4 py-3 text-text-secondary">{r.highlight}</td>
                        <td className="whitespace-nowrap px-4 py-3 font-extrabold text-brand-purple">
                          {r.km}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 font-bold">{r.sleep}</td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-surface-secondary bg-surface-tertiary font-extrabold text-brand-orange">
                      <td className="px-4 py-3">TỔNG CỘNG</td>
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3 text-brand-purple">~1.700</td>
                      <td className="px-4 py-3">7 đêm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* mobile cards */}
              <div className="divide-y divide-surface-secondary md:hidden">
                {OVERVIEW.map((r) => (
                  <button
                    key={r.n}
                    onClick={() => goDay(r.n)}
                    className="block w-full px-4 py-3 text-left transition-colors active:bg-surface-tertiary"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-brand-orange">
                        Ngày {r.n}{" "}
                        <span className="text-xs font-bold text-text-secondary">
                          · {r.date}
                        </span>
                      </span>
                      <span className="text-xs font-extrabold text-brand-purple">
                        {r.km} km · {r.sleep}
                      </span>
                    </div>
                    <p className="mt-0.5 font-bold">{r.route}</p>
                    <p className="mt-0.5 text-[13px] text-text-secondary">{r.highlight}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="overflow-hidden rounded-[20px] border border-[rgba(219,39,119,0.12)] bg-white shadow-[0_8px_30px_rgba(219,39,119,0.08)]">
              <div className="bg-surface-secondary px-5 py-3.5 text-[15px] font-extrabold tracking-wide text-brand-orange">
                ⚠️ LƯU Ý CHUNG CẢ CHUYẾN
              </div>
              <ul className="px-5 py-3">
                {GENERAL_NOTES.map((n) => (
                  <li
                    key={n.label}
                    className="relative border-b border-dashed border-surface-secondary py-2.5 pl-7 text-[14.5px] last:border-b-0"
                  >
                    <span className="absolute left-1 font-extrabold text-brand-yellow">
                      ✦
                    </span>
                    <b className="text-brand-orange">{n.label}:</b> {n.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        {/* ===== LỊCH TRÌNH ===== */}
        <div className={tab === "lichtrinh" ? "" : "hidden"}>
            <div className="sticky top-[200px] z-30 -mx-4 mb-5 grid grid-cols-4 gap-1.5 border-b border-[rgba(219,39,119,0.12)] bg-surface-primary/95 px-4 py-2.5 backdrop-blur sm:top-[150px] sm:-mx-6 sm:grid-cols-8 sm:px-6">
              {DAYS.map((d) => {
                const place = d.chip.split("·")[1]?.trim() ?? "";
                return (
                  <button
                    key={d.n}
                    onClick={() => goDay(d.n)}
                    className="group rounded-xl border border-[rgba(219,39,119,0.12)] bg-white px-1 py-1.5 text-center leading-tight text-text-secondary transition-all hover:border-transparent hover:bg-brand-orange hover:text-white"
                  >
                    <span className="block text-[12.5px] font-extrabold text-text-primary group-hover:text-white">
                      Ngày {d.n}
                    </span>
                    <span className="block truncate text-[10.5px] font-semibold">
                      {place}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="space-y-7">
              {DAYS.map((d) => (
                <DayCard key={d.n} day={d} />
              ))}
            </div>
          </div>

        {/* ===== QUÁN ĂN ===== */}
        <div className={tab === "quanan" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "hidden"}>
            {FOOD.map((f, i) => (
              <GCard key={i} tag={f.city} title={f.dish}>
                <p className="text-[13.5px] font-bold text-text-primary">{f.shops}</p>
                <p className="text-[13.5px] font-semibold text-text-secondary">{f.note}</p>
              </GCard>
            ))}
          </div>

        {/* ===== CHỖ NGHỈ ===== */}
        <div className={tab === "chonghi" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "hidden"}>
            {STAY.map((s, i) => (
              <GCard key={i} tag={s.area} title={s.name} price={s.price}>
                <p className="text-[13.5px] font-semibold text-text-secondary">{s.note}</p>
              </GCard>
            ))}
          </div>

        {/* ===== ĐỒ ĐẠC ===== */}
        <div className={tab === "dodac" ? "" : "hidden"}>
          <ChecklistPanel />
        </div>

        {/* ===== Closing CTA (persistent) ===== */}
        <section className="mt-10 overflow-hidden rounded-[22px] bg-gradient-brand px-6 py-9 text-center text-white">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            💡 Mẹo tiết kiệm chi phí chuẩn bị trước chuyến đi chơi
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            Mỗi đơn hàng trên Shopee, TikTok Shop… vốn đã có sẵn một khoản hoa hồng tiếp
            thị mà sàn trả cho bên giới thiệu. Khi bạn mua qua VnTing, khoản hoa hồng đó về
            VnTing, và VnTing chia lại <span className="font-extrabold">80%</span> cho bạn.
            Bạn vẫn mua đúng shop, đúng giá — không phát sinh thêm chi phí nào.
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/85">
            Cứ thong thả tìm hiểu, thấy hợp lý thì tham gia.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://vnting.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-white px-6 py-3 text-sm font-extrabold text-brand-orange shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Tìm hiểu thêm tại vnting.com →
            </a>
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white/90 underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              Hoặc vào nhóm VnTing
            </a>
          </div>
          <p className="mt-6 text-sm font-medium text-white/85">
            Chúc cả nhà một chuyến đi thật vui — và ví bớt xót một chút. 🌊
          </p>
        </section>

        <p className="mt-6 text-center text-xs font-semibold leading-relaxed text-text-muted">
          Giá vé, giờ mở cửa và giá phòng là mức tham khảo 2025–2026 — nên kiểm tra lại
          sát ngày đi. Mùa hè cao điểm, riêng Cửa Lò rất dễ cháy phòng, nên đặt trước ≥2
          tuần.
        </p>
      </main>
    </div>
  );
}
