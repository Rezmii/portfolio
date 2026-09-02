"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/data/portfolio";

const LOCALES: Locale[] = ["pl", "en"];

/** Przełącznik języka — zachowuje bieżącą podstronę, podmienia tylko segment locale. */
export function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname();

  const swap = (locale: Locale) => {
    const segments = pathname.split("/");
    // segments[0] jest puste, segments[1] to locale
    segments[1] = locale;
    return segments.join("/") || `/${locale}`;
  };

  return (
    <nav
      aria-label="Language"
      className="flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-[0.15em]"
    >
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-rule">/</span>}
          {locale === current ? (
            <span aria-current="true" className="text-ink">
              {locale}
            </span>
          ) : (
            <Link
              href={swap(locale)}
              className="text-ink-faint hover:text-accent transition-colors"
            >
              {locale}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
