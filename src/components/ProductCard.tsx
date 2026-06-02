import Link from "next/link";
import Image from "next/image";
import type { ProductWithCollection } from "@/lib/types";
import { placeholderTile } from "@/lib/placeholder";
import { localeHref } from "@/lib/localeHref";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

type Props = {
  product: ProductWithCollection;
  locale?: Locale;
};

// Badge de grosime: bara verticala (sugereaza grosimea fizica) + text
// Badge principal: solid (fundal crem, text auriu)
function ThicknessBadge({ thickness }: { thickness: string }) {
  const isThick = thickness === "12mm" || thickness === "20mm";
  return (
    <span className="inline-flex items-center gap-2 bg-bg-paper/90 backdrop-blur-md pl-2.5 pr-3 py-1.5 rounded-full">
      <span className="flex items-end gap-[3px] h-3" aria-hidden="true">
        <span className={`w-[2px] rounded-full bg-brass-deep ${isThick ? "h-3" : "h-1.5"}`} />
        <span className={`w-[2px] rounded-full bg-brass-deep ${isThick ? "h-3" : "h-1.5"}`} />
      </span>
      <span className="text-[10px] font-semibold tracking-[0.12em] text-brass-deep">{thickness}</span>
    </span>
  );
}

// Badge secundar: outline auriu, transparent, "+12mm" / "+20mm"
function AdditionalThicknessBadge({ thickness }: { thickness: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-brass-deep/60 bg-bg-paper/40 backdrop-blur-md">
      <span className="text-[10px] font-semibold tracking-[0.12em] text-brass-deep">+{thickness}</span>
    </span>
  );
}

export function ProductCard({ product, locale = DEFAULT_LOCALE }: Props) {
  const imgSrc =
    product.image_url ?? placeholderTile(product.thickness ?? null, product.slug);

  return (
    <Link href={localeHref(locale, `/produse/${product.slug}`)} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-bg-deep mb-4">
        {product.thickness && (
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-1.5 items-center max-w-[calc(100%-2rem)]">
            <ThicknessBadge thickness={product.thickness} />
            {Array.isArray(product.additional_thicknesses) &&
              product.additional_thicknesses.map((t) => (
                <AdditionalThicknessBadge key={t} thickness={t} />
              ))}
          </div>
        )}

        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          unoptimized={imgSrc.startsWith("data:")}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>

      <div className="flex justify-between items-baseline gap-3">
        <div>
          <div className="font-serif text-xl font-normal text-ink tracking-tight">{product.name}</div>
          {(product.size || product.finish) && (
            <div className="text-[11px] text-ink-muted tracking-[0.1em] uppercase mt-1">
              {[product.size && `${product.size} cm`, product.finish].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
        <div className="text-right whitespace-nowrap">
          <div className="font-serif text-base font-medium text-brass-deep">
            MDL {product.price_mdl.toLocaleString()}
          </div>
          <div className="text-[10px] text-ink-muted tracking-[0.1em] uppercase mt-0.5">/ m²</div>
        </div>
      </div>
    </Link>
  );
}