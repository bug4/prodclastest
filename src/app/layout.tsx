import type { Metadata } from "next";
import "./globals.css";

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
      </head>
      <body className="grain">{children}</body>
    </html>
  );
}