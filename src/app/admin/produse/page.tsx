import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { placeholderTile } from "@/lib/placeholder";

export const metadata = { title: "Produse" };

export default async function AdminProduseList() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*, collection:collections(name, slug)")
    .order("sort_order");

  return (
    <>
      <header className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Catalog</div>
          <h1 className="font-serif text-5xl font-light tracking-tight">Produse</h1>
        </div>
        <Link
          href="/admin/produse/nou"
          className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg-paper rounded-full text-sm font-medium hover:bg-brass-deep transition-colors"
        >
          + Adaugă produs
        </Link>
      </header>

      <div className="bg-bg-paper rounded-2xl border border-line overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-deep">
            <tr className="text-left text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              <th className="p-4 w-20">Imagine</th>
              <th className="p-4">Nume</th>
              <th className="p-4">Colecție</th>
              <th className="p-4">Format</th>
              <th className="p-4 text-right">Preț</th>
              <th className="p-4 text-center">Featured</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p: any) => {
              const img = p.image_url ?? placeholderTile(p.collection?.slug ?? null, p.slug);
              return (
                <tr key={p.id} className="border-t border-line hover:bg-bg/50 transition-colors">
                  <td className="p-3">
                    <div className="relative w-12 h-16 rounded overflow-hidden bg-bg-deep">
                      <Image
                        src={img}
                        alt={p.name}
                        fill
                        className="object-cover"
                        unoptimized={img.startsWith("data:")}
                        sizes="48px"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-serif text-lg">{p.name}</div>
                    <div className="text-xs text-ink-muted">{p.slug}</div>
                  </td>
                  <td className="p-4 text-sm">{p.collection?.name ?? "—"}</td>
                  <td className="p-4 text-sm">{p.size ?? "—"}</td>
                  <td className="p-4 text-right font-medium text-brass-deep">MDL {p.price_mdl.toLocaleString()}</td>
                  <td className="p-4 text-center">
                    {p.is_featured ? <span className="text-brass">★</span> : <span className="text-line">—</span>}
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/admin/produse/${p.id}`}
                      className="text-sm text-brass-deep hover:underline"
                    >
                      Editează
                    </Link>
                  </td>
                </tr>
              );
            })}
            {(products ?? []).length === 0 && (
              <tr>
                <td colSpan={7} className="p-10 text-center text-ink-muted">
                  Niciun produs. <Link href="/admin/produse/nou" className="text-brass-deep underline">Adaugă primul</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
