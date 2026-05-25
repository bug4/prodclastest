import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { ArchitectForm } from "@/components/ArchitectForm";
import { INTERIORS } from "@/lib/interiors";
import { getDict, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).architects;
  return { title: `${t.titleA} ${t.titleB}`, description: t.desc };
}

const ICONS = [
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 10h18" />
  </svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v16H4z" />
    <path d="M9 9h6v6H9z" />
  </svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>,
];

export default async function ArhitectiPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).architects;
  const tc = getDict(locale).common;

  return (
    <>
      <Nav />
      <main>
        <section className="px-8 lg:px-15 pt-44 lg:pt-52 pb-20 max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-24 items-end">
          <div>
            <div className="eyebrow mb-6">{t.eyebrow}</div>
            <h1 className="page-title">
              {t.titleA} <em>{t.titleB}</em> {t.titleC}
            </h1>
          </div>
          <p className="text-lg text-ink-soft leading-relaxed max-w-xl">{t.desc}</p>
        </section>

        <div className="grid lg:grid-cols-4 gap-px bg-line border-y border-line max-w-[1400px] mx-auto mb-30">
          {t.benefits.map((b, i) => (
            <div key={b.title} className="bg-bg px-8 py-15 text-center">
              <div className="w-8 h-8 text-brass-deep mx-auto mb-6">{ICONS[i]}</div>
              <h4 className="font-serif text-2xl font-normal mb-3">{b.title}</h4>
              <p className="text-sm text-ink-soft leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>

        <Reveal>
          <section className="grid lg:grid-cols-[1fr_1.2fr] gap-15 lg:gap-24 items-center px-8 lg:px-15 py-32 max-w-[1400px] mx-auto">
            <div className="max-w-md">
              <div className="eyebrow mb-6">{t.howEyebrow}</div>
              <h2 className="section-title">
                {t.howTitleA} <em>{t.howTitleB}</em> {t.howTitleC}
              </h2>
              <p className="my-8 text-ink-soft leading-relaxed">{t.howP1}</p>
              <p className="mb-10 text-ink-soft leading-relaxed">{t.howP2}</p>
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
              <div className="eyebrow text-brass mb-6">{t.formEyebrow}</div>
              <h2 className="font-serif font-light leading-none tracking-tight text-5xl mb-6">
                {t.formTitle} <em className="italic font-normal text-brass">{t.formTitleHighlight}</em>
              </h2>
              <p className="text-base leading-relaxed opacity-80 mb-8">{t.formDesc}</p>
              <ul className="flex flex-col gap-3.5">
                {t.formPerks.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm opacity-90">
                    <span className="text-brass">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <ArchitectForm labels={{
              studio: t.form.studio,
              email: t.form.email,
              phone: t.form.phone,
              project: t.form.project,
              projectPlaceholder: t.form.projectPlaceholder,
              submit: t.form.submit,
              submitting: tc.submitting,
            }} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
