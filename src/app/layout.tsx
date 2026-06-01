import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  // Titlu STATIC - nu se schimba per pagina
  title: "Prodclas | Gresie și faianță premium",
  description:
    "Furnizor premium de gresie și faianță în Republica Moldova. Colecții italiene și spaniole, consultanță arhitecturală, livrare în toată țara.",
  metadataBase: new URL("https://prodclas.md"),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Prodclas | Gresie și faianță premium",
    description:
      "Furnizor premium de gresie și faianță în Republica Moldova. Colecții italiene și spaniole.",
    type: "website",
    locale: "ro_MD",
    url: "https://prodclas.md",
    siteName: "Prodclas",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Prodclas — Maison de Ceramică",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prodclas | Gresie și faianță premium",
    description: "Furnizor premium de gresie și faianță în Republica Moldova.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager - se incarca doar daca avem GTM_ID setat */}
        {GTM_ID && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body className="grain">
        {/* Google Tag Manager (noscript) - fallback pentru utilizatori fara JS */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}