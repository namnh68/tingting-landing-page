"use client";

import { SiZalo } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { ZALO_PERSONAL_LINK, ZALO_GROUP_LINK } from "@/lib/constants";

const BUTTONS = [
  {
    href: ZALO_GROUP_LINK,
    icon: <FaUsers className="w-5 h-5 shrink-0" />,
    label: "Nhóm Zalo",
    ariaLabel: "Tham gia nhóm Zalo Ting Ting",
    className:
      "bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
  },
  {
    href: ZALO_PERSONAL_LINK,
    icon: <SiZalo className="w-5 h-5 shrink-0" />,
    label: "Liên hệ",
    ariaLabel: "Liên hệ trực tiếp qua Zalo",
    className: "bg-blue-500 hover:bg-blue-600",
  },
] as const;

export function FloatingButtons() {
  return (
    <div className="fixed right-4 bottom-24 md:bottom-10 z-50 flex flex-col gap-3">
      {BUTTONS.map(({ href, icon, label, ariaLabel, className }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ariaLabel}
          className={`
            group relative flex items-center gap-2
            rounded-full px-3 py-3 text-white shadow-lg
            transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95
            ${className}
          `}
        >
          {icon}
          {/* Desktop: hiện label cạnh icon */}
          <span className="hidden md:block text-sm font-semibold whitespace-nowrap pr-1">
            {label}
          </span>
          {/* Mobile: tooltip bên trái khi hover */}
          <span className="pointer-events-none absolute right-full mr-3 rounded-md bg-gray-900/90 px-2 py-1 text-xs text-white whitespace-nowrap opacity-0 transition-opacity duration-150 group-hover:opacity-100 md:hidden">
            {label}
          </span>
        </a>
      ))}
    </div>
  );
}
