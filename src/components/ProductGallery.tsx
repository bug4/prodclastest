"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { Lightbox } from "./Lightbox";

type Props = {
  images: string[];
  alt: string;
  thicknessBadge?: React.ReactNode;
  zoomLabel?: string;
  prevLabel?: string;
  nextLabel?: string;
  closeLabel?: string;
};

export function ProductGallery({
  images,
  alt,
  thicknessBadge,
  zoomLabel = "Mărește",
  prevLabel,
  nextLabel,
  closeLabel,
}: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const total = images.length;

  if (total === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main image */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          aria-label={zoomLabel}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-deep group cursor-zoom-in"
        >
          {thicknessBadge}

          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className={clsx(
                "absolute inset-0 transition-opacity duration-500",
                i === active ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <Image
                src={src}
                alt={`${alt} — ${i + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                unoptimized={src.startsWith("data:")}
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          ))}

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-bg-paper/85 backdrop-blur-md border border-line flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
            </svg>
          </div>
        </button>

        {/* Thumbnails (numai daca exista 2+ poze) */}
        {total > 1 && (
          <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1">
            {images.map((src, i) => (
              <button
                key={`thumb-${src}-${i}`}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Image ${i + 1}`}
                className={clsx(
                  "relative aspect-square w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300",
                  i === active
                    ? "ring-2 ring-brass ring-offset-2 ring-offset-bg opacity-100"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  unoptimized={src.startsWith("data:")}
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          alt={alt}
          startIndex={active}
          onClose={() => setLightboxOpen(false)}
          onIndexChange={(i) => setActive(i)}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          closeLabel={closeLabel}
        />
      )}
    </>
  );
}
