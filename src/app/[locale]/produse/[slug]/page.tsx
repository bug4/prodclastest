import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Reveal } from "@/components/Reveal";
import { getProductBySlug, getProducts } from "@/lib/data";
import { placeholderTile } from "@/lib/placeholder";
import { getDict, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/localeHref";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Prodclas`,
    description: product.description ?? `${product.name} — ${product.thickness ?? "ceramică"}.`,
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const tc = getDict(locale).common;
  const t = getDict(locale).products.detail;
  const h = (path: string) => localeHref(locale, path);

  const related = (
    await getProducts({ thickness: product.thickness, limit: 5 })
  ).filter((p) => p.id !== product.id).slice(0, 4);

  // Construiesc array-ul de imagini: cover + gallery (deduplicate)
  const allImages: string[] = [];
  if (product.image_url) allImages.push(product.image_url);
  if (Array.isArray(product.gallery_images)) {
    product.gallery_images.forEach((img) => {
      if (img && !allImages.includes(img)) allImages.push(img);
    });
  }
  if (allImages.length === 0) {
    allImages.push(placeholderTile(product.thickness ?? null, product.slug));
  }

  // Badge grosime (JSX, pasat ca prop la ProductGallery)
  const thicknessBadge = product.thickness ? (
    <span className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 bg-bg-paper/90 backdrop-blur-md pl-3 pr-4 py-2 rounded-full">
      <span className="flex items-end gap-[3px] h-4" aria-hidden="true">
        <span className={`w-[2.5px] rounded-full bg-brass-deep ${product.thickness === "12mm" ? "h-4" : "h-2"}`} />
        <span className={`w-[2.5px] rounded-full bg-brass-deep ${product.thickness === "12mm" ? "h-4" : "h-2"}`} />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.15em] text-brass-deep">{product.thickness}</span>
    </span>
  ) : null;

  return (
    <>
      <Nav />
      <main>
        <section className="px-5 sm:px-8 lg:px-15 pt-28 sm:pt-32 pb-20 max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase text-ink-muted mb-8 sm:mb-10 flex-wrap">
            <Link href={h("/")} className="hover:text-ink transition-colors">{tc.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={h("/produse")} className="hover:text-ink transition-colors">{tc.breadcrumbProducts}</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start">
            <ProductGallery
              images={allImages}
              alt={product.name}
              thicknessBadge={thicknessBadge}
              zoomLabel={tc.zoomImage}
              prevLabel={tc.prevImage}
              nextLabel={tc.nextImage}
              closeLabel={tc.closeImage}
            />

            <div className="lg:pt-8">
              <div className="eyebrow mb-6">{product.thickness ?? "Ceramică"}</div>
              <h1 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                {product.name}
              </h1>

              {product.description && (
                <p className="text-lg leading-relaxed text-ink-soft mb-10">{product.description}</p>
              )}

              <dl className="grid grid-cols-2 gap-6 border-y border-line py-8 mb-6">
                {product.origin && <SpecItem label={tc.origin} value={product.origin} />}
                {product.size && <SpecItem label={tc.format} value={`${product.size} cm`} />}
                {product.thickness && <SpecItem label={tc.thickness} value={product.thickness} />}
                {product.finish && <SpecItem label={tc.finish} value={product.finish} />}
                <SpecItem label={tc.stock} value={product.in_stock ? tc.inStock : tc.onOrder} />
              </dl>

              {Array.isArray(product.additional_thicknesses) && product.additional_thicknesses.length > 0 && (
                <div className="mb-10 flex items-start gap-3 p-4 rounded-xl bg-brass/5 border border-brass/20">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brass-deep flex-shrink-0 mt-0.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4M12 8h.01" />
                  </svg>
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {tc.alsoAvailableInPrefix}{" "}
                    <span className="font-medium text-ink">
                      {product.additional_thicknesses.join(", ")}
                    </span>
                    {tc.alsoAvailableInSuffix}{" "}
                    <Link href={h("/contacte")} className="text-brass-deep hover:underline font-medium">
                      {tc.contactUsLink}
                    </Link>
                    .
                  </p>
                </div>
              )}

              <div className="flex items-end justify-between gap-6 mb-10">
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-ink-muted mb-2">{tc.price}</div>
                  <div className="font-serif text-4xl sm:text-5xl font-medium text-brass-deep">
                    MDL {product.price_mdl.toLocaleString()}
                    <span className="font-sans text-base text-ink-muted ml-2">{tc.perSqm}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href={h("/contacte")} className="btn btn-primary">
                  {tc.requestQuote}
                  <Arrow />
                </Link>
                <Link href={h("/contacte")} className="btn btn-ghost">{tc.requestSample}</Link>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <Reveal>
            <section className="px-5 sm:px-8 lg:px-15 py-20 sm:py-30 max-w-[1400px] mx-auto bg-bg-paper">
              <div className="mb-15">
                <div className="eyebrow mb-4">{t.relatedEyebrow}</div>
                <h2 className="section-title">
                  {t.relatedTitleA} <em>{t.relatedTitleB}</em>
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </main>
      <Footer />
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-1.5">{label}</dt>
      <dd className="font-serif text-xl font-normal">{value}</dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}