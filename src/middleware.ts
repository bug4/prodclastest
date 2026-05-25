import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const PUBLIC_LOCALES: Locale[] = ["en", "ru"]; // rutele care primesc prefix
// "ro" nu primeste prefix - este default si serveste de la /

function getLocaleFromPath(pathname: string): Locale | null {
  const seg = pathname.split("/")[1];
  if (LOCALES.includes(seg as Locale)) return seg as Locale;
  return null;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip pentru admin si fisiere statice
  const isAdmin = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api");

  // === I18N REWRITE pentru rutele publice ===
  if (!isAdmin && !isApi) {
    const localeInPath = getLocaleFromPath(pathname);

    if (!localeInPath) {
      // URL fara prefix de limba -> rescriem intern la /ro/...
      // Userul vede in browser: /produse
      // Next.js serveste din: /ro/produse
      const url = request.nextUrl.clone();
      url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // === SUPABASE AUTH (pentru admin) ===
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/admin") &&
      !request.nextUrl.pathname.startsWith("/admin/login") &&
      !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
