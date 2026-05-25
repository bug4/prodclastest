"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { useLocale, localeHref } from "@/lib/useLocale";
import { getDict, LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n";

export function Nav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = getDict(locale).nav;

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname]);

  const links = [
    { internal: "/", label: t.home },
    { internal: "/produse", label: t.products },
    { internal: "/promotii", label: t.promotions },
    { internal: "/arhitecti", label: t.architects },
    { internal: "/contacte", label: t.contact },
  ];

  // Pentru detectarea activa: scoatem prefixul de limba din pathname
  const pathWithoutLocale = (() => {
    const seg = pathname.split("/")[1];
    if (LOCALES.includes(seg as Locale)) {
      return pathname.replace(`/${seg}`, "") || "/";
    }
    return pathname;
  })();

  const isActive = (internal: string) =>
    internal === "/" ? pathWithoutLocale === "/" : pathWithoutLocale.startsWith(internal);

  const switchLocaleHref = (newLocale: Locale) => {
    return localeHref(newLocale, pathWithoutLocale);
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-15 transition-all duration-500",
        scrolled
          ? "py-4 bg-bg/85 backdrop-blur-xl border-b border-line-soft"
          : "py-6"
      )}
      style={{ paddingLeft: "60px", paddingRight: "60px" }}
    >
      <Link href={localeHref(locale, "/")} className="flex items-center gap-3 group" aria-label="Prodclas">
        <Logo />
      </Link>

      <nav className="hidden lg:flex gap-10" aria-label="Principal">
        {links.map((link) => (
          <Link
            key={link.internal}
            href={localeHref(locale, link.internal)}
            className={clsx(
              "relative text-[13px] font-medium tracking-[0.12em] uppercase py-1.5 transition-colors duration-300",
              "after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brass after:transition-all after:duration-500 after:ease-out",
              isActive(link.internal)
                ? "text-ink after:w-full"
                : "text-ink-soft after:w-0 hover:text-ink hover:after:w-full"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-5">
        <div className="relative hidden lg:block">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] px-3.5 py-2 border border-line rounded-full transition-colors duration-300 hover:border-brass hover:text-brass-deep"
          >
            <span>{LOCALE_NAMES[locale]}</span>
            <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true" className={clsx("transition-transform", langOpen && "rotate-180")}>
              <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          {langOpen && (
            <div className="absolute top-full right-0 mt-2 bg-bg-paper border border-line rounded-2xl shadow-xl overflow-hidden min-w-[100px]">
              {LOCALES.map((l) => (
                <Link
                  key={l}
                  href={switchLocaleHref(l)}
                  className={clsx(
                    "block px-5 py-3 text-xs font-semibold tracking-[0.1em] transition-colors",
                    l === locale ? "bg-ink text-bg-paper" : "hover:bg-bg-deep"
                  )}
                  onClick={() => setLangOpen(false)}
                >
                  {LOCALE_NAMES[l]}
                </Link>
              ))}
            </div>
          )}
        </div>

        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label={t.menu}
        >
          <span className={clsx("w-5.5 h-px bg-ink transition-transform duration-300", open && "rotate-45 translate-y-[5px]")} />
          <span className={clsx("w-5.5 h-px bg-ink transition-transform duration-300", open && "-rotate-45 -translate-y-[3px]")} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 bg-bg z-40 flex flex-col items-center justify-center gap-8 pt-20">
          {links.map((link) => (
            <Link
              key={link.internal}
              href={localeHref(locale, link.internal)}
              className={clsx(
                "text-2xl font-serif tracking-tight",
                isActive(link.internal) ? "text-brass-deep italic" : "text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-4 mt-6 pt-6 border-t border-line w-32 justify-center">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={switchLocaleHref(l)}
                className={clsx(
                  "text-xs font-semibold tracking-[0.15em] px-3 py-1.5 rounded-full",
                  l === locale ? "bg-ink text-bg-paper" : "border border-line"
                )}
              >
                {LOCALE_NAMES[l]}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
