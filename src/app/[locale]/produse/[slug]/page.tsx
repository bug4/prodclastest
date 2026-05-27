import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
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
    description: product.description ?? `${product.name} — ${product.collection?.name ?? "Premium tiles"}.`,
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
    await getProducts({ collectionSlug: product.collection?.slug, limit: 5 })
  ).filter((p) => p.id !== product.id).slice(0, 4);

  const imgSrc =
    product.image_url ?? placeholderTile(product.collection?.slug ?? null, product.slug);

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
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-deep">
              {product.collection?.name && (
                <span className="absolute top-6 left-6 z-10 text-[11px] font-semibold tracking-[0.2em] uppercase bg-bg-paper/90 backdrop-blur-md px-4 py-2 rounded-full text-brass-deep">
                  {product.collection.name}
                </span>
              )}
              <Image
                src={imgSrc}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized={imgSrc.startsWith("data:")}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="lg:pt-8">
              <div className="eyebrow mb-6">{product.collection?.name ?? "Tiles"}</div>
              <h1 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                {product.name}
              </h1>

              {product.description && (
                <p className="text-lg leading-relaxed text-ink-soft mb-10">{product.description}</p>
              )}

              <dl className="grid grid-cols-2 gap-6 border-y border-line py-8 mb-10">
                {product.origin && <SpecItem label={tc.origin} value={product.origin} />}
                {product.size && <SpecItem label={tc.format} value={`${product.size} cm`} />}
                {product.finish && <SpecItem label={tc.finish} value={product.finish} />}
                <SpecItem label={tc.stock} value={product.in_stock ? tc.inStock : tc.onOrder} />
              </dl>

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
