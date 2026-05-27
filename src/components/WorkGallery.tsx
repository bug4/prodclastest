"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

type Props = {
  images: string[];
  alt: string;
  prevLabel: string;
  nextLabel: string;
};

export function WorkGallery({ images, alt, prevLabel, nextLabel }: Props) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (total === 0) return null;

  // Daca e o singura poza, doar afisare statica
  if (total === 1) {
    return (
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-deep">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          unoptimized={images[0].startsWith("data:")}
          priority
          sizes="(max-width: 1024px) 100vw, 80vw"
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Slide container */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-bg-deep">
        {images.map((src, i) => (
          <div
            key={i}
            className={clsx(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              className="object-cover"
              unoptimized={src.startsWith("data:")}
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        ))}

        {/* Arrow buttons - on top of image */}
        <button
          onClick={goPrev}
          aria-label={prevLabel}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg-paper/90 backdrop-blur-sm border border-line hover:bg-bg-paper hover:scale-105 transition-all flex items-center justify-center group"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-ink group-hover:text-brass-deep transition-colors">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label={nextLabel}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-bg-paper/90 backdrop-blur-sm border border-line hover:bg-bg-paper hover:scale-105 transition-all flex items-center justify-center group"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-ink group-hover:text-brass-deep transition-colors">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-bg-paper/90 backdrop-blur-sm border border-line text-xs tracking-[0.15em] font-medium text-ink">
          {index + 1} / {total}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={clsx(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-8 bg-brass-deep" : "w-1.5 bg-line hover:bg-ink-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
