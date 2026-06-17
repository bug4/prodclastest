"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Lightbox } from "./Lightbox";

type Props = {
  images: string[];
  alt: string;
  prevLabel: string;
  nextLabel: string;
  zoomLabel?: string;
  closeLabel?: string;
};

export function WorkGallery({
  images,
  alt,
  prevLabel,
  nextLabel,
  zoomLabel = "Mărește imaginea",
  closeLabel = "Închide",
}: Props) {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  // Keyboard navigation (doar cand lightbox-ul e inchis; cand e deschis,
  // Lightbox isi gestioneaza singur tastele)
  useEffect(() => {
    if (lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total, lightboxOpen]);

  if (total === 0) return null;

  // Daca e o singura poza, afisare statica + click pentru zoom
  if (total === 1) {
    return (
      <>
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={zoomLabel}
          className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-bg-deep group cursor-zoom-in"
        >
          <Image
            src={images[0]}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            unoptimized={images[0].startsWith("data:")}
            priority
            sizes="(max-width: 1024px) 100vw, 80vw"
          />
          <span className="absolute bottom-4 right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bg-paper/85 backdrop-blur-md border border-line flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </span>
        </button>

        {lightboxOpen && (
          <Lightbox
            images={images}
            alt={alt}
            startIndex={index}
            onClose={() => setLightboxOpen(false)}
            onIndexChange={setIndex}
            prevLabel={prevLabel}
            nextLabel={nextLabel}
            closeLabel={closeLabel}
          />
        )}
      </>
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
            {/* Click pe imagine -> deschide lightbox full screen */}
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={zoomLabel}
              className="absolute inset-0 w-full h-full cursor-zoom-in group"
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                unoptimized={src.startsWith("data:")}
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </button>
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

        {/* Zoom hint */}
        <div className="absolute bottom-4 left-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bg-paper/85 backdrop-blur-md border border-line flex items-center justify-center text-ink pointer-events-none">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
          </svg>
        </div>

        {/* Counter */}
        <div className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-bg-paper/90 backdrop-blur-sm border border-line text-xs tracking-[0.15em] font-medium text-ink pointer-events-none">
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

      {lightboxOpen && (
        <Lightbox
          images={images}
          alt={alt}
          startIndex={index}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={setIndex}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          closeLabel={closeLabel}
        />
      )}
    </div>
  );
}