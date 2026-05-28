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
  const [worksOpen, setWorksOpen] = useState(false);
  const [worksOpenMobile, setWorksOpenMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
    setWorksOpen(false);
    setWorksOpenMobile(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

  // Link-uri simple
  const simpleLinks = [
    { internal: "/", label: t.home },
    { internal: "/produse", label: t.products },
  ];
  const trailingLinks = [
    { internal: "/promotii", label: t.promotions },
    { internal: "/arhitecti", label: t.architects },
    { internal: "/contacte", label: t.contact },
  ];

  // Subsectiuni Lucrari
  const worksSubmenu = [
    { internal: "/lucrari", label: t.worksAll },
    { internal: "/lucrari?categorie=lavoare", label: t.worksWashbasins },
    { internal: "/lucrari?categorie=blaturi", label: t.worksCountertops },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500",
          "px-5 sm:px-8 lg:px-15",
          scrolled
            ? "py-3 lg:py-4 bg-bg/85 backdrop-blur-xl border-b border-line-soft"
            : "py-4 lg:py-6"
        )}
      >
        <Logo href={localeHref(locale, "/")} />

      <nav className="hidden lg:flex gap-10 items-center" aria-label="Principal">
        {simpleLinks.map((link) => (
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

        {/* Dropdown Lucrari */}
        <div
          className="relative"
          onMouseEnter={() => setWorksOpen(true)}
          onMouseLeave={() => setWorksOpen(false)}
        >
          <Link
            href={localeHref(locale, "/lucrari")}
            className={clsx(
              "relative flex items-center gap-1.5 text-[13px] font-medium tracking-[0.12em] uppercase py-1.5 transition-colors duration-300",
              "after:absolute after:left-0 after:bottom-0 after:h-px after:bg-brass after:transition-all after:duration-500 after:ease-out",
              isActive("/lucrari")
                ? "text-ink after:w-full"
                : "text-ink-soft after:w-0 hover:text-ink hover:after:w-full"
            )}
          >
            {t.works}
            <svg viewBox="0 0 12 12" width="8" height="8" aria-hidden="true" className={clsx("transition-transform duration-300", worksOpen && "rotate-180")}>
              <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </Link>
          {worksOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
              <div className="bg-bg-paper border border-line rounded-2xl shadow-xl overflow-hidden min-w-[180px] py-2">
                {worksSubmenu.map((s) => (
                  <Link
                    key={s.label}
                    href={localeHref(locale, s.internal)}
                    className="block px-5 py-3 text-[12px] tracking-[0.1em] uppercase text-ink-soft hover:text-ink hover:bg-bg-deep transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {trailingLinks.map((link) => (
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
          <span className={clsx("w-6 h-0.5 bg-ink rounded-full transition-transform duration-300", open && "rotate-45 translate-y-[8px]")} />
          <span className={clsx("w-6 h-0.5 bg-ink rounded-full transition-transform duration-300", open && "-rotate-45 -translate-y-[0px]")} />
        </button>
        </div>
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-[100] overscroll-contain"
          style={{ backgroundColor: "#f6f1e9" }}
        >
          <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: "#f6f1e9" }}>
            <div
              className="flex items-center justify-between px-5 py-4 border-b border-line-soft flex-shrink-0"
              style={{ backgroundColor: "#f6f1e9" }}
            >
              <Logo href={localeHref(locale, "/")} />
              <button
                onClick={() => setOpen(false)}
                className="flex flex-col gap-1.5 p-2"
                aria-label="Inchide meniu"
              >
                <span className="w-6 h-0.5 bg-ink rounded-full rotate-45 translate-y-[4px]" />
                <span className="w-6 h-0.5 bg-ink rounded-full -rotate-45 -translate-y-[4px]" />
              </button>
            </div>

            <div
              className="flex-1 flex flex-col items-center justify-center gap-6 px-5 overflow-y-auto py-10"
              style={{ backgroundColor: "#f6f1e9" }}
            >
              {simpleLinks.map((link) => (
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

              {/* Lucrari cu submenu pe mobil */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => setWorksOpenMobile((o) => !o)}
                  className={clsx(
                    "flex items-center gap-2 text-2xl font-serif tracking-tight",
                    isActive("/lucrari") ? "text-brass-deep italic" : "text-ink"
                  )}
                >
                  {t.works}
                  <svg viewBox="0 0 12 12" width="14" height="14" aria-hidden="true" className={clsx("transition-transform", worksOpenMobile && "rotate-180")}>
                    <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>
                {worksOpenMobile && (
                  <div className="flex flex-col items-center gap-3 mt-2">
                    {worksSubmenu.map((s) => (
                      <Link
                        key={s.label}
                        href={localeHref(locale, s.internal)}
                        className="text-base text-ink-soft tracking-wide"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {trailingLinks.map((link) => (
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
          </div>
        </div>
      )}
    </>
  );
}