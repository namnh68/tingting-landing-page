"use client";

import { useState, useEffect } from "react";
import { ZALO_GROUP_LINK } from "@/lib/constants";

export function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-dark-primary shadow-[0_-4px_16px_rgba(0,0,0,0.10)] px-4 pb-4 pt-3"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
    >
      <a
        href={ZALO_GROUP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-gradient-brand py-3.5 text-center text-base font-bold text-white shadow-md active:scale-95 transition-transform"
      >
        Tham gia nhóm Zalo
      </a>
    </div>
  );
}
