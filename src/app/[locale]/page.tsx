import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/data";
import { INTERIORS } from "@/lib/interiors";
import { getDict, type Locale } from "@/lib/i18n";
import { localeHref as buildHref } from "@/lib/localeHref";

export const revalidate = 60;

type Props = { params: Promise<{ locale: Locale }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).home;
  const tc = getDict(locale).common;
  const h = (path: string) => buildHref(locale, path);

  const [featured, more] = await Promise.all([
    getProducts({ featured: true, limit: 4 }),
    getProducts({ limit: 8 }),
  ]);

  const heroProducts = featured.length >= 4 ? featured.slice(0, 4) : more.slice(0, 4);
  const exploreProducts = more.slice(0, 8);

  return (
    <>
      <Nav />
      <main>
        {/* HERO */}
        <section className="relative min-h-screen flex items-center px-8 lg:px-15 pt-30 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={INTERIORS.bath}
              alt=""
              className="absolute inset-0 w-full h-full object-cover animate-hero-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/10 to-bg/70 z-10" />
          </div>

          <div className="relative z-20 grid lg:grid-cols-2 gap-12 lg:gap-20 w-full max-w-[1400px] mx-auto items-end">
            <div>
              <div className="eyebrow opacity-0 animate-fade-up [animation-delay:0.2s] mb-8">
                {t.eyebrow}
              </div>
              <h1 className="hero-title">
                <span className="inline-block opacity-0 animate-fade-up [animation-delay:0.3s]">{t.heroLine1a}</span>{" "}
                <span className="inline-block opacity-0 animate-fade-up [animation-delay:0.45s]">{t.heroLine1b}</span>
                <br />
                <span className="inline-block opacity-0 animate-fade-up [animation-delay:0.6s]">{t.heroLine2a}</span>{" "}
                <span className="inline-block opacity-0 animate-fade-up [animation-delay:0.75s]">
                  <em>{t.heroLine2b}</em>
                </span>
              </h1>
            </div>
            <div className="flex flex-col gap-8 opacity-0 animate-fade-up [animation-delay:1s]">
              <p className="text-base leading-relaxed text-ink-soft max-w-md">{t.heroDesc}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={h("/produse")} className="btn btn-primary">
                  {tc.explore}
                  <Arrow />
                </Link>
                <Link href={h("/contacte")} className="btn btn-ghost">
                  {tc.visitShowroom}
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex absolute bottom-20 left-8 lg:left-15 gap-12 lg:gap-15 z-20 opacity-0 animate-fade-up [animation-delay:1.4s]">
            {t.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="font-serif text-4xl font-normal text-brass-deep leading-none">{s.num}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase text-ink-muted mt-2 whitespace-nowrap">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ink-muted z-20">
            <span>{tc.scrollDown}</span>
            <div className="w-px h-10 bg-gradient-to-b from-brass to-transparent animate-scroll-line" />
          </div>
        </section>

        {/* MANIFESTO */}
        <Reveal>
          <section className="bg-bg-paper px-8 lg:px-15 py-32">
            <div className="max-w-[1100px] mx-auto">
              <p className="font-serif font-light leading-snug tracking-tight text-ink"
                style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}>
                <span className="font-serif text-brass" style={{ fontSize: "120px", lineHeight: 0, verticalAlign: "-0.4em", marginRight: "8px" }}>
                  &ldquo;
                </span>
                {t.manifestoText.split(t.manifestoHighlight).map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <em className="italic text-brass-deep">{t.manifestoHighlight}</em>}
                  </span>
                ))}
              </p>
              <div className="mt-15 flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-ink-muted">
                <span className="w-10 h-px bg-brass" />
                {t.manifestoEyebrow}
              </div>
            </div>
          </section>
        </Reveal>

        {/* FEATURED COLLECTION */}
        {heroProducts.length > 0 && (
          <Reveal>
            <section className="px-8 lg:px-15 py-30 max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 mb-20 items-end">
                <div>
                  <div className="eyebrow mb-6">{t.featuredEyebrow}</div>
                  <h2 className="section-title">
                    {t.featuredTitleA} <em>{t.featuredTitleB}</em>
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-ink-soft max-w-lg">{t.featuredDesc}</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {heroProducts.map((p) => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* SPLIT: Calitate & Estetica */}
        <Reveal>
          <section className="grid lg:grid-cols-[1fr_1.2fr] gap-15 lg:gap-24 items-center px-8 lg:px-15 py-32 max-w-[1400px] mx-auto">
            <div className="max-w-md">
              <div className="eyebrow mb-6">{t.philosophyEyebrow}</div>
              <h2 className="section-title">
                {t.philosophyTitleA} <em>{t.philosophyTitleB}</em>
              </h2>
              <p className="my-8 text-ink-soft leading-relaxed">{t.philosophyP1}</p>
              <p className="mb-10 text-ink-soft leading-relaxed">{t.philosophyP2}</p>
              <Link href={h("/produse")} className="btn btn-primary">
                {t.philosophyCta}
                <Arrow />
              </Link>
            </div>

            <div className="relative grid grid-cols-2 gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INTERIORS.kitchen} alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INTERIORS.living} alt="" className="w-full aspect-[3/4] object-cover rounded-xl mt-15" />
              <div className="absolute -bottom-8 -right-8 w-30 h-30 border border-brass/40 rounded-full -z-10" />
            </div>
          </section>
        </Reveal>

        {/* MARQUEE */}
        <div className="py-10 border-y border-line-soft bg-bg overflow-hidden">
          <div className="flex gap-20 animate-marquee whitespace-nowrap">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-20 items-center">
                {t.marquee.map((item) => (
                  <span key={item} className="font-serif italic text-3xl font-light text-ink-soft flex items-center gap-20">
                    {item}
                    <span className="text-brass text-lg">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* TREI CONVINGERI */}
        <Reveal>
          <section className="bg-bg-paper py-30 overflow-hidden">
            <div className="text-center mb-20 px-8 lg:px-15">
              <div className="eyebrow inline-flex justify-center mb-6">{t.beliefsEyebrow}</div>
              <h2 className="section-title">
                {t.beliefsTitleA} <em>{t.beliefsTitleB}</em>
              </h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-px bg-line border-y border-line">
              {t.beliefs.map((c, i) => (
                <div key={i} className="bg-bg-paper px-10 py-15 flex flex-col gap-6 transition-colors hover:bg-bg">
                  <span className="font-serif text-5xl font-light text-brass leading-none">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-serif text-2xl font-normal">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-soft">{c.body}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* EXPLOREAZA PRODUSELE */}
        {exploreProducts.length > 0 && (
          <Reveal>
            <section className="px-8 lg:px-15 py-30 max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 mb-20 items-end">
                <div>
                  <div className="eyebrow mb-6">{t.exploreEyebrow}</div>
                  <h2 className="section-title">
                    {t.exploreTitleA} <em>{t.exploreTitleB}</em>
                  </h2>
                </div>
                <p className="text-lg leading-relaxed text-ink-soft max-w-lg">{t.exploreDesc}</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {exploreProducts.map((p) => (
                  <ProductCard key={p.id} product={p} locale={locale} />
                ))}
              </div>

              <div className="text-center mt-15">
                <Link href={h("/produse")} className="btn btn-ghost">
                  {tc.viewAll}
                  <Arrow />
                </Link>
              </div>
            </section>
          </Reveal>
        )}

        {/* CTA */}
        <Reveal>
          <section className="px-8 lg:px-15 py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,167,107,0.12),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(140,106,58,0.08),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="eyebrow inline-flex justify-center mb-8">{t.ctaEyebrow}</div>
              <h2 className="font-serif font-light leading-none tracking-tight mb-8"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                {t.ctaTitle} <em className="italic font-normal text-brass-deep">{t.ctaTitleHighlight}</em>
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft mb-12 max-w-xl mx-auto">{t.ctaDesc}</p>
              <Link href={h("/contacte")} className="btn btn-primary">
                {tc.contactUs}
                <Arrow />
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}