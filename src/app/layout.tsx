import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Prodclas — Maison de Ceramică",
    template: "%s · Prodclas",
  },
  description:
    "Furnizor premium de gresie și faianță în Republica Moldova. Colecții italiene, spaniole și braziliene, consultanță arhitecturală, livrare în toată țara.",
  metadataBase: new URL("https://prodclas.md"),
  openGraph: {
    title: "Prodclas — Maison de Ceramică",
    description: "Gresie și faianță premium în Chișinău.",
    type: "website",
    locale: "ro_MD",
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
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}
