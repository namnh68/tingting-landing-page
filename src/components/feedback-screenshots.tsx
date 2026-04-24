"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { FEEDBACK_IMAGES } from "@/lib/constants";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from "react-icons/fi";

type FeedbackImage = (typeof FEEDBACK_IMAGES)[number];

function Lightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: readonly FeedbackImage[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[9/16] rounded-2xl overflow-hidden">
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 384px"
            unoptimized
          />
        </div>

        {images[current].caption && (
          <p className="text-center text-sm text-gray-300 mt-3">
            {images[current].caption}
          </p>
        )}

        <p className="text-center text-xs text-gray-500 mt-1">
          {current + 1} / {images.length}
        </p>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        aria-label="Đóng"
      >
        <FiX className="h-5 w-5 text-white" />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Ảnh trước"
          >
            <FiChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            aria-label="Ảnh tiếp"
          >
            <FiChevronRight className="h-5 w-5 text-white" />
          </button>
        </>
      )}
    </div>
  );
}

export function FeedbackScreenshots() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="feedback-screenshots"
      className="py-16 md:py-24 bg-surface-secondary dark:bg-dark-secondary"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">
            Bằng chứng{" "}
            <span className="text-gradient">thực tế</span>
          </h2>
          <p className="mt-3 text-text-secondary dark:text-gray-400">
            Ảnh chụp màn hình thật từ thành viên nhóm Ting Ting
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {FEEDBACK_IMAGES.map((img, index) => (
            <ScrollReveal key={index} delay={Math.min(index * 0.1, 0.3)}>
              <button
                onClick={() => setLightboxIndex(index)}
                className="group relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-surface-tertiary dark:bg-dark-tertiary shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-brand-orange"
                aria-label={`Xem ảnh: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <FiZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs text-white font-medium truncate">
                      {img.caption}
                    </p>
                  </div>
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={FEEDBACK_IMAGES}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
