"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "@/components/Logo";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/produse", label: "Produse", icon: "products" },
  { href: "/admin/colectii", label: "Colecții", icon: "collections" },
  { href: "/admin/promotii", label: "Promoții", icon: "promotions" },
  { href: "/admin/articole", label: "Articole", icon: "articles" },
  { href: "/admin/inbox", label: "Inbox", icon: "inbox" },
];

type Props = {
  userEmail: string;
  signOutForm: React.ReactNode;
};

export function AdminSidebar({ userEmail, signOutForm }: Props) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Inchide drawer-ul la navigare
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Blocheaza scroll-ul pe body cand drawer-ul mobile e deschis
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Topbar mobile */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-ink text-bg-paper px-5 py-3 flex items-center justify-between border-b border-white/10">
        <div className="[&_span:first-child]:!text-bg-paper [&_span:nth-child(2)]:!text-brass scale-90 origin-left">
          <Logo variant="light" />
        </div>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="flex flex-col gap-1.5 p-2"
          aria-label="Meniu"
        >
          <span className={clsx("w-6 h-0.5 bg-bg-paper rounded-full transition-transform duration-300", mobileOpen && "rotate-45 translate-y-[8px]")} />
          <span className={clsx("w-6 h-0.5 bg-bg-paper rounded-full transition-transform duration-300", mobileOpen && "-rotate-45")} />
        </button>
      </header>

      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed lg:static top-0 left-0 z-50 h-full w-72 lg:w-64 bg-ink text-bg-paper flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="[&_span:first-child]:!text-bg-paper [&_span:nth-child(2)]:!text-brass">
            <Logo variant="light" />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 -mr-2"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1 overflow-y-auto">
          {NAV.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                  isActive ? "bg-white/10 text-brass" : "hover:bg-white/5"
                )}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="text-xs text-bg-paper/60 mb-2 px-4 truncate">{userEmail}</div>
          {signOutForm}
        </div>
      </aside>
    </>
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
  };
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5">
      {icons[name] ?? null}
    </svg>
  );
}