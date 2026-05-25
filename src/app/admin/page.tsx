import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [products, promos, articles, inbox] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("promotions").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
  ]);

  const stats = [
    { label: "Produse în catalog", value: products.count ?? 0, href: "/admin/produse" },
    { label: "Promoții active", value: promos.count ?? 0, href: "/admin/promotii" },
    { label: "Articole publicate", value: articles.count ?? 0, href: "/admin/articole" },
    { label: "Mesaje necitite", value: inbox.count ?? 0, href: "/admin/inbox" },
  ];

  return (
    <>
      <header className="mb-12">
        <div className="text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">Bine ai venit</div>
        <h1 className="font-serif text-5xl font-light tracking-tight">Dashboard</h1>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="block bg-bg-paper rounded-2xl p-8 border border-line hover:border-brass transition-colors group"
          >
            <div className="text-[10px] tracking-[0.25em] uppercase text-ink-muted mb-4">{s.label}</div>
            <div className="font-serif text-5xl font-normal text-brass-deep mb-2">{s.value}</div>
            <div className="text-xs text-ink-soft group-hover:text-brass-deep transition-colors">
              Gestionează →
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-bg-paper rounded-2xl p-10 border border-line">
        <h2 className="font-serif text-2xl font-light mb-6">Acțiuni rapide</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/produse/nou"
            className="inline-flex items-center gap-2 px-5 py-3 bg-ink text-bg-paper rounded-full text-sm font-medium hover:bg-brass-deep transition-colors"
          >
            + Produs nou
          </Link>
          <Link
            href="/admin/promotii/nou"
            className="inline-flex items-center gap-2 px-5 py-3 border border-line rounded-full text-sm font-medium hover:border-brass-deep transition-colors"
          >
            + Promoție nouă
          </Link>
          <Link
            href="/admin/articole/nou"
            className="inline-flex items-center gap-2 px-5 py-3 border border-line rounded-full text-sm font-medium hover:border-brass-deep transition-colors"
          >
            + Articol nou
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 border border-line rounded-full text-sm font-medium hover:border-brass-deep transition-colors"
          >
            Vezi site-ul live ↗
          </Link>
        </div>
      </section>
    </>
  );
}
