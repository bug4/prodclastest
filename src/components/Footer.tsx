"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useLocale, localeHref } from "@/lib/useLocale";
import { getDict } from "@/lib/i18n";

const SOCIALS = [
  { name: "facebook", href: "https://www.facebook.com/share/1BA5f7agLs/", label: "Facebook" },
  { name: "instagram", href: "https://www.instagram.com/prod_class/", label: "Instagram" },
  { name: "tiktok", href: "https://www.tiktok.com/@prodclass", label: "TikTok" },
];

const PHONE_DISPLAY = "+373 62 064 646";
const PHONE_HREF = "tel:+37362064646";
const ADDRESS_DISPLAY = "Str. Iurii Gagarin 30, Vatra";

export function Footer() {
  const locale = useLocale();
  const tNav = getDict(locale).nav;
  const t = getDict(locale).footer;

  return (
    <footer className="bg-ink text-bg-paper px-5 sm:px-8 lg:px-15 pt-16 sm:pt-24 pb-8 sm:pb-10">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] gap-10 sm:gap-12 lg:gap-20 pb-10 sm:pb-15 border-b border-white/10">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="[&_span:first-child]:!text-bg-paper [&_span:nth-child(2)]:!text-brass">
            <Logo variant="light" />
          </div>
          <p className="text-sm leading-relaxed opacity-70 my-5 sm:my-6 max-w-xs">{t.tagline}</p>
          <div className="flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-brass hover:border-brass hover:text-ink"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-brass mb-2 sm:mb-3">{t.navHeader}</h4>
          {[
            { internal: "/", label: tNav.home },
            { internal: "/produse", label: tNav.products },
            { internal: "/lucrari", label: tNav.works },
            { internal: "/promotii", label: tNav.promotions },
            { internal: "/arhitecti", label: tNav.architects },
            { internal: "/contacte", label: tNav.contact },
          ].map((l) => (
            <Link key={l.internal} href={localeHref(locale, l.internal)} className="text-sm opacity-75 hover:opacity-100 hover:text-brass transition-all">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-brass mb-2 sm:mb-3">{t.contactHeader}</h4>
          <a href={PHONE_HREF} className="text-sm opacity-75 hover:opacity-100 hover:text-brass transition-all">
            {PHONE_DISPLAY}
          </a>
          <a href="mailto:contact@prodclas.md" className="text-sm opacity-75 hover:opacity-100 hover:text-brass transition-all break-all">
            contact@prodclas.md
          </a>
          <span className="text-sm opacity-75">{ADDRESS_DISPLAY}</span>
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <h4 className="text-[11px] tracking-[0.25em] uppercase text-brass mb-1">{t.newsletterHeader}</h4>
          <p className="text-[13px] opacity-70 mb-2">{t.newsletterDesc}</p>
          <form className="flex border border-white/20 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder={t.newsletterPlaceholder}
              required
              className="flex-1 bg-transparent border-0 px-4 py-3 text-[13px] focus:outline-none placeholder:text-white/40 min-w-0"
            />
            <button type="submit" className="bg-brass text-ink px-5 hover:bg-brass-light transition-colors flex-shrink-0" aria-label="OK">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-8 sm:mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs opacity-50 text-center sm:text-left">
        <span>© {new Date().getFullYear()} Prodclas. {t.rights}</span>
        <div className="flex gap-6 sm:gap-8">
          <a href="#" className="hover:opacity-100">{t.terms}</a>
          <a href="#" className="hover:opacity-100">{t.privacy}</a>
          <a href="#" className="hover:opacity-100">{t.cookies}</a>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === "facebook")
    return (
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="currentColor" d="M13 21v-7h2.5l.5-3H13V9.2c0-.9.3-1.5 1.6-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.3-3.8 3.8V11H8v3h2v7h3z" />
      </svg>
    );
  if (name === "instagram")
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" width="18" height="18">
      <path
        fill="currentColor"
        d="M16 3v3.2a4.8 4.8 0 0 0 4 2.1V12a8 8 0 0 1-4-1.1V16a5 5 0 1 1-5-5v3.2a2 2 0 1 0 2 2V3z"
      />
    </svg>
  );
}
