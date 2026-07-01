import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { LavuarConfigurator, type ConfiguratorTile } from "@/components/LavuarConfigurator";
import { getProducts } from "@/lib/data";
import { getDict, type Locale } from "@/lib/i18n";

export const revalidate = 60;

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function ConfiguratorPage({ params }: Props) {
  const { locale } = await params;
  const t = getDict(locale).configurator;

  const products = await getProducts({ configuratorOnly: true });
  const tiles: ConfiguratorTile[] = products
    .filter((p) => p.image_url)
    .map((p) => ({ name: p.name, img: p.image_url, slug: p.slug }));

  return (
    <>
      <Nav />
      <main>
        <section className="px-5 sm:px-8 lg:px-15 pt-32 sm:pt-40 pb-16 sm:pb-20 max-w-[1400px] mx-auto">
          <Reveal>
            <div className="eyebrow mb-6">{t.eyebrow}</div>
            <h1 className="page-title max-w-3xl">
              {t.titleA} <em>{t.titleB}</em>
            </h1>
            <p className="mt-6 text-lg text-ink-soft leading-relaxed max-w-2xl">{t.desc}</p>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 sm:mt-12">
              <LavuarConfigurator
                tiles={tiles}
                labels={{
                  hint: t.hint,
                  finishLabel: t.finishLabel,
                  defaultWhite: t.defaultWhite,
                  loading: t.loading,
                }}
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-10 text-sm text-ink-muted leading-relaxed max-w-2xl">{t.note}</p>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}