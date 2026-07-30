import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gustavo.consulting'),
  title: {
    default: "Gustavo Martínez — Estrategia centrada en las personas",
    template: "%s | Gustavo Martínez Business Consulting",
  },
  description:
    "Consejero · Consultor · Educación ejecutiva. Más de 30 años de experiencia en México y LATAM.",
  keywords: ["consultoría estratégica", "customer centricity", "estrategia empresarial", "LATAM", "dirección ejecutiva", "Gustavo Martínez"],
  authors: [{ name: "Gustavo Martínez Pellón", url: "https://gustavo.consulting" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://gustavo.consulting",
    siteName: "Gustavo Martínez Business Consulting",
    title: "Gustavo Martínez — Estrategia centrada en las personas",
    description: "Consejero · Consultor · Educación ejecutiva. Más de 30 años de experiencia en México y LATAM.",
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: "Gustavo Martínez — Estrategia centrada en las personas" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gustavo Martínez — Estrategia centrada en las personas",
    description: "Consejero · Consultor · Educación ejecutiva. Más de 30 años de experiencia en México y LATAM.",
    images: ['/opengraph-image'],
  },
  robots: { index: true, follow: true },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gustavo Martínez Pellón',
  jobTitle: 'Consejero, Consultor y Formador en Educación Ejecutiva',
  url: 'https://gustavo.consulting',
  email: 'contacto@gustavo.consulting',
  sameAs: ['https://www.linkedin.com/in/gustavo-mart%C3%ADnez-pell%C3%B3n-19a44238/'],
  knowsAbout: ['Consultoría Estratégica', 'Customer Centricity', 'Educación Ejecutiva', 'Advisory Board'],
  worksFor: {
    '@type': 'Organization',
    name: 'Gustavo Martínez Business Consulting',
    url: 'https://gustavo.consulting',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
