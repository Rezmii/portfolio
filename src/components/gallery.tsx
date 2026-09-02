"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale, ProjectImage } from "@/data/portfolio";
import { ui } from "@/data/portfolio";

interface Props {
  images: ProjectImage[];
  locale: Locale;
  projectTitle: string;
}

export function Gallery({ images, locale, projectTitle }: Props) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null
          ? null
          : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  /* Klawiatura: Esc zamyka, strzałki przewijają. */
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    // Blokada przewijania tła, gdy podgląd jest otwarty.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, go]);

  if (images.length === 0) return null;

  const active = open === null ? null : images[open];
  const activeCaption = active?.caption[locale]?.trim();

  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between border-b border-rule pb-3 mb-6">
        <h2 className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint">
          {ui.screenshots[locale]}
        </h2>
        <span className="font-mono text-[0.7rem] text-ink-faint">
          {ui.galleryHint[locale]}
        </span>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
        {images.map((image, index) => {
          const caption = image.caption[locale]?.trim();
          return (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setOpen(index)}
                className="group block w-full text-left"
                aria-label={`${ui.galleryHint[locale]} — ${caption || `${projectTitle} ${index + 1}`}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-rule bg-paper-sunk transition-colors group-hover:border-accent">
                  <Image
                    src={image.src}
                    alt={caption || `${projectTitle} — ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-2 flex gap-2 items-baseline">
                  <span className="font-mono text-[0.68rem] text-ink-faint shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.82rem] leading-snug text-ink-soft group-hover:text-ink transition-colors">
                    {caption || " "}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          {/* Pasek: licznik + zamknięcie */}
          <div className="flex items-center justify-between px-5 py-4 text-paper">
            <span className="font-mono text-xs tracking-widest opacity-70">
              {String((open ?? 0) + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={close}
              aria-label={ui.close[locale]}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-70 hover:opacity-100 transition-opacity"
            >
              {ui.close[locale]} <X className="w-4 h-4" />
            </button>
          </div>

          {/* Obraz + strzałki */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-3 sm:px-16"
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={ui.prev[locale]}
                className="absolute left-1 sm:left-4 z-10 p-3 text-paper/60 hover:text-paper transition-colors"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
            )}

            <div className="relative w-full h-full">
              <Image
                key={active.src}
                src={active.src}
                alt={activeCaption || projectTitle}
                fill
                sizes="90vw"
                className="object-contain"
                priority
              />
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={ui.next[locale]}
                className="absolute right-1 sm:right-4 z-10 p-3 text-paper/60 hover:text-paper transition-colors"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            )}
          </div>

          {/* Podpis */}
          <div
            className="px-5 py-5 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activeCaption && (
              <p className="mx-auto max-w-2xl text-sm text-paper/85 leading-relaxed">
                {activeCaption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
