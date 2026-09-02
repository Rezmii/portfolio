import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import type { Locale } from "@/data/portfolio";

/* Wszystkie kroje z latin-ext — bez tego polskie znaki diakrytyczne
   spadają na krój systemowy i widać to w środku wyrazów. */
const display = Newsreader({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

const sans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const LOCALES: Locale[] = ["pl", "en"];

/* Adres, względem którego Next dolicza odnośniki kanoniczne i podgląd linku.
   Bez tego adresy względne ("/pl") rozwiązują się do localhost.
   Docelową domenę podaj przez NEXT_PUBLIC_SITE_URL w ustawieniach hostingu. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bartoszrezmer.pl";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const pl = locale === "pl";
  return {
    metadataBase: new URL(SITE_URL),
    title: "Bartosz Rezmer — Software Developer",
    description: pl
      ? "Systemy audytowe, aplikacje mobilne i narzędzia oparte o AI. Opisy projektów, liczby i zrzuty ekranu."
      : "Audit systems, mobile applications and AI-based tools. Project write-ups, numbers and screenshots.",
    alternates: {
      canonical: `/${locale}`,
      languages: { pl: "/pl", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased paper-grain">{children}</body>
    </html>
  );
}
