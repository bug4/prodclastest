import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getCollections, getProducts } from "@/lib/data";

export const metadata = {
  title: "Produse — Gresie și faianță",
  description: "Catalog complet de gresie și faianță premium. Marmură, piatră naturală, terrazzo.",
};

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ colectie?: string }>;
};

export default async function ProdusePage({ searchParams }: Props) {
  const params = await searchParams;
  const activeCollection = params.colectie ?? "toate";

  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts({ collectionSlug: activeCollection }),
  ]);

  return (
    <>
      <Nav />
      <main>
        <section className="px-8 lg:px-15 pt-40 lg:pt-48 pb-15 max-w-[1400px] mx-auto">
          <div className="eyebrow mb-4">Catalog · {products.length} modele</div>
          <h1 className="page-title">
            Gresie și <em>faianță</em>
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
            Colecții italiene, spaniole și braziliene. Toate produsele sunt în stoc sau disponibile la
            comandă în 7–14 zile. Prețurile afișate sunt pe metru pătrat.
          </p>
        </section>

        {/* Filters */}
        <div className="flex items-center gap-6 flex-wrap py-10 px-8 lg:px-15 border-y border-line-soft max-w-[1400px] mx-auto">
          <FilterLink slug="toate" label="Toate" active={activeCollection === "toate"} />
          {collections.map((c) => (
            <FilterLink key={c.id} slug={c.slug} label={c.name} active={activeCollection === c.slug} />
          ))}
          <div className="ml-auto flex gap-4 items-center">
            <small className="text-xs text-ink-muted tracking-wide">Sortează după preț</small>
            <button className="filter-pill">Selectați ▾</button>
          </div>
        </div>

        {/* Products grid */}
        <section className="px-8 lg:px-15 py-15 pb-30 max-w-[1400px] mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-30 text-ink-muted">
              Nu există produse în această colecție momentan.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* CTA */}
        <Reveal>
          <section className="px-8 lg:px-15 py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,167,107,0.12),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(140,106,58,0.08),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="eyebrow inline-flex justify-center mb-8">Nu găsești ce cauți?</div>
              <h2 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                Comenzi <em className="italic font-normal text-brass-deep">speciale</em>
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft mb-12 max-w-xl mx-auto">
                Lucrăm cu peste 40 de fabrici. Trimite-ne o referință vizuală sau descrierea texturii dorite
                — găsim soluția potrivită.
              </p>
              <Link href="/contacte" className="btn btn-primary">
                Discută cu un consultant
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

function FilterLink({ slug, label, active }: { slug: string; label: string; active: boolean }) {
  const href = slug === "toate" ? "/produse" : `/produse?colectie=${slug}`;
  return (
    <Link href={href} className={`filter-pill ${active ? "active" : ""}`}>
      {label}
    </Link>
  );
}
