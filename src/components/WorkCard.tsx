import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/lib/types";
import { localeHref } from "@/lib/localeHref";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

// Placeholder SVG cand lucrarea nu are poza
function placeholderCover(category: string, seed: string): string {
  // Genereaza un fundal cu gradient si textura subtila
  const colors: Record<string, [string, string]> = {
    lavoare: ["#e6d3a8", "#8c6a3a"],
    blaturi: ["#3a342c", "#1a1814"],
  };
  const [c1, c2] = colors[category] ?? colors.lavoare;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  const angle = Math.abs(hash % 90);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="g${Math.abs(hash)}" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
      <filter id="n${Math.abs(hash)}">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2"/>
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.05 0"/>
      </filter>
    </defs>
    <rect width="600" height="450" fill="url(#g${Math.abs(hash)})"/>
    <rect width="600" height="450" filter="url(#n${Math.abs(hash)})" opacity="0.6"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

type Props = {
  work: Work;
  locale?: Locale;
};

export function WorkCard({ work, locale = DEFAULT_LOCALE }: Props) {
  const imgSrc =
    work.cover_image_url ?? placeholderCover(work.category, work.slug);

  return (
    <Link href={localeHref(locale, `/lucrari/${work.slug}`)} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-bg-deep mb-4">
        <Image
          src={imgSrc}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          unoptimized={imgSrc.startsWith("data:")}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      <div>
        <h3 className="font-serif text-xl sm:text-2xl font-normal text-ink tracking-tight">{work.title}</h3>
        {work.subtitle && (
          <div className="text-[11px] text-ink-muted tracking-[0.15em] uppercase mt-2">
            {work.subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}
