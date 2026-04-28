"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./theme-toggle";
import { ZALO_GROUP_LINK, NAV_ITEMS } from "@/lib/constants";
import { FiMenu, FiX } from "react-icons/fi";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white dark:bg-dark-primary shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="/" className="text-xl font-bold text-gradient">
            Ting Ting
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary hover:text-brand-orange transition-colors dark:text-gray-300 dark:hover:text-brand-yellow"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              Tham gia ngay
            </a>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex items-center justify-center h-11 w-11 rounded-full text-text-primary dark:text-white hover:bg-surface-secondary dark:hover:bg-dark-secondary transition-colors"
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-nav"
          aria-hidden={!menuOpen}
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-96 border-t border-surface-tertiary dark:border-dark-tertiary"
              : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-sm text-text-secondary hover:text-brand-orange transition-colors dark:text-gray-300 dark:hover:text-brand-yellow"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ZALO_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-full bg-gradient-brand px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md"
            >
              Tham gia ngay
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
