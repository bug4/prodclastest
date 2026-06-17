import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WorkCard } from "@/components/WorkCard";
import { Reveal } from "@/components/Reveal";
import { getWorks } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/localeHref";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ categorie?: string }>;
};

export default async function LucrariPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const sp = await searchParams;
  const activeCategory = sp.categorie ?? "toate";

  const t = getDict(locale).works;
  const tc = getDict(locale).common;
  const h = (path: string) => localeHref(locale, path);

  const works = await getWorks({ category: activeCategory });

  const buildHref = (cat: string) => {
    if (cat === "toate") return h("/lucrari");
    return `${h("/lucrari")}?categorie=${cat}`;
  };

  return (
    <>
      <Nav />
      <main>
        <section className="px-5 sm:px-8 lg:px-15 pt-40 lg:pt-48 pb-10 max-w-[1400px] mx-auto">
          <div className="eyebrow mb-4">{t.eyebrow} · {works.length}</div>
          <h1 className="page-title">
            {t.titleA} <em>{t.titleB}</em>
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">{t.desc}</p>
        </section>

        {/* Filtre */}
        <div className="py-6 sm:py-10 px-5 sm:px-8 lg:px-15 border-y border-line-soft max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 pb-2 sm:pb-0 sm:flex-wrap">
            <Link href={buildHref("toate")} className={`filter-pill whitespace-nowrap ${activeCategory === "toate" ? "active" : ""}`}>
              {t.filterAll}
            </Link>
            <Link href={buildHref("lavoare")} className={`filter-pill whitespace-nowrap ${activeCategory === "lavoare" ? "active" : ""}`}>
              {t.filterWashbasins}
            </Link>
            <Link href={buildHref("blaturi")} className={`filter-pill whitespace-nowrap ${activeCategory === "blaturi" ? "active" : ""}`}>
              {t.filterCountertops}
            </Link>
            <Link href={buildHref("altele")} className={`filter-pill whitespace-nowrap ${activeCategory === "altele" ? "active" : ""}`}>
              {t.filterOther}
            </Link>
          </div>
        </div>

        {/* Grid */}
        <section className="px-5 sm:px-8 lg:px-15 py-10 sm:py-15 pb-20 sm:pb-30 max-w-[1400px] mx-auto">
          {works.length === 0 ? (
            <div className="text-center py-20 sm:py-30 text-ink-muted">{t.empty}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
              {works.map((w) => (
                <WorkCard key={w.id} work={w} locale={locale} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <Reveal>
          <section className="px-5 sm:px-8 lg:px-15 py-24 sm:py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,167,107,0.12),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(140,106,58,0.08),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                {tc.contactUs}
              </h2>
              <Link href={h("/contacte")} className="btn btn-primary">
                {tc.contactUs}
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