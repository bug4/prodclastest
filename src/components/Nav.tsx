"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/produse", label: "Produse" },
  { href: "/promotii", label: "Promoții" },
  { href: "/arhitecti", label: "Arhitecți" },
  { href: "/contacte", label: "Contacte" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-15 transition-all duration-500",
        scrolled
          ? "py-4 bg-bg/85 backdrop-blur-xl border-b border-line-soft"
          : "py-6"
      )}
      style={{ paddingLeft: scrolled ? "60px" : "60px", paddingRight: scrolled ? "60px" : "60px" }}
    >
      <Logo />

      <nav className="hidden lg:flex gap-10" aria-label="Principal">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "relative text-[13px] font-medium tracking-[0.12em] uppercase py-1.5 transition-colors duration-300",
              "after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brass after:transition-all after:duration-500 after:ease-out",
              isActive(link.href)
                ? "text-ink after:w-full"
                : "text-ink-soft after:w-0 hover:text-ink hover:after:w-full"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <button className="hidden lg:flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] px-3.5 py-2 border border-line rounded-full transition-colors duration-300 hover:border-brass hover:text-brass-deep">
          <span>RO</span>
          <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
            <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Meniu"
        >
          <span className={clsx("w-5.5 h-px bg-ink transition-transform duration-300", open && "rotate-45 translate-y-[5px]")} />
          <span className={clsx("w-5.5 h-px bg-ink transition-transform duration-300", open && "-rotate-45 -translate-y-[3px]")} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 pt-20">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-2xl font-serif tracking-tight",
                isActive(link.href) ? "text-brass-deep italic" : "text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
