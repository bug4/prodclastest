// Server-safe helper pentru a construi link-uri cu prefix de limba
import { DEFAULT_LOCALE, type Locale } from "./i18n";

export function localeHref(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path === "/" ? "/" : path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}
