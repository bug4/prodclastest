import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { getPromotions } from "@/lib/data";
import { INTERIORS } from "@/lib/interiors";

export const metadata = {
  title: "Promoții active",
  description: "Oferte sezoniere și pachete dedicate pentru proiecte mari.",
};

export const revalidate = 60;

const FALLBACK_BGS = [INTERIORS.bath, INTERIORS.kitchen, INTERIORS.spa, INTERIORS.living];

export default async function PromotiiPage() {
  const promotions = await getPromotions();

  return (
    <>
      <Nav />
      <main>
        <section className="px-8 lg:px-15 pt-44 lg:pt-52 pb-25 max-w-[1400px] mx-auto text-center">
          <div className="eyebrow inline-flex justify-center mb-6">Oferte curente</div>
          <h1 className="page-title">
            Promoții <em>active</em>
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
            Reduceri sezoniere, oferte pentru proiecte mari și beneficii dedicate partenerilor noștri
            arhitecți și designeri.
          </p>
        </section>

        <section className="px-8 lg:px-15 pb-30 max-w-[1400px] mx-auto">
          {promotions.length === 0 ? (
            <div className="text-center py-30 text-ink-muted">
              Nu sunt promoții active momentan. Revino în curând!
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10">
              {promotions.map((promo, i) => (
                <Reveal key={promo.id}>
                  <article className="relative overflow-hidden rounded-3xl min-h-[420px] flex flex-col group transition-transform duration-500 hover:-translate-y-1">
                    {/* Background */}
                    <div className="absolute inset-0 z-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={promo.image_url ?? FALLBACK_BGS[i % FALLBACK_BGS.length]}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/75" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 mt-auto p-10 text-bg-paper">
                      {promo.discount_label && (
                        <span className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase bg-brass text-ink px-3.5 py-1.5 rounded-full mb-5">
                          {promo.discount_label}
                        </span>
                      )}
                      <h3 className="font-serif font-light text-4xl leading-tight tracking-tight mb-3">
                        {promo.title}
                      </h3>
                      {promo.description && (
                        <p className="text-[15px] opacity-85 mb-6 max-w-md">{promo.description}</p>
                      )}
                      <div className="flex gap-8 text-[11px] tracking-[0.2em] uppercase opacity-75">
                        {promo.tag && <span>{promo.tag}</span>}
                        {promo.valid_until && <span>{promo.valid_until}</span>}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        <Reveal>
          <section className="px-8 lg:px-15 py-40 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(201,167,107,0.12),transparent_50%),radial-gradient(circle_at_80%_30%,rgba(140,106,58,0.08),transparent_60%)]" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(40px, 6vw, 80px)" }}>
                Vrei să fii primul care <em className="italic font-normal text-brass-deep">află</em>?
              </h2>
              <p className="text-lg leading-relaxed text-ink-soft mb-12">
                Abonează-te la newsletter și primești ofertele înainte să apară pe site.
              </p>
              <Link href="/contacte" className="btn btn-primary">Abonează-te</Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
