import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Articole" };

export default async function AdminArticoleList() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
        <div>
          <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Conținut</div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Articole</h1>
        </div>
        <Link href="/admin/articole/nou" className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg-paper rounded-full text-sm font-medium hover:bg-brass-deep transition-colors">
          + Adaugă articol
        </Link>
      </header>

      <div className="bg-bg-paper rounded-2xl border border-line overflow-x-auto">
        <table className="w-full">
          <thead className="bg-bg-deep">
            <tr className="text-left text-[11px] tracking-[0.2em] uppercase text-ink-muted">
              <th className="p-4">Titlu</th>
              <th className="p-4">Categorie</th>
              <th className="p-4">Status</th>
              <th className="p-4">Creat</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {(articles ?? []).map((a: any) => (
              <tr key={a.id} className="border-t border-line hover:bg-bg/50 transition-colors">
                <td className="p-4">
                  <div className="font-serif text-lg">{a.title}</div>
                  <div className="text-xs text-ink-muted">{a.slug}</div>
                </td>
                <td className="p-4 text-sm">{a.category ?? "—"}</td>
                <td className="p-4 text-sm">
                  {a.is_published ? (
                    <span className="inline-flex items-center gap-2 text-green-700"><span className="w-2 h-2 rounded-full bg-green-500" /> Publicat</span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-ink-muted"><span className="w-2 h-2 rounded-full bg-line" /> Draft</span>
                  )}
                </td>
                <td className="p-4 text-sm text-ink-muted">{new Date(a.created_at).toLocaleDateString("ro-RO")}</td>
                <td className="p-4 text-right">
                  <Link href={`/admin/articole/${a.id}`} className="text-sm text-brass-deep hover:underline">Editează</Link>
                </td>
              </tr>
            ))}
            {(articles ?? []).length === 0 && (
              <tr><td colSpan={5} className="p-10 text-center text-ink-muted">Niciun articol încă.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
