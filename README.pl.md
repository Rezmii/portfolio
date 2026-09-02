# Portfolio — Bartosz Rezmer

Strona z opisami projektów, nad którymi pracowałem: systemy audytowe, aplikacja mobilna do pracy w terenie i narzędzie doboru produktów oparte o RAG. Kod większości z nich jest zamknięty, więc portfolio pokazuje to, co pokazać można — kontekst, decyzje, liczby i zrzuty ekranu.

**Na żywo:** [portfolio-seven-mocha-34.vercel.app](https://portfolio-seven-mocha-34.vercel.app)

## Jak to jest zbudowane

- **Next.js 16** (App Router, Turbopack) i **React 19**
- **Tailwind CSS 4** — cały system projektowy jako zmienne w `src/app/globals.css`
- **TypeScript**
- Pięć zależności produkcyjnych łącznie. Galeria i podgląd zdjęć są napisane od zera, bez zewnętrznej biblioteki lightboxa.

Strony są generowane statycznie: dwa języki × pięć projektów plus dwie strony główne.

## Dwujęzyczność

Język jest segmentem ścieżki (`/pl`, `/en`), nie stanem w przeglądarce — dzięki temu każdy adres da się wysłać komuś bezpośrednio, a wyszukiwarki widzą obie wersje. `/` przekierowuje na `/pl`.

Cała treść w obu językach leży w jednym pliku: **`src/data/portfolio.ts`**. Typ `L = Record<Locale, string>` wymusza, żeby każdy tekst miał obie wersje — brakującego tłumaczenia nie da się przeoczyć, bo projekt się nie zbuduje.

## Struktura

```
src/
  app/
    [locale]/
      layout.tsx              # kroje pisma, <html lang>, metadane
      page.tsx                # strona główna: nagłówek + indeks projektów
      project/[id]/page.tsx   # case study: liczby, opis, galeria
    globals.css               # zmienne systemu projektowego
  components/
    gallery.tsx               # siatka miniatur + podgląd pełnoekranowy
    locale-switch.tsx         # przełącznik języka
  data/
    portfolio.ts              # ← cała treść, jedyny plik do edycji przy zmianach
public/
  projects/<projekt>/*.webp   # zrzuty ekranu
  cv.pdf, cv-en.pdf
```

## Jak dodać projekt

Dopisz obiekt do tablicy `projects` w `src/data/portfolio.ts`. Nic poza tym plikiem nie wymaga zmian — strona projektu, wpis na liście i trasa statyczna powstają automatycznie.

Pola, które warto wypełnić świadomie:

- `metrics` — liczby, nie opisy funkcji. To one niosą treść na liście i w nagłówku case study.
- `body` — markdown w układzie: punkt wyjścia → co zbudowałem → efekt.
- `images[].caption` — podpis pod zrzutem. Zrzut bez podpisu wymaga od czytelnika zgadywania, co ogląda.
- `liveIsOpen` — `true` tylko wtedy, gdy da się kliknąć i użyć bez logowania. Wtedy przycisk jest wyróżniony.

## System projektowy

Ciepły papier zamiast bieli, głęboki atrament, jeden akcent w terakocie. Krój szeryfowy (Newsreader) na nagłówki, IBM Plex Sans na tekst, IBM Plex Mono na metadane — wszystkie z zakresem `latin-ext`, żeby polskie znaki diakrytyczne nie spadały na krój systemowy.

Kolory i kroje są zdefiniowane raz, w `@theme` w `globals.css`. Zmiana akcentu w całym serwisie to jedna linijka.

## Dostępność

- Podgląd zdjęć obsługuje klawiaturę: `Esc` zamyka, strzałki przewijają
- Widoczny obrys fokusa na wszystkich elementach interaktywnych
- Animacje wyłączają się przy `prefers-reduced-motion`
- Alternatywne opisy zdjęć biorą się z podpisów

## Uruchomienie

```bash
npm install
npm run dev
```

```bash
npm run build
```
