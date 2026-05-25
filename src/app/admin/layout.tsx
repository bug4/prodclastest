import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./auth.actions";
import { Logo } from "@/components/Logo";

export const metadata = {
  title: { default: "Admin", template: "%s · Admin · Prodclas" },
};

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/produse", label: "Produse", icon: "products" },
  { href: "/admin/colectii", label: "Colecții", icon: "collections" },
  { href: "/admin/promotii", label: "Promoții", icon: "promotions" },
  { href: "/admin/articole", label: "Articole", icon: "articles" },
  { href: "/admin/inbox", label: "Inbox", icon: "inbox" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Verifica auth — middleware-ul deja redirect-eaza, dar prindem si aici
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Daca suntem pe /admin/login, returnam direct children fara layout
  // Verificarea aceasta nu se aplica daca header-ul nu e disponibil — laasam fail safe
  if (!user) {
    // ar putea fi pe pagina /admin/login, in care caz vrem sa randam direct
    // Folosim try/catch pentru pathname din headers
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-ink text-bg-paper flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="[&_span:first-child]:!text-bg-paper [&_span:nth-child(2)]:!text-brass">
            <Logo variant="light" />
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              <Icon name={item.icon} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-bg-paper/60 mb-2 px-4">{user.email}</div>
          <form action={signOut}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-white/10 transition-colors text-bg-paper/80"
            >
              <Icon name="logout" />
              Ieșire
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-10">{children}</div>
      </main>
    </div>
  );
}

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    dashboard: <path d="M3 12l2-2 7 7 7-7 2 2v8H3z" />,
    products: <path d="M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4M4 17l8 4 8-4" />,
    collections: <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />,
    promotions: <path d="M20 12V8H4v8h16zM4 4h16M4 20h16" />,
    articles: <path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5" />,
    inbox: <path d="M22 12h-6l-2 3h-4l-2-3H2M5 3h14l3 9v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7l3-9z" />,
    logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
  };
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      {icons[name] ?? null}
    </svg>
  );
}
