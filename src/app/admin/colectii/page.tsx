import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteCollection } from "./actions";

export const metadata = { title: "Colecții" };

export default async function AdminColectiiPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase
    .from("collections")
    .select("*, products:products(count)")
    .order("sort_order");

  return (
    <>
      <header className="flex items-end justify-between mb-10">
        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Organizare</div>
          <h1 className="font-serif text-5xl font-light tracking-tight">Colecții</h1>
        </div>
        <Link
          href="/admin/colectii/nou"
          className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg-paper rounded-full text-sm font-medium hover:bg-brass-deep transition-colors"
        >
          + Adaugă colecție
        </Link>
      </header>

      <div className="bg-bg-paper rounded-2xl border border-line overflow-hidden">
        <table className="w-full">
          <thead className="bg-bg-deep">
            <tr className="text-left text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              <th className="p-4 w-16">#</th>
              <th className="p-4">Nume</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Descriere</th>
              <th className="p-4 text-center">Produse</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {(collections ?? []).map((c: any) => (
              <tr key={c.id} className="border-t border-line hover:bg-bg/50 transition-colors">
                <td className="p-4 text-ink-muted text-sm">{c.sort_order}</td>
                <td className="p-4">
                  <div className="font-serif text-lg">{c.name}</div>
                </td>
                <td className="p-4 text-sm font-mono text-ink-muted">{c.slug}</td>
                <td className="p-4 text-sm text-ink-soft max-w-md truncate">{c.description ?? "—"}</td>
                <td className="p-4 text-center text-sm">{c.products?.[0]?.count ?? 0}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/colectii/${c.id}`} className="text-sm text-brass-deep hover:underline">
                    Editează
                  </Link>
                </td>
              </tr>
            ))}
            {(collections ?? []).length === 0 && (
              <tr><td colSpan={6} className="p-10 text-center text-ink-muted">Nicio colecție.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
