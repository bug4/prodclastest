"use client";

import { usePathname } from "next/navigation";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./i18n";

export function useLocale(): Locale {
  const pathname = usePathname();
  const seg = pathname.split("/")[1];
  if (LOCALES.includes(seg as Locale)) return seg as Locale;
  return DEFAULT_LOCALE;
}

// Helper pentru a construi link-uri cu prefix de limba
export function localeHref(locale: Locale, path: string): string {
  // path-ul nostru intern este intotdeauna fara prefix (ex: "/produse", "/")
  if (locale === DEFAULT_LOCALE) return path === "/" ? "/" : path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
