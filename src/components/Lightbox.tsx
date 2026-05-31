"use client";

import Image from "next/image";
import { useEffect } from "react";
import clsx from "clsx";

type Props = {
  images: string[];
  alt: string;
  startIndex: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
  prevLabel?: string;
  nextLabel?: string;
  closeLabel?: string;
};

export function Lightbox({
  images,
  alt,
  startIndex,
  onClose,
  onIndexChange,
  prevLabel = "Imagine anterioară",
  nextLabel = "Imagine următoare",
  closeLabel = "Închide",
}: Props) {
  const total = images.length;
  const index = startIndex;

  const goPrev = () => onIndexChange((index - 1 + total) % total);
  const goNext = () => onIndexChange((index + 1) % total);

  // Keyboard: arrows + Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Body scroll lock
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  if (total === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "rgba(10, 9, 8, 0.95)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg-paper/10 hover:bg-bg-paper/20 backdrop-blur-md border border-bg-paper/20 flex items-center justify-center text-bg-paper transition-colors"
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      {total > 1 && (
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 px-4 py-2 rounded-full bg-bg-paper/10 backdrop-blur-md border border-bg-paper/20 text-bg-paper text-xs tracking-[0.15em] font-medium">
          {index + 1} / {total}
        </div>
      )}

      {/* Prev */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          aria-label={prevLabel}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-bg-paper/10 hover:bg-bg-paper/20 backdrop-blur-md border border-bg-paper/20 flex items-center justify-center text-bg-paper transition-all hover:scale-105"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Next */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            goNext();
          }}
          aria-label={nextLabel}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-bg-paper/10 hover:bg-bg-paper/20 backdrop-blur-md border border-bg-paper/20 flex items-center justify-center text-bg-paper transition-all hover:scale-105"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-12 lg:p-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className={clsx(
                "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                i === index ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                className="object-contain"
                unoptimized={src.startsWith("data:")}
                sizes="100vw"
                priority={i === index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
