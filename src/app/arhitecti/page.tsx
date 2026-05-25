import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArchitectForm } from "@/components/ArchitectForm";
import { INTERIORS } from "@/lib/interiors";

export const metadata = {
  title: "Pentru arhitecți și designeri",
  description: "Programul Prodclas Studio — mostre, prețuri preferențiale, consultanță tehnică.",
};

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
    title: "Răspuns în 24h",
    body: "Un consultant dedicat răspunde la cereri în maxim o zi lucrătoare.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 10h18" />
      </svg>
    ),
    title: "Prețuri preferențiale",
    body: "Tarife dedicate pe toate colecțiile, valabile imediat după înregistrare.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16v16H4z" />
        <path d="M9 9h6v6H9z" />
      </svg>
    ),
    title: "Mostre gratuite",
    body: "Trimitem mostre fizice la birou sau la șantier, fără cost suplimentar.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Acces lansări",
    body: "Cataloage tehnice și mostre din colecții noi cu 30 de zile înainte de lansare.",
  },
];

export default function ArhitectiPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="px-8 lg:px-15 pt-44 lg:pt-52 pb-20 max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-end">
          <div>
            <div className="eyebrow mb-6">Programul Prodclas Studio</div>
            <h1 className="page-title">
              Pentru <em>arhitecți</em> și designeri
            </h1>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed max-w-xl">
            Construim relații lungi cu studiouri de arhitectură și designeri de interior. Mostre rapide,
            consultanță tehnică, prețuri preferențiale și acces la lansări înainte de catalog public.
          </p>
        </section>

        <div className="grid lg:grid-cols-4 gap-px bg-line border-y border-line max-w-[1400px] mx-auto mb-30">
          {BENEFITS.map((b) => (
            <div key={b.title} className="bg-bg px-8 py-15 text-center">
              <div className="w-8 h-8 text-brass-deep mx-auto mb-6">{b.icon}</div>
              <h4 className="font-serif text-2xl font-normal mb-3">{b.title}</h4>
              <p className="text-sm text-ink-soft leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        <Reveal>
          <section className="grid lg:grid-cols-[1fr_1.2fr] gap-15 lg:gap-24 items-center px-8 lg:px-15 py-32 max-w-[1400px] mx-auto">
            <div className="max-w-md">
              <div className="eyebrow mb-6">Cum lucrăm</div>
              <h2 className="section-title">
                De la <em>concept</em> la șantier.
              </h2>
              <p className="my-8 text-ink-soft leading-relaxed">
                Trimite-ne briefingul proiectului — referințe vizuale, dimensiuni, buget orientativ. În maxim
                48 de ore primești o selecție personalizată, mostre fizice și o ofertă completă cu cantități
                și termen de livrare.
              </p>
              <p className="mb-10 text-ink-soft leading-relaxed">
                La nevoie, mergem împreună la șantier. Lucrul în echipă cu meșteri de încredere face
                diferența între un proiect bun și unul memorabil.
              </p>
            </div>

            <div className="relative grid grid-cols-2 gap-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INTERIORS.spa} alt="" className="w-full aspect-[3/4] object-cover rounded-xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={INTERIORS.bath} alt="" className="w-full aspect-[3/4] object-cover rounded-xl mt-15" />
            </div>
          </section>
        </Reveal>

        <section className="bg-ink text-bg-paper px-8 lg:px-15 py-30">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-15 lg:gap-20 items-start">
            <div>
              <div className="eyebrow text-brass mb-6">Înregistrare</div>
              <h2 className="font-serif font-light leading-none tracking-tight text-5xl mb-6">
                Aplică pentru programul{" "}
                <em className="italic font-normal text-brass">Studio</em>
              </h2>
              <p className="text-base leading-relaxed opacity-80 mb-8">
                Câteva detalii despre studio și începem colaborarea. Fără birocrație, fără minim de comandă
                — vrem să fim parteneri pe termen lung.
              </p>
              <ul className="flex flex-col gap-3.5">
                {[
                  "Cont dedicat cu istoric și mostre cerute",
                  "Linie directă cu consultantul tău",
                  "Facturare lunară pentru proiecte recurente",
                  "Vizite în showroom în afara orelor de program",
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm opacity-90">
                    <span className="text-brass">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <ArchitectForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
