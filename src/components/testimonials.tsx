"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";
import { ScrollReveal } from "@/components/scroll-reveal";

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, [updateScrollButtons]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 320, behavior: "smooth" });
      }
    }, 4000);

    const pause = () => clearInterval(interval);
    el.addEventListener("mouseenter", pause);
    el.addEventListener("touchstart", pause, { passive: true });

    return () => {
      clearInterval(interval);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("touchstart", pause);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Thành viên{" "}
            <span className="text-gradient">nói gì?</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Feedback thực từ thành viên nhóm Ting Ting
          </p>
        </ScrollReveal>

        <div className="relative">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 rounded-full bg-surface-primary dark:bg-dark-secondary shadow-lg flex items-center justify-center hover:bg-surface-secondary dark:hover:bg-dark-tertiary transition-colors"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="h-5 w-5 dark:text-white" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 rounded-full bg-surface-primary dark:bg-dark-secondary shadow-lg flex items-center justify-center hover:bg-surface-secondary dark:hover:bg-dark-tertiary transition-colors"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="h-5 w-5 dark:text-white" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] snap-center rounded-2xl bg-surface-secondary dark:bg-dark-secondary p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-brand-orange" />
                  </div>
                  <span className="font-semibold text-sm dark:text-white">
                    {testimonial.name}
                  </span>
                </div>

                <p className="text-sm text-text-secondary dark:text-gray-400 mb-4 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {testimonial.refundAmount && (
                  <div className="inline-flex items-center rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400">
                    Hoàn: {testimonial.refundAmount}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
