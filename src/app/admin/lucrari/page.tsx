import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Lucrări" };

export default async function AdminLucrariList() {
  const supabase = await createClient();
  const { data: works } = await supabase
    .from("works")
    .select("*")
    .order("sort_order");

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Portofoliu</div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Lucrări</h1>
        </div>
        <Link href="/admin/lucrari/nou" className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg-paper rounded-full text-sm font-medium hover:bg-brass-deep transition-colors">
          + Adaugă lucrare
        </Link>
      </header>

      <div className="bg-bg-paper rounded-2xl border border-line overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-bg-deep">
            <tr className="text-left text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              <th className="p-4 w-24">Imagine</th>
              <th className="p-4">Titlu</th>
              <th className="p-4">Categorie</th>
              <th className="p-4">Galerie</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {(works ?? []).map((w: any) => (
              <tr key={w.id} className="border-t border-line hover:bg-bg/50 transition-colors">
                <td className="p-3">
                  {w.cover_image_url ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-bg-deep">
                      <Image src={w.cover_image_url} alt={w.title} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 rounded bg-bg-deep flex items-center justify-center text-ink-muted text-xs">—</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="font-serif text-lg">{w.title}</div>
                  <div className="text-xs text-ink-muted">{w.slug}</div>
                </td>
                <td className="p-4 text-sm">
                  <span className="px-2.5 py-1 rounded-full bg-bg-deep text-xs tracking-wide uppercase">
                    {w.category === "lavoare" ? "Lavoare" : "Blaturi"}
                  </span>
                </td>
                <td className="p-4 text-sm text-ink-muted">
                  {Array.isArray(w.gallery_images) ? w.gallery_images.length : 0} poze
                </td>
                <td className="p-4 text-center">
                  {w.is_published ? (
                    <span className="inline-flex items-center gap-2 text-green-700 text-sm"><span className="w-2 h-2 rounded-full bg-green-500" /></span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-ink-muted text-sm"><span className="w-2 h-2 rounded-full bg-line" /></span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <Link href={`/admin/lucrari/${w.id}`} className="text-sm text-brass-deep hover:underline whitespace-nowrap">
                    Editează
                  </Link>
                </td>
              </tr>
            ))}
            {(works ?? []).length === 0 && (
              <tr><td colSpan={6} className="p-10 text-center text-ink-muted">Nicio lucrare încă.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
