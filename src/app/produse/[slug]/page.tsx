import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProductBySlug, getProducts } from "@/lib/data";
import { placeholderTile } from "@/lib/placeholder";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Produs negăsit" };
  return {
    title: product.name,
    description: product.description ?? `${product.name} — ${product.collection?.name ?? "Gresie premium"}.`,
  };
}

export const revalidate = 60;

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = (
    await getProducts({ collectionSlug: product.collection?.slug, limit: 5 })
  ).filter((p) => p.id !== product.id).slice(0, 4);

  const imgSrc =
    product.image_url ?? placeholderTile(product.collection?.slug ?? null, product.slug);

  return (
    <>
      <Nav />
      <main>
        <section className="px-8 lg:px-15 pt-32 pb-20 max-w-[1400px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-ink-muted mb-10">
            <Link href="/" className="hover:text-ink transition-colors">Acasă</Link>
            <span>/</span>
            <Link href="/produse" className="hover:text-ink transition-colors">Produse</Link>
            <span>/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-deep">
              {product.collection?.name && (
                <span className="absolute top-6 left-6 z-10 text-[11px] font-semibold tracking-[0.2em] uppercase bg-bg-paper/90 backdrop-blur-md px-4 py-2 rounded-full text-brass-deep">
                  {product.collection.name}
                </span>
              )}
              <Image
                src={imgSrc}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized={imgSrc.startsWith("data:")}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Info */}
            <div className="lg:pt-8">
              <div className="eyebrow mb-6">{product.collection?.name ?? "Gresie"}</div>
              <h1 className="font-serif font-light leading-none tracking-tight mb-8" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
                {product.name}
              </h1>

              {product.description && (
                <p className="text-lg leading-relaxed text-ink-soft mb-10">{product.description}</p>
              )}

              {/* Specs */}
              <dl className="grid grid-cols-2 gap-6 border-y border-line py-8 mb-10">
                {product.origin && <SpecItem label="Origine" value={product.origin} />}
                {product.size && <SpecItem label="Format" value={`${product.size} cm`} />}
                {product.finish && <SpecItem label="Finisaj" value={product.finish} />}
                <SpecItem label="Stoc" value={product.in_stock ? "Disponibil" : "Pe comandă"} />
              </dl>

              {/* Price */}
              <div className="flex items-end justify-between gap-6 mb-10">
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-ink-muted mb-2">Preț</div>
                  <div className="font-serif text-5xl font-medium text-brass-deep">
                    MDL {product.price_mdl.toLocaleString()}
                    <span className="font-sans text-base text-ink-muted ml-2">/ m²</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/contacte" className="btn btn-primary">
                  Solicită ofertă
                  <Arrow />
                </Link>
                <Link href="/contacte" className="btn btn-ghost">Cere mostră</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <Reveal>
            <section className="px-8 lg:px-15 py-30 max-w-[1400px] mx-auto bg-bg-paper">
              <div className="mb-15">
                <div className="eyebrow mb-4">Din aceeași colecție</div>
                <h2 className="section-title">
                  Mai vezi <em>și</em>
                </h2>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          </Reveal>
        )}
      </main>
      <Footer />
    </>
  );
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-1.5">{label}</dt>
      <dd className="font-serif text-xl font-normal">{value}</dd>
    </div>
  );
}

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
