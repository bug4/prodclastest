import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WorkCard } from "@/components/WorkCard";
import { WorkGallery } from "@/components/WorkGallery";
import { Reveal } from "@/components/Reveal";
import { getWorkBySlug, getWorks } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";
import { localeHref } from "@/lib/localeHref";

type Props = {
  params: Promise<{ locale: Locale; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: `${work.title} | Prodclas`,
    description: work.description ?? work.title,
  };
}

export const revalidate = 60;

export default async function WorkDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const t = getDict(locale).works;
  const td = t.detail;
  const tc = getDict(locale).common;
  const h = (path: string) => localeHref(locale, path);

  // Galerie: combina cover + gallery
  const allImages: string[] = [];
  if (work.cover_image_url) allImages.push(work.cover_image_url);
  if (work.gallery_images && Array.isArray(work.gallery_images)) {
    work.gallery_images.forEach((img) => {
      if (img && !allImages.includes(img)) allImages.push(img);
    });
  }

  // Daca nu sunt poze deloc, generam placeholder
  if (allImages.length === 0) {
    const colors: Record<string, [string, string]> = {
      lavoare: ["#e6d3a8", "#8c6a3a"],
      blaturi: ["#3a342c", "#1a1814"],
      altele: ["#c9a76b", "#5a4a30"],
    };
    const [c1, c2] = colors[work.category] ?? colors.lavoare;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
        <filter id="n">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2"/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0"/>
        </filter>
      </defs>
      <rect width="1200" height="750" fill="url(#g)"/>
      <rect width="1200" height="750" filter="url(#n)" opacity="0.5"/>
    </svg>`;
    allImages.push(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
  }

  // Related — alte lucrari din aceeasi categorie
  const related = (await getWorks({ category: work.category, limit: 4 }))
    .filter((w) => w.id !== work.id)
    .slice(0, 3);

  // Info fields cu mapare la traduceri
  const infoFields: Array<{ key: string; label: string; value: string }> = [];
  if (work.info && typeof work.info === "object") {
    const map: Record<string, string> = {
      locatie: td.infoLocation,
      suprafata: td.infoArea,
      an: td.infoYear,
      designer: td.infoDesigner,
    };
    Object.entries(work.info).forEach(([k, v]) => {
      if (v && String(v).trim() && String(v) !== "—") {
        infoFields.push({ key: k, label: map[k] ?? k, value: String(v) });
      }
    });
  }

  const categoryLabel =
    work.category === "lavoare"
      ? t.filterWashbasins
      : work.category === "blaturi"
        ? t.filterCountertops
        : t.filterOther;

  return (
    <>
      <Nav />
      <main>
        <section className="px-5 sm:px-8 lg:px-15 pt-28 sm:pt-32 pb-10 max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.15em] uppercase text-ink-muted mb-8 flex-wrap">
            <Link href={h("/")} className="hover:text-ink transition-colors">{tc.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={h("/lucrari")} className="hover:text-ink transition-colors">{t.titleA} {t.titleB}</Link>
            <span>/</span>
            <span className="text-ink truncate">{work.title}</span>
          </nav>

          {/* Header */}
          <div className="mb-10 sm:mb-14">
            <div className="eyebrow mb-4">{categoryLabel}</div>
            <h1 className="font-serif font-light leading-[1.05] tracking-tight" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
              {work.title}
            </h1>
            {work.subtitle && (
              <div className="mt-4 text-sm tracking-[0.15em] uppercase text-ink-muted">{work.subtitle}</div>
            )}
          </div>

          {/* Galerie */}
          <WorkGallery
            images={allImages}
            alt={work.title}
            prevLabel={td.prevImage}
            nextLabel={td.nextImage}
            zoomLabel={td.zoomImage}
            closeLabel={td.closeImage}
          />

          {/* Info + Description */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-20 mt-14 sm:mt-20">
            <div>
              {work.description && (
                <div className="text-lg leading-relaxed text-ink-soft whitespace-pre-wrap">
                  {work.description}
                </div>
              )}
            </div>

            {infoFields.length > 0 && (
              <aside className="lg:sticky lg:top-32 self-start">
                <div className="bg-bg-paper rounded-2xl border border-line p-6 sm:p-8">
                  <dl className="space-y-5">
                    {infoFields.map((f) => (
                      <div key={f.key} className="border-b border-line-soft pb-4 last:border-0 last:pb-0">
                        <dt className="text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-2">{f.label}</dt>
                        <dd className="font-serif text-xl">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            )}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <Reveal>
            <section className="bg-bg-paper px-5 sm:px-8 lg:px-15 py-20 sm:py-30 mt-20">
              <div className="max-w-[1400px] mx-auto">
                <div className="mb-10 sm:mb-15">
                  <div className="eyebrow mb-4">{td.relatedEyebrow}</div>
                  <h2 className="section-title">{td.relatedTitle}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
                  {related.map((w) => (
                    <WorkCard key={w.id} work={w} locale={locale} />
                  ))}
                </div>
              </div>
            </section>
          </Reveal>
        )}

        {/* Back to list */}
        <div className="text-center py-12 sm:py-16">
          <Link href={h("/lucrari")} className="btn btn-ghost">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            {td.backToList}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}