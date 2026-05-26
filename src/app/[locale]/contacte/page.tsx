import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { INTERIORS } from "@/lib/interiors";
import { getDict, type Locale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).contact;
  return { title: `${t.titleA} ${t.titleB}`, description: t.desc };
}

export default async function ContactePage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).contact;
  const tc = getDict(locale).common;

  return (
    <>
      <Nav />
      <main>
        <section className="px-5 sm:px-8 lg:px-15 pt-44 lg:pt-52 pb-20 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <div className="eyebrow mb-6">{t.eyebrow}</div>
            <h1 className="page-title">
              {t.titleA} <em>{t.titleB}</em>
            </h1>
            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-md">{t.desc}</p>

            <div className="flex flex-col gap-10 mt-15">
              <ContactBlock
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                }
                label={t.phone}
                value="+373 62 064 646"
                href="tel:+37362064646"
              />
              <ContactBlock
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M2 7l10 6 10-6" />
                  </svg>
                }
                label={t.email}
                value="Infoprodclas@gmail.com"
                href="mailto:Infoprodclas@gmail.com"
              />
              <ContactBlock
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
                label={t.address}
                value={<>{t.addressValue}<br />{t.city}</>}
              />
              <ContactBlock
                icon={
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                }
                label={t.schedule}
                value={<>{t.hoursWeekday}<br />{t.hoursSaturday}</>}
              />
            </div>
          </div>

          <div className="relative h-[600px] hidden lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={INTERIORS.bath} alt="" className="absolute top-0 left-0 w-3/5 h-[55%] object-cover rounded-xl shadow-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={INTERIORS.kitchen} alt="" className="absolute top-[10%] right-0 w-[45%] h-[38%] object-cover rounded-xl shadow-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={INTERIORS.spa} alt="" className="absolute bottom-0 left-[15%] w-1/2 h-[45%] object-cover rounded-xl shadow-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={INTERIORS.living} alt="" className="absolute bottom-[8%] right-[5%] w-2/5 h-[35%] object-cover rounded-xl shadow-2xl" />
          </div>
        </section>

        <section className="bg-ink text-bg-paper px-5 sm:px-8 lg:px-15 pt-28 sm:pt-44 pb-20 sm:pb-30 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="mb-15">
              <div className="eyebrow text-brass mb-8">{t.formEyebrow}</div>
              <h2 className="font-serif font-light leading-none tracking-tight text-3xl sm:text-4xl lg:text-5xl mb-6">
                {t.formTitleA} <em className="italic font-normal text-brass">{t.formTitleB}</em>
              </h2>
              <p className="opacity-70">{t.formDesc}</p>
            </div>
            <ContactForm labels={{
              firstName: t.form.firstName,
              lastName: t.form.lastName,
              phone: t.form.phone,
              email: t.form.email,
              subject: t.form.subject,
              subjectPlaceholder: t.form.subjectPlaceholder,
              message: t.form.message,
              submit: tc.sendMessage,
              submitting: tc.submitting,
            }} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ContactBlock({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const Content = href ? (
    <a href={href} className="font-serif text-xl font-normal text-ink hover:text-brass-deep transition-colors">{value}</a>
  ) : (
    <p className="font-serif text-xl font-normal text-ink leading-snug">{value}</p>
  );
  return (
    <div className="flex gap-5 items-start pb-8 border-b border-line-soft last:border-0">
      <div className="w-11 h-11 rounded-full bg-bg-paper border border-line flex items-center justify-center flex-shrink-0 text-brass-deep">
        {icon}
      </div>
      <div>
        <h4 className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-2">{label}</h4>
        {Content}
      </div>
    </div>
  );
}