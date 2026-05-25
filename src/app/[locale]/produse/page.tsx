import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getCollections, getProducts } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/localeHref";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ colectie?: string; sort?: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).products;
  return {
    title: `${t.titleA} ${t.titleB}`,
    description: t.desc,
  };
}

export default async function ProdusePage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const activeCollection = sp.colectie ?? "toate";
  const sortByPrice =
    sp.sort === "pret-asc" ? "asc" : sp.sort === "pret-desc" ? "desc" : undefined;

  const t = getDict(locale).products;
  const tc = getDict(locale).common;
  const h = (path: string) => localeHref(locale, path);

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ collectionSlug: activeCollection, sortByPrice }),
  ]);

  const buildQueryHref = (colectie: string, sort?: string) => {
    const qp = new URLSearchParams();
    if (colectie && colectie !== "toate") qp.set("colectie", colectie);
    if (sort) qp.set("sort", sort);
    const qs = qp.toString();
    return qs ? `${h("/produse")}?${qs}` : h("/produse");
  };

  return (
    <>
      <Nav />
      <main>
        <section className="px-8 lg:px-15 pt-40 lg:pt-48 pb-15 max-w-[1400px] mx-auto">
          <div className="eyebrow mb-4">{t.eyebrow} · {products.length} {t.models}</div>
          <h1 className="page-title">
            {t.titleA} <em>{t.titleB}</em>
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">{t.desc}</p>
        </section>

        <div className="flex items-center gap-6 flex-wrap py-10 px-8 lg:px-15 border-y border-line-soft max-w-[1400px] mx-auto">
          <Link href={buildQueryHref("toate", sp.sort)} className={`filter-pill ${activeCollection === "toate" ? "active" : ""}`}>
            {t.filterAll}
          </Link>
          {collections.map((c) => (
            <Link
              key={c.id}
              href={buildQueryHref(c.slug, sp.sort)}
              className={`filter-pill ${activeCollection === c.slug ? "active" : ""}`}
            >
              {c.name}
            </Link>
          ))}
          <div className="ml-auto flex gap-2 items-center">
            <small className="text-xs text-ink-muted tracking-wide mr-2">{t.sortLabel}</small>
            <Link href={buildQueryHref(activeCollection, undefined)} className={`filter-pill ${!sp.sort ? "active" : ""}`}>
              {t.sortDefault}
            </Link>
            <Link href={buildQueryHref(activeCollection, "pret-asc")} className={`filter-pill ${sp.sort === "pret-asc" ? "active" : ""}`}>
              {t.sortPriceAsc}
            </Link>
            <Link href={buildQueryHref(activeCollection, "pret-desc")} className={`filter-pill ${sp.sort === "pret-desc" ? "active" : ""}`}>
              {t.sortPriceDesc}
            </Link>
          </div>
        </div>

        <section className="px-8 lg:px-15 py-15 pb-30 max-w-[1400px] mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-30 text-ink-muted">{t.empty}</div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          )}
        </section>

        <Reveal>
          <section className="px-8 lg:px-15 py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,167,107,0.12),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(140,106,58,0.08),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="eyebrow inline-flex justify-center mb-8">{t.ctaEyebrow}</div>
              <h2 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                {t.ctaTitleA} <em className="italic font-normal text-brass-deep">{t.ctaTitleB}</em>
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft mb-12 max-w-xl mx-auto">{t.ctaDesc}</p>
              <Link href={h("/contacte")} className="btn btn-primary">
                {t.ctaButton}
                <svg className="arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
