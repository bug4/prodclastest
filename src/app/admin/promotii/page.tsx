import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Promoții" };

export default async function AdminPromotiiList() {
  const supabase = await createClient();
  const { data: promos } = await supabase
    .from("promotions")
    .select("*")
    .order("sort_order");

  return (
    <>
      <header className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Marketing</div>
          <h1 className="font-serif text-5xl font-light tracking-tight">Promoții</h1>
        </div>
        <Link
          href="/admin/promotii/nou"
          className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg-paper rounded-full text-sm font-medium hover:bg-brass-deep transition-colors"
        >
          + Adaugă promoție
        </Link>
      </header>

      <div className="bg-bg-paper rounded-2xl border border-line overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-deep">
            <tr className="text-left text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              <th className="p-4 w-24">Imagine</th>
              <th className="p-4">Titlu</th>
              <th className="p-4">Tag</th>
              <th className="p-4">Discount</th>
              <th className="p-4 text-center">Activă</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {(promos ?? []).map((p: any) => (
              <tr key={p.id} className="border-t border-line hover:bg-bg/50 transition-colors">
                <td className="p-3">
                  {p.image_url ? (
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-bg-deep">
                      <Image src={p.image_url} alt={p.title} fill className="object-cover" sizes="64px" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 rounded bg-bg-deep flex items-center justify-center text-ink-muted text-xs">—</div>
                  )}
                </td>
                <td className="p-4">
                  <div className="font-serif text-lg">{p.title}</div>
                  <div className="text-xs text-ink-muted">{p.slug}</div>
                </td>
                <td className="p-4 text-sm">{p.tag ?? "—"}</td>
                <td className="p-4 text-sm font-medium text-brass-deep">{p.discount_label ?? "—"}</td>
                <td className="p-4 text-center">
                  {p.is_active ? <span className="inline-block w-2 h-2 rounded-full bg-green-500" /> : <span className="inline-block w-2 h-2 rounded-full bg-line" />}
                </td>
                <td className="p-4 text-right">
                  <Link href={`/admin/promotii/${p.id}`} className="text-sm text-brass-deep hover:underline">
                    Editează
                  </Link>
                </td>
              </tr>
            ))}
            {(promos ?? []).length === 0 && (
              <tr><td colSpan={6} className="p-10 text-center text-ink-muted">Nicio promoție.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
