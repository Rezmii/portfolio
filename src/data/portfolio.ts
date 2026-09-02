// Cała treść portfolio. Edytując projekt, ruszasz wyłącznie ten plik.

export type Locale = "pl" | "en";

/** Tekst w obu językach. */
export type L = Record<Locale, string>;

export interface ProjectImage {
  src: string;
  caption: L;
}

export interface Metric {
  value: string;
  label: L;
}

export interface Project {
  id: string;
  /** Zakres dzialania projektu; "obecnie" znaczy, ze wciaz zyje. */
  year: L;
  title: L;
  /** Jedno zdanie na liście projektów. */
  summary: L;
  role: L;
  stack: string[];
  metrics: Metric[];
  /** Case study w markdownie: punkt wyjścia, co zbudowałem, efekt. */
  body: L;
  images: ProjectImage[];
  liveUrl?: string;
  /** true = da się kliknąć i użyć bez logowania */
  liveIsOpen?: boolean;
  repoIsPrivate?: boolean;
}

export const projects: Project[] = [
  /* ---------------------------------------------------------------- */
  {
    id: "audyty-architektoniczne",
    year: { pl: "2025 — obecnie", en: "2025 — present" },
    title: {
      pl: "System audytów architektonicznych",
      en: "Built-environment accessibility audit system",
    },
    summary: {
      pl: "Trzy aplikacje do audytowania dostępności budynków: mobilna do pracy w terenie, serwis generujący dokumenty i panel webowy. Sprzedawany klientowi w modelu abonamentowym.",
      en: "Three applications for auditing building accessibility: a mobile app for field work, a document generation service and a web panel. Sold to a client on a subscription.",
    },
    role: {
      pl: "Projekt, wdrożenie i utrzymanie całości",
      en: "Design, implementation and maintenance of the whole system",
    },
    stack: [
      "React Native",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "RLS",
      "Zustand",
      "React Query",
      "Zod",
      "Next.js",
    ],
    metrics: [
      {
        value: "69",
        label: {
          pl: "audytów w pierwszym roku",
          en: "audits in the first year",
        },
      },
      {
        value: "34",
        label: {
          pl: "z nich wykonał klient zewnętrzny",
          en: "of them run by the external client",
        },
      },
      {
        value: "5",
        label: {
          pl: "płatnych stanowisk u klienta",
          en: "paid seats at the client",
        },
      },
      {
        value: "27",
        label: {
          pl: "plików testowych na awarie",
          en: "test files covering failures",
        },
      },
    ],
    body: {
      pl: `
### Punkt wyjścia

Audyt dostępności budynku robi się na miejscu — często w piwnicy, na klatce schodowej albo w obiekcie, w którym zasięg jest szczątkowy. Poprzednia aplikacja nie radziła sobie z tym w ogóle: przy słabym połączeniu gubiła dane audytu praktycznie za każdym razem, a to oznaczało powtórny wyjazd w teren.

### Co zbudowałem

System składa się z trzech osobnych aplikacji, które razem obsługują cały cykl: zebranie danych w terenie, wygenerowanie dokumentu i pracę na wynikach przy komputerze.

**Odporność wysyłki.** Wysyłka ponawia się z wykładniczym backoffem i pełnym jitterem, z klasyfikacją błędów — problem sieci, 5xx i 429 kwalifikują się do ponowienia, 401, 403 i 413 nie, bo ponawianie ich nic nie da. Liczba równoległych żądań jest ograniczona, żeby telefon nie wyczerpał pamięci przy wysyłce kilkudziesięciu zdjęć.

**Przerwanie w połowie.** Osobny problem: system operacyjny potrafi ubić aplikację w trakcie wysyłki i wtedy nie wykonuje się żaden kod obsługi błędu. Po ponownym uruchomieniu aplikacja nie zgaduje, co się stało — sprawdza stan po stronie serwera. To istotne, bo istnieje okno, w którym serwer przyjął audyt, a odpowiedź nie zdążyła wrócić; komunikat „nie wysłano" byłby wtedy nieprawdą i audytorka wysłałaby wszystko drugi raz.

**Wielu klientów z jednej bazy kodu.** Kolorystyka, typografia, limity i uprawnienia pochodzą z konfiguracji, nie z osobnych gałęzi. Kolejnego klienta podłącza się ustawieniami. Konto audytora jest przypisane do urządzenia, żeby jeden dostęp nie krążył po firmie.

### Efekt

Utrata danych przestała się zdarzać. System obsługuje zespół Nautila i pracowników klienta zewnętrznego, który płaci za wdrożenie, abonament i stanowiska — w ustaleniu tego modelu brałem udział.
`,
      en: `
### Starting point

A building accessibility audit is done on site — often in a basement, a stairwell or a place with barely any signal. The previous app could not handle that: on a weak connection it lost the audit data in practice every time, which meant driving out to the site again.

### What I built

The system is three separate applications covering the full cycle: collecting data in the field, generating the document and working on the results at a desk.

**Upload resilience.** Uploads retry with exponential backoff and full jitter, with error classification — network failures, 5xx and 429 are worth retrying, 401, 403 and 413 are not. The number of parallel requests is bounded so the phone does not run out of memory while sending dozens of photos.

**Interrupted mid-upload.** A separate problem: the operating system can kill the app during an upload, and then no error-handling code runs at all. On restart the app does not guess what happened — it checks the state on the server. That matters, because there is a window in which the server accepted the audit but the response never came back; a "not sent" message would be a lie, and the auditor would submit everything a second time.

**Several clients from one codebase.** Colours, typography, limits and permissions come from configuration rather than separate branches. Adding another client is a matter of settings. An auditor account is bound to a device, so a single login does not circulate around the company.

### Outcome

Data loss stopped happening. The system serves the Nautil team and the staff of an external client who pays an implementation fee, a subscription and per-seat licences — I took part in setting that model.
`,
    },
    images: [
      {
        src: "/projects/panelarch/panel-1.webp",
        caption: {
          pl: "Pulpit panelu: liczba audytów, wykres w czasie, statusy synchronizacji z aplikacją mobilną i użycie szablonów.",
          en: "The panel dashboard: audit counts, a chart over time, sync status with the mobile app and template usage.",
        },
      },
      {
        src: "/projects/panelarch/panel-2.webp",
        caption: {
          pl: "Zestawienie wymogów najczęściej ocenianych jako niespełnione — liczone w poprzek wszystkich audytów, nie w pojedynczym raporcie.",
          en: "A breakdown of the requirements most often marked as not met — computed across all audits, not within a single report.",
        },
      },
      {
        src: "/projects/panelarch/panel-3.webp",
        caption: {
          pl: "Lista audytów z wyszukiwaniem, filtrami i sortowaniem. Nazwy budynków i adresy zamazane — to dane klienta.",
          en: "The audit list with search, filters and sorting. Building names and addresses are blurred — that is client data.",
        },
      },
      {
        src: "/projects/panelarch/panel-8.webp",
        caption: {
          pl: "Wnętrze audytu: dwadzieścia kategorii, każda z własnym postępem, zdjęciami z terenu i numerem pozycji w raporcie. Zdjęcia audytowanego budynku zamazane.",
          en: "Inside an audit: twenty categories, each with its own progress, photos from the site and its position in the report. Photos of the audited building are blurred.",
        },
      },
      {
        src: "/projects/panelarch/panel-9.webp",
        caption: {
          pl: "Pojedynczy wymóg: ocena TAK / NIE / N-D, komentarz audytora i klasyfikacja. Postęp kategorii przelicza się na bieżąco, a zapis idzie automatycznie.",
          en: "A single requirement: a YES / NO / N-A verdict, the auditor's comment and a classification. Category progress recalculates as you go and saving is automatic.",
        },
      },
      {
        src: "/projects/panelarch/panel-4.webp",
        caption: {
          pl: "Szablony audytów. Każdy to osobna struktura kategorii, podkategorii i wymogów — najobszerniejszy ma ich 325.",
          en: "Audit templates. Each is its own structure of categories, subcategories and requirements — the largest holds 325.",
        },
      },
      {
        src: "/projects/panelarch/panel-5.webp",
        caption: {
          pl: "Licencje klientów: okres kontraktu, liczba audytorów i miesięczny limit audytów. Nazwa klienta zamazana.",
          en: "Client licences: contract period, number of auditors and a monthly audit limit. The client name is blurred.",
        },
      },
      {
        src: "/projects/panelarch/panel-6.webp",
        caption: {
          pl: "Szczegóły licencji: kontrakt, zakładki z audytorami i historią, oraz limity — audyty na miesiąc i rok, regeneracje raportu, zdjęcia na wymóg. Egzekwuje je wyzwalacz w bazie klienta.",
          en: "Licence detail: the contract, tabs for auditors and history, and the caps — audits per month and year, report regenerations, photos per requirement. A trigger in the client's database enforces them.",
        },
      },
      {
        src: "/projects/panelarch/panel-7.webp",
        caption: {
          pl: "Ustawienia audytora i domyślne szablony Worda używane przy generowaniu raportu — także dla audytów przysłanych z aplikacji mobilnej.",
          en: "Auditor settings and the default Word templates used when generating a report — including for audits sent in from the mobile app.",
        },
      },
    ],
    liveUrl: "https://panelarch.nautil.pl",
    repoIsPrivate: true,
  },

  /* ---------------------------------------------------------------- */
  {
    id: "panel-audytow-cyfrowych",
    year: { pl: "2025 — obecnie", en: "2025 — present" },
    title: {
      pl: "Panel audytów dostępności cyfrowej",
      en: "Digital accessibility audit platform",
    },
    summary: {
      pl: "Platforma, która zastąpiła generator raportów zbudowany w arkuszu Google. Korzysta z niej cały zespół audytorski, klienci mają osobny panel.",
      en: "A platform that replaced a report generator built in Google Sheets. Used by the whole audit team, with a separate panel for clients.",
    },
    role: {
      pl: "Projekt, wdrożenie i utrzymanie całości",
      en: "Design, implementation and maintenance of the whole system",
    },
    stack: [
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Google Cloud Storage",
      "Gemini",
      "Sentry",
      "Jest",
    ],
    metrics: [
      {
        value: "234",
        label: {
          pl: "audyty w pierwszym roku",
          en: "audits in the first year",
        },
      },
      {
        value: "12",
        label: {
          pl: "audytorów pracuje w systemie",
          en: "auditors work in the system",
        },
      },
      {
        value: "20 → 5",
        label: {
          pl: "minut na wygenerowanie raportu",
          en: "minutes to generate a report",
        },
      },
      {
        value: "150",
        label: { pl: "plików testowych", en: "test files" },
      },
    ],
    body: {
      pl: `
### Punkt wyjścia

Audyty powstawały w arkuszu Google z dopisanym skryptem. Każda nowa funkcja oznaczała grzebanie w formułach, interfejs był powolny, a wygenerowanie gotowego raportu zajmowało dwadzieścia minut.

### Co zbudowałem

Aplikację webową, która przejęła cały proces: 103 endpointy, 24 modele danych, 95 migracji bazy w czternaście miesięcy.

**Stopniowa migracja zamiast skokowej.** Napisałem dwukierunkową synchronizację z arkuszem, żeby zespół mógł przechodzić na nowy panel we własnym tempie i wracać do starego procesu, gdyby coś nie zadziałało. Nikt nie musiał zaczynać poniedziałku od nowego narzędzia.

**Wsparcie AI oparte o własną bazę wiedzy.** Zbudowałem bazę z W3C Techniques i ACT Rules, z wyszukiwaniem wektorowym i uczeniem na przykładach wskazanych przez audytorów — podpowiedzi opierają się na tym, co zespół uznał za dobre, a nie na wiedzy ogólnej. Do tego licznik kosztów generacji i cache odpowiedzi, żeby wiadomo było, ile to realnie kosztuje.

**Dokumenty.** Raporty DOCX, arkusze, dokumenty VPAT, ocena deklaracji dostępności i sprawdzanie, czy zakres raportu pokrywa się z zakresem umowy. Kryteria WCAG 2.1 i 2.2 oraz EN 301 549.

### Efekt

Czas generowania raportu spadł z dwudziestu minut do pięciu. Przy 234 audytach w pierwszym roku to około 58 godzin pracy audytorów, które wróciły do zespołu.
`,
      en: `
### Starting point

Audits were produced in a Google Sheet with a script bolted on. Every new feature meant digging through formulas, the interface was slow, and producing a finished report took twenty minutes.

### What I built

A web application that took over the whole process: 103 API endpoints, 24 data models and 95 database migrations over fourteen months.

**Gradual migration rather than a cutover.** I wrote two-way synchronisation with the spreadsheet so the team could move at its own pace and fall back to the old process if something went wrong. Nobody had to start a Monday with a new tool.

**AI support built on an in-house knowledge base.** I compiled a knowledge base from W3C Techniques and ACT Rules, with vector search and few-shot learning on examples chosen by the auditors — suggestions draw on what the team considered good, not on general knowledge. Plus generation cost tracking and response caching, so the running cost is visible.

**Documents.** DOCX reports, spreadsheets, VPAT documents, accessibility statement assessment, and checking that the report scope matches the contract scope. WCAG 2.1 and 2.2 criteria, and EN 301 549.

### Outcome

Report generation dropped from twenty minutes to five. Across 234 audits in the first year that is roughly 58 hours of auditor time returned to the team.
`,
    },
    images: [
      {
        src: "/projects/panel-nautil/p1.webp",
        caption: {
          pl: "Pulpit: skróty do audytów w toku, liczniki i aktywność zespołu w ostatnim półroczu z podziałem na statusy. Nazwy audytów zamazane.",
          en: "The dashboard: shortcuts to audits in progress, counters, and six months of team activity broken down by status. Audit names blurred.",
        },
      },
      {
        src: "/projects/panel-nautil/p2.webp",
        caption: {
          pl: "Lista klientów z liczbą audytów i ich stanem. Znacznik przy pierwszym wierszu oznacza klienta powiązanego z Odoo.",
          en: "The client list with the number of audits and their state. The tag on the first row marks a client linked to Odoo.",
        },
      },
      {
        src: "/projects/panel-nautil/p3.webp",
        caption: {
          pl: "Wszystkie 223 audyty w jednym miejscu: status zmieniany bez wchodzenia w audyt, licznik błędów i niespełnionych kryteriów, skrót do folderu z plikami.",
          en: "All 223 audits in one place: status changed without opening the audit, counters of errors and unmet criteria, and a shortcut to the file folder.",
        },
      },
      {
        src: "/projects/panel-nautil/p4.webp",
        caption: {
          pl: "Dane audytu: konfiguracja szablonu raportu, platforma, generowanie tekstów alternatywnych i VPAT, umowa do wglądu tylko dla audytorów. U góry powiązanie audytu z zadaniem w Odoo.",
          en: "Audit data: report template configuration, platform, alt-text and VPAT generation, and the contract visible to auditors only. At the top, linking the audit to a task in Odoo.",
        },
      },
      {
        src: "/projects/panel-nautil/p5.webp",
        caption: {
          pl: "Tabela kryteriów sukcesu dla wybranego zestawu — tutaj WCAG 2.2 AA. Statusy można przeliczyć z listy błędów, a kryteria spoza zakresu audytu są wygaszone.",
          en: "The success-criteria table for the selected set — here WCAG 2.2 AA. Statuses can be recomputed from the error list, and criteria outside the audit's scope are dimmed.",
        },
      },
      {
        src: "/projects/panel-nautil/p6.webp",
        caption: {
          pl: "Główny ekran pracy audytora: błędy pogrupowane po zasadach WCAG, waga i status zmieniane jednym kliknięciem, obok automatyczne skanowanie i narzędzia AI.",
          en: "The auditor's main working screen: errors grouped by WCAG principle, weight and status changed in one click, with automatic scanning and AI tools alongside.",
        },
      },
      {
        src: "/projects/panel-nautil/p7.webp",
        caption: {
          pl: "Pojedynczy błąd. Pola uzupełnione przez AI są oznaczone i podświetlone, a błąd zostaje opisany jako niesprawdzony, dopóki audytor ich nie zatwierdzi.",
          en: "A single error. Fields filled in by AI are marked and highlighted, and the error stays flagged as unchecked until an auditor confirms them.",
        },
      },
      {
        src: "/projects/panel-nautil/p8.webp",
        caption: {
          pl: "Ocena zgodności z normą EN 301 549 — rozdziały 4 i 11, wymagane przy audytach dla administracji. Wstępne oceny i uzasadnienia generuje AI, werdykt zatwierdza audytor.",
          en: "Conformance assessment against EN 301 549 — chapters 4 and 11, required for public-sector audits. AI drafts the ratings and justifications; the auditor approves the verdict.",
        },
      },
      {
        src: "/projects/panel-nautil/p9.webp",
        caption: {
          pl: "Ocena deklaracji dostępności pod kątem art. 10 ustawy. Automat sprawdza wymogi techniczne, ale werdykt trafiający do raportu zawsze zatwierdza audytor.",
          en: "Assessment of the accessibility statement against article 10 of the act. The checker handles the technical requirements, but the verdict that goes into the report is always the auditor's.",
        },
      },
      {
        src: "/projects/panel-nautil/p10.webp",
        caption: {
          pl: "Podsumowanie audytu: udział spełnionych kryteriów, rozkład wagi błędów i dziesięć najczęściej naruszanych wytycznych.",
          en: "Audit summary: the share of criteria met, the distribution of error weights, and the ten most frequently violated guidelines.",
        },
      },
      {
        src: "/projects/panel-nautil/p11.webp",
        caption: {
          pl: "Monitoring AI: koszt i liczba wywołań w miesiącu, w rozbiciu na audytorów i typy zadań — widać, ile realnie kosztuje wsparcie modelu. Nazwiska audytorów zamazane.",
          en: "AI monitoring: monthly cost and call count broken down by auditor and task type — the real cost of model support is visible. Auditor names blurred.",
        },
      },
      {
        src: "/projects/panel-nautil/p12.webp",
        caption: {
          pl: "Panel klienta — osobne konto dla audytowanej instytucji. Widzi w nim tylko swoje audyty, liczbę błędów do poprawy i najnowsze pliki do pobrania. Nazwa klienta i tytuły plików zamazane.",
          en: "The client panel — a separate account for the audited organisation. It shows only their own audits, the number of errors to fix and the latest files to download. Client name and file titles blurred.",
        },
      },
      {
        src: "/projects/panel-nautil/p13.webp",
        caption: {
          pl: "Ten sam audyt oczami klienta: procent spełnionych kryteriów, rozkład wagi błędów i najczęściej naruszane wytyczne — te same dane co u audytora, tylko do odczytu.",
          en: "The same audit through the client's eyes: the share of criteria met, the distribution of error weights and the most-violated guidelines — the same data the auditor sees, read-only.",
        },
      },
      {
        src: "/projects/panel-nautil/p14.webp",
        caption: {
          pl: "Lista błędów udostępniona klientowi. O tym, kiedy błędy stają się dla niego widoczne, decyduje przełącznik po stronie audytora.",
          en: "The error list shared with the client. A toggle on the auditor's side decides when those errors become visible to them.",
        },
      },
      {
        src: "/projects/panel-nautil/p15.webp",
        caption: {
          pl: "Pliki klienta: raport PDF z numerem wersji, deklaracja dostępności i arkusz z błędami — do pobrania pojedynczo albo wszystkie naraz. Nazwy plików zamazane.",
          en: "The client's files: the PDF report with its version number, the accessibility statement and the error spreadsheet — downloadable one by one or all at once. File names blurred.",
        },
      },
    ],
    liveUrl: "https://panel.nautil.pl",
    repoIsPrivate: true,
  },

  /* ---------------------------------------------------------------- */
  {
    id: "panel-izby",
    year: { pl: "2025 — obecnie", en: "2025 — present" },
    title: {
      pl: "Panel zarządzania izbą gospodarczą",
      en: "Industry association management panel",
    },
    summary: {
      pl: "System prowadzenia członkostwa izby: nabór z podpisem kwalifikowanym, komunikaty, wydarzenia, certyfikaty i integracja ze stroną klienta.",
      en: "A system for running an association's membership: applications with a qualified e-signature, announcements, events, certificates and integration with the client's website.",
    },
    role: {
      pl: "Projekt, wdrożenie, kontakt z klientem",
      en: "Design, implementation, direct client contact",
    },
    stack: [
      "Next.js",
      "Prisma",
      "PostgreSQL",
      "BullMQ",
      "Redis",
      "PM2",
      "docxtemplater",
      "pdf-lib",
      "PHP",
    ],
    metrics: [
      {
        value: "196",
        label: {
          pl: "członków obsługiwanych w systemie",
          en: "members handled in the system",
        },
      },
      {
        value: "31",
        label: { pl: "zgłoszeń kandydatów", en: "membership applications" },
      },
      {
        value: "33",
        label: { pl: "modele danych", en: "data models" },
      },
      {
        value: "50",
        label: { pl: "migracji bazy", en: "database migrations" },
      },
    ],
    body: {
      pl: `
### Punkt wyjścia

Izba prowadziła sprawy członkowskie ręcznie: dokumenty w Wordzie, numeracja zgłoszeń pilnowana na piechotę, komunikacja rozsypana po skrzynkach mailowych. Przy stu dziewięćdziesięciu sześciu członkach to przestaje się skalować.

### Co zbudowałem

**Nabór.** Kandydat wypełnia formularz, system generuje deklarację w PDF. Kandydat podpisuje ją podpisem kwalifikowanym i odsyła, a aplikacja weryfikuje obecność podpisu, zanim zgłoszenie trafi do administratora. Przyjęcie kandydata to jedno kliknięcie: dokumenty, konto i dane dostępowe powstają automatycznie.

**Masowa wysyłka.** Maile do wszystkich członków idą przez kolejkę na Redisie, obsługiwaną przez osobny proces. Jest log wysyłek i wznawianie po restarcie — wysyłka do dwustu odbiorców nie może zależeć od tego, czy ktoś nie zrestartuje serwera w złym momencie.

**Wydarzenia i certyfikaty.** Rejestracje z progami cenowymi, statusy płatności, mailingi do uczestników. Osobny moduł certyfikatów z własną numeracją, która musi być ciągła i niepowtarzalna.

**Integracja ze stroną klienta.** Napisałem wtyczkę do WordPressa, która pobiera z panelu listę członków i zapisy na wydarzenia i pokazuje je na publicznej stronie izby. Dane są dzięki temu w jednym miejscu, a strona nie wymaga ręcznej aktualizacji.

### Jak pracowałem

To projekt na zamówienie klienta zewnętrznego. Brałem udział w przygotowaniu oferty i prowadzę bieżące ustalenia bezpośrednio z izbą — bez pośrednika po drodze.
`,
      en: `
### Starting point

The association ran its membership by hand: Word documents, application numbering tracked manually, communication scattered across mailboxes. At a hundred and ninety-six members that stops scaling.

### What I built

**Applications.** A candidate fills in a form and the system generates a declaration as a PDF. The candidate signs it with a qualified e-signature and sends it back, and the application verifies that the signature is present before the submission reaches an administrator. Admitting a member is one click: documents, an account and the credentials are created automatically.

**Bulk mail.** Messages to all members go through a Redis-backed queue handled by a separate worker process, with a send log and resumption after a restart — a send to two hundred recipients cannot depend on nobody restarting the server at the wrong moment.

**Events and certificates.** Registrations with pricing tiers, payment statuses, mailings to attendees. A separate certificates module with its own numbering, which has to stay continuous and unique.

**Integration with the client's website.** I wrote a WordPress plugin that pulls the member list and event sign-ups from the panel and displays them on the association's public site, so the data lives in one place and the website needs no manual updating.

### How I worked

This was built to order for an external client. I took part in preparing the offer and handle day-to-day arrangements directly with the association, with no intermediary.
`,
    },
    images: [
      {
        src: "/projects/pisil-panel/1.webp",
        caption: {
          pl: "Wejście dla kandydata: deklaracja członkowska, wniosek o patronat i dwie ankiety konkursowe.",
          en: "The candidate's entry point: a membership declaration, a patronage request and two competition surveys.",
        },
      },
      {
        src: "/projects/pisil-panel/2.webp",
        caption: {
          pl: "Deklaracja członkowska w pięciu krokach, z zapisem postępu. Żółty pasek to tryb deweloperski — wypełnia formularz danymi testowymi.",
          en: "The membership declaration in five steps, with progress saved. The yellow bar is developer mode — it fills the form with test data.",
        },
      },
      {
        src: "/projects/pisil-panel/3.webp",
        caption: {
          pl: "Obieg podpisu: kandydat pobiera PDF, podpisuje go podpisem kwalifikowanym i odsyła. System sprawdza obecność podpisu, zanim zgłoszenie trafi do izby.",
          en: "The signature flow: the candidate downloads the PDF, signs it with a qualified e-signature and sends it back. The system checks the signature is there before the submission reaches the association.",
        },
      },
      {
        src: "/projects/pisil-panel/4.webp",
        caption: {
          pl: "Panel administracyjny: lista zgłoszeń ze statusami, a pod rozwiniętym wierszem pliki kandydata i dokumenty wygenerowane przy przyjęciu. Dane firm zamazane.",
          en: "The admin panel: submissions with their statuses, and under an expanded row the candidate's files and the documents generated on admission. Company data blurred.",
        },
      },
      {
        src: "/projects/pisil-panel/5.webp",
        caption: {
          pl: "Strefa członkowska od strony izby: pliki wspólne dla wszystkich i pliki przypisane do konkretnego członka.",
          en: "The members' area as the association sees it: files shared with everyone and files attached to one specific member.",
        },
      },
      {
        src: "/projects/pisil-panel/6.webp",
        caption: {
          pl: "Ten sam zestaw widziany przez członka: jego dokumenty przyjęcia, pliki wspólne izby i spis komunikatów.",
          en: "The same set seen by the member: their admission documents, the association's shared files and the list of announcements.",
        },
      },
      {
        src: "/projects/pisil-panel/7.webp",
        caption: {
          pl: "Ręczne dodanie zgłoszenia, dla spraw przysłanych pocztą. Status początkowy decyduje, co system zrobi dalej: sam zapis, wygenerowanie komunikatu albo założenie konta członka.",
          en: "Adding a submission by hand, for cases that arrived by post. The initial status decides what the system does next: just record it, generate an announcement, or create the member's account.",
        },
      },
      {
        src: "/projects/pisil-panel/8.webp",
        caption: {
          pl: "Potwierdzenie weryfikacji wprost mówi, co się wydarzy — łącznie z masową wysyłką do wszystkich członków. Odznaczenie pola zatrzymuje maile i zostawia sam dokument.",
          en: "The verification dialog spells out what will happen — including the bulk send to every member. Unticking the box stops the mail and leaves just the document.",
        },
      },
      {
        src: "/projects/pisil-panel/9.webp",
        caption: {
          pl: "Moduł wydarzeń: czterdzieści szkoleń i konferencji ze statusem szkicu lub publikacji, limitem miejsc i licznikiem zgłoszeń.",
          en: "The events module: forty trainings and conferences, each draft or published, with a seat limit and a sign-up counter.",
        },
      },
      {
        src: "/projects/pisil-panel/10.webp",
        caption: {
          pl: "To samo wydarzenie na publicznej stronie izby. Treść i zapisy pobiera z panelu wtyczka do WordPressa, a licznik wolnych miejsc schodzi z limitu ustawionego przy wydarzeniu.",
          en: "The same event on the association's public site. A WordPress plugin pulls the content and sign-ups from the panel, and the free-places counter counts down from the limit set on the event.",
        },
      },
      {
        src: "/projects/pisil-panel/11.webp",
        caption: {
          pl: "Formularz zapisu. Członkostwo rozpoznawane jest po NIP-ie firmy i to ono decyduje o cenie; osobne pole przyjmuje adres uczestnika, gdy zgłasza go kto inny.",
          en: "The sign-up form. Membership is recognised by the company's tax ID and that decides the price; a separate field takes the attendee's address when someone else registers them.",
        },
      },
      {
        src: "/projects/pisil-panel/12.webp",
        caption: {
          pl: "Zgłoszenia na jedno wydarzenie: poziom cenowy i kwota wynikające z NIP-u firmy, status płatności i rejestracji, licznik pozycji do sprawdzenia. Obok eksport do Excela i wysyłka maila do zapisanych. Dane uczestników zamazane.",
          en: "Sign-ups for a single event: the price tier and amount that follow from the company's tax ID, payment and registration status, and a counter of entries to review. Next to them, an Excel export and a mailing to everyone registered. Participant data blurred.",
        },
      },
    ],
    liveUrl: "https://panel.pisil.pl",
    repoIsPrivate: true,
  },

  /* ---------------------------------------------------------------- */
  // --- UKRYTE: Produkt Hub. Odkomentuj ponizszy blok, aby przywrocic. ---
//   {
//     id: "produkt-hub",
//     year: { pl: "2026 — obecnie", en: "2026 — present" },
//     title: {
//       pl: "Produkt Hub — dobór produktów oparty o RAG",
//       en: "Produkt Hub — RAG-based product selection",
//     },
//     summary: {
//       pl: "Projekt własny. Użytkownik opisuje swój problem zwykłym językiem, a narzędzie dobiera z katalogu producenta pojedyncze produkty i całe systemy powłok.",
//       en: "A personal project. The user describes their problem in plain language and the tool selects individual products and complete coating systems from the manufacturer's catalogue.",
//     },
//     role: { pl: "Projekt własny, całość", en: "Personal project, end to end" },
//     stack: [
//       "Next.js",
//       "React",
//       "TypeScript",
//       "Supabase",
//       "pgvector",
//       "Gemini",
//       "PostgreSQL",
//     ],
//     metrics: [
//       {
//         value: "2",
//         label: {
//           pl: "metody wyszukiwania w jednym rankingu",
//           en: "search methods in one ranking",
//         },
//       },
//       {
//         value: "0,645",
//         label: {
//           pl: "próg trafności odpowiedzi",
//           en: "answer relevance threshold",
//         },
//       },
//       {
//         value: "4",
//         label: { pl: "języki interfejsu", en: "interface languages" },
//       },
//     ],
//     body: {
//       pl: `
// ### Skąd pomysł
// 
// Rozmawiałem ze słoweńskim producentem chemii budowlanej i po przejrzeniu jego strony doszedłem do wniosku, że katalog jest nie do przejścia dla kogoś spoza branży. Rzadko wybiera się jeden produkt — zwykle trzeba złożyć system z trzech, a bez wiedzy fachowej nie wiadomo, od czego zacząć.
// 
// ### Co zbudowałem
// 
// **Wyszukiwanie hybrydowe.** Zapytanie idzie równolegle przez wyszukiwanie wektorowe po znaczeniu i pełnotekstowe po słowach. Dwa niezależne rankingi scalam metodą Reciprocal Rank Fusion, więc słabość jednej metody nadrabia druga — semantyka radzi sobie z opisem problemu, pełnotekstowe z konkretnymi symbolami produktów.
// 
// **Narzędzie, które nie zgaduje.** Jeśli najlepsze dopasowanie jest poniżej progu trafności, narzędzie nie wypycha wyników na siłę. Mówi, że nie ma trafnego dopasowania, i podpowiada, co doprecyzować — na przykład podłoże i środowisko. To była świadoma decyzja: pewna, ale błędna odpowiedź jest w tym zastosowaniu gorsza niż brak odpowiedzi.
// 
// **Dane i wdrożenie.** Cały potok od karty technicznej producenta w PDF, przez czyszczenie, po indeksowanie. Baza jest wielodostępna z Row Level Security od pierwszego dnia — anonimowy użytkownik widzi wyłącznie publiczny katalog, a zapytania ofertowe czyta tylko serwer. Jest też wersja do osadzenia na stronie klienta i interfejs w czterech językach.
// 
// ### Gdzie to jest
// 
// Demo jest publiczne i działa bez logowania. Producent zapytał o wdrożenie u siebie, model rozliczeń i integrację z własnymi narzędziami — rozmowy trwają.
// `,
//       en: `
// ### Where it came from
// 
// I was talking to a Slovenian construction chemicals manufacturer, and after going through their website I concluded the catalogue is impenetrable for anyone outside the trade. You rarely pick a single product — usually you have to assemble a system of three, and without domain knowledge there is no obvious place to start.
// 
// ### What I built
// 
// **Hybrid search.** A query runs through vector search by meaning and full-text search by words in parallel. The two independent rankings are merged with Reciprocal Rank Fusion, so each method covers the other's weakness — semantics handles a described problem, full-text handles specific product codes.
// 
// **A tool that does not guess.** If the best match falls below the relevance threshold, the tool does not push results anyway. It says there is no good match and suggests what to specify — the substrate and the environment, for instance. That was a deliberate decision: in this context a confident wrong answer is worse than no answer.
// 
// **Data and deployment.** The full pipeline from the manufacturer's technical data sheets in PDF, through cleaning, to indexing. The database is multi-tenant with Row Level Security from day one — anonymous users see only the public catalogue, and enquiries are readable by the server alone. There is also an embeddable version for the client's website and an interface in four languages.
// 
// ### Where it is
// 
// The demo is public and works without logging in. The manufacturer asked about deploying it, the commercial model and integration with their own tools — talks are ongoing.
// `,
//     },
//     images: [],
//     liveUrl: "https://produkt-hub.vercel.app",
//     liveIsOpen: true,
//     repoIsPrivate: true,
//   },
  /* ---------------------------------------------------------------- */
  {
    id: "sklep-pasmanteria",
    year: { pl: "2025 — obecnie", en: "2025 — present" },
    title: {
      pl: "Sklep B2B hurtowni pasmanteryjnej",
      en: "B2B store for a haberdashery wholesaler",
    },
    summary: {
      pl: "Przeniesienie hurtowni z PrestaShopu na WooCommerce i spięcie sklepu z magazynem RAKS. Dwadzieścia dwa tysiące produktów, sprzedaż wyłącznie firmom, przepięcie bez utraty zamówień.",
      en: "Moving a wholesaler from PrestaShop to WooCommerce and wiring the store to the RAKS warehouse system. Twenty-two thousand products, business customers only, cut over without losing orders.",
    },
    role: {
      pl: "Prowadzenie całości: rozpoznanie, dobór narzędzi i wykonawców, integracja, kod, przepięcie i utrzymanie",
      en: "Ownership of the whole project: research, choosing tools and vendors, integration, code, cutover and maintenance",
    },
    stack: [
      "WooCommerce",
      "WordPress",
      "PHP",
      "MySQL",
      "B2BKing",
      "RAKS SQL",
      "Firebird",
      "LiteSpeed",
      "Redis",
    ],
    metrics: [
      {
        value: "22 000",
        label: { pl: "produktów w katalogu", en: "products in the catalogue" },
      },
      {
        value: "6 200",
        label: { pl: "kont klientów B2B", en: "B2B customer accounts" },
      },
      {
        value: "5,9 → 1,2 s",
        label: { pl: "wczytanie panelu sklepu", en: "store admin load time" },
      },
      {
        value: "21 000",
        label: {
          pl: "przekierowań ze starych adresów",
          en: "redirects from old URLs",
        },
      },
    ],
    body: {
      pl: `
### Punkt wyjścia

Hurtownia pasmanteryjna sprzedająca wyłącznie firmom — nici, włóczki, taśmy, guziki. Sklep stał na PrestaShopie, był przestarzały i działał wolno, a prawda o stanach i cenach żyła w magazynie RAKS SQL na serwerze w siedzibie klienta. Trzeba było przenieść sklep na WooCommerce, zachować dwustronną wymianę z magazynem i nie zatrzymać przy tym firmy, która przyjmuje kilkanaście zamówień dziennie.

### Co zrobiłem

**Rozpoznanie i dobór wykonawców.** Ustaliłem, jak przeprowadzić migrację, a potem znalazłem i poprowadziłem firmy do tych części, których nie chciałem brać na siebie w pojedynkę: przeniesienia bazy z PrestaShopu i integracji z RAKS. Znalazłem też wtyczkę dającą sklepowi tryb hurtowy i nowy hosting spełniający wymagania katalogu tej wielkości. Import katalogu i kont klientów ze starego sklepu ruszył w październiku 2025.

**Warstwa logiczna sklepu.** Ceny netto ukryte przed niezalogowanymi, rejestracja z numerem NIP i ręczną weryfikacją konta, rabaty progowe, minimalne ilości i wielokrotności sprzedaży, własne statusy zamówień, strefy wysyłki. Część z tego nie dała się ustawić klikaniem — dopisywałem własne fragmenty w PHP.

**Integracja z magazynem.** Integrator to zamknięte oprogramowanie zewnętrznej firmy: część w PHP po stronie sklepu, część jako skompilowana usługa na serwerze klienta. Mimo że środowisko było mi nieznane, wchodziłem w ten kod i naprawiałem błędy blokujące sprzedaż, odnotowując każdą zmianę, żeby dało się ją odtworzyć po aktualizacji. Tak zamknięte zostały między innymi zamówienia nietrafiające do magazynu, numer NIP z przedrostkiem „PL" zakładający istniejącego klienta jako nowego kontrahenta, rabat hurtowy nieschodzący z faktury i grosze różnicy między sklepem a dokumentem sprzedaży.

**Przepięcie.** Stary sklep działał i przyjmował zamówienia do ostatniego dnia. Pierwsze uruchomienie 15 czerwca 2026 wycofałem tego samego dnia, bo integrator przestał przekazywać dane do magazynu — ruch wrócił na stary sklep i klienci nie odczuli przerwy. Po dwóch dniach przyczyna była znaleziona: dwie wersje sterownika bazy w jednym katalogu. 18 czerwca sklep ruszył produkcyjnie.

**Wydajność.** Sklep działał wolno i w panelu, i dla klientów. Pomiary rozdzieliły to na dwa niezależne problemy i obaliły osiem powszechnych podejrzeń, w tym te o zbyt dużej bazie i nadmiarze wtyczek. Panel zszedł z 5,9 do 1,2 sekundy po przeniesieniu sprawdzania aktualizacji do zadania w tle, a najcięższe zapytanie katalogu z 422 do 23 milisekund po dołożeniu brakujących indeksów.

**Porządki po migracji.** Ze starego sklepu przyjechały rzeczy, które ujawniły się dopiero miesiące później: uśpione promocje ożywające przy każdym zapisie produktu — ponad 1500 realnych przecen ukrytych wśród 34 tysięcy pustych wpisów; blisko 2000 wariantów kolorystycznych z zamrożonym stanem „brak"; 118 kont klientów założonych już po wykonaniu kopii bazy. Ponad 21 tysięcy starych adresów produktów i kategorii przekierowałem na nowe.

### Jak pracowałem

To najmniej programistyczny z moich projektów i najbardziej rozciągnięty poza kod. Praca polegała w dużej mierze na rozpoznaniu, doborze i prowadzeniu wykonawców, wchodzeniu w cudze zamknięte środowisko i odpowiadaniu za przepięcie działającego biznesu. Nadzorowałem też wykonanie warstwy wizualnej przez innych pracowników firmy. Firma od migracji i integracji dowoziła nierówno, więc znaczną część przenoszenia i porównywania danych wykonałem sam.
`,
      en: `
### Starting point

A haberdashery wholesaler selling to businesses only — threads, yarns, tapes, buttons. The store ran on PrestaShop, was dated and slow, while the truth about stock and prices lived in RAKS SQL, a warehouse system on a server at the client's premises. The store had to move to WooCommerce, keep the two-way exchange with the warehouse, and not stop a company taking a dozen-odd orders a day.

### What I did

**Research and choosing vendors.** I worked out how to run the migration, then found and directed the firms for the parts I did not want to carry alone: moving the database off PrestaShop and integrating with RAKS. I also found the plugin that gives the store a wholesale mode, and new hosting that could carry a catalogue of this size. The import of the catalogue and customer accounts from the old store started in October 2025.

**The store's logic.** Net prices hidden from anonymous visitors, registration with a tax ID and manual account approval, tiered discounts, minimum quantities and sale multiples, custom order statuses, shipping zones. Some of it could not be configured by clicking — I wrote my own PHP snippets for those.

**Warehouse integration.** The connector is closed third-party software: part PHP on the store side, part a compiled service on the client's server. Although the environment was unfamiliar to me, I went into that code and fixed the faults that were blocking sales, recording every change so it could be reapplied after an update. That closed, among others, orders never reaching the warehouse, a tax ID carrying a "PL" prefix registering an existing customer as a new one, wholesale discounts missing from invoices, and penny-level differences between the store and the sales document.

**The cutover.** The old store kept running and taking orders until the last day. I rolled back the first go-live on 15 June 2026 the same day, because the connector stopped passing data to the warehouse — traffic returned to the old store and customers noticed no interruption. Two days later the cause was found: two versions of a database driver in one directory. On 18 June the store went live for good.

**Performance.** The store was slow both in the admin and for customers. Measurement split that into two independent problems and disproved eight common suspicions, including the ones about an oversized database and too many plugins. The admin went from 5.9 to 1.2 seconds once update checks moved to a background job, and the heaviest catalogue query from 422 to 23 milliseconds once the missing indexes were added.

**Cleaning up after the migration.** Things arrived from the old store and surfaced only months later: dormant promotions that woke up whenever a product was saved — over 1,500 real markdowns hidden among 34,000 empty records; close to 2,000 colour variants frozen as out of stock; 118 customer accounts created after the database copy was taken. I redirected over 21,000 old product and category URLs to their new addresses.

### How I worked

This is the least code-heavy of my projects and the one that reached furthest beyond code. Much of the work was research, selecting and directing vendors, working inside someone else's closed environment, and owning the cutover of a running business. I also supervised the visual layer, which was built by colleagues at my company. The migration and integration vendor delivered unevenly, so I did a large share of the data transfer and verification myself.
`,
    },
    images: [
      {
        src: "/projects/pasmanteria/sklep-1.webp",
        caption: {
          pl: "Strona główna. Nad katalogiem informacja, że hurtownia sprzedaje wyłącznie podmiotom gospodarczym.",
          en: "Home page. A notice above the catalogue states the wholesaler sells to businesses only.",
        },
      },
      {
        src: "/projects/pasmanteria/sklep-2.webp",
        caption: {
          pl: "Kategoria włóczek. Katalog ma 34 kategorie z zagnieżdżonymi podkategoriami.",
          en: "A yarn category. The catalogue has 34 categories with nested subcategories.",
        },
      },
      {
        src: "/projects/pasmanteria/sklep-3.webp",
        caption: {
          pl: "Lista produktów po zalogowaniu. Ceny netto przy każdym kaflu, a nad katalogiem pasek liczący, ile brakuje do rabatu hurtowego.",
          en: "Product listing after logging in. Net prices on every tile, and above the catalogue a bar counting how much is left to the wholesale discount.",
        },
      },
      {
        src: "/projects/pasmanteria/sklep-4.webp",
        caption: {
          pl: "Karta produktu. Cena zasłonięta do momentu zalogowania — tak działa cały sklep.",
          en: "Product page. The price stays hidden until login — that is how the whole store works.",
        },
      },
      {
        src: "/projects/pasmanteria/sklep-5.webp",
        caption: {
          pl: "Widok mobilny listy produktów.",
          en: "Mobile view of the product listing.",
        },
      },
      {
        src: "/projects/pasmanteria/sklep-produkt.webp",
        caption: {
          pl: "Karta produktu po zalogowaniu: cena netto, a pod opisem lista kolorów — każdy ma własną cenę, stan magazynowy i pole ilości.",
          en: "Product page after logging in: the net price, and below the description the colour list — each with its own price, stock level and quantity field.",
        },
      },
    ],
  },

];

/* ================================================================== */

export const personalInfo = {
  name: "Bartosz Rezmer",
  email: "bartoszrezmer20@gmail.com",
  github: "https://github.com/Rezmii",
  linkedin: "https://www.linkedin.com/in/bartosz-rezmer/",
  avatarUrl: "/avatar.jpg",
  cv: { pl: "/cv.pdf", en: "/cv-en.pdf" } as L,
  role: { pl: "Software Developer", en: "Software Developer" } as L,
  intro: {
    pl: "Odpowiadam za całe oprogramowanie w firmie audytorskiej — od systemów audytowych i aplikacji mobilnej po strony i sklepy internetowe. Dwa z systemów, które zbudowałem, kupują klienci zewnętrzni. Z klientami rozmawiam bezpośrednio, od zebrania wymagań po późniejsze zmiany.",
    en: "I am responsible for all software at an accessibility audit company — from audit systems and a field mobile app to websites and online stores. Two of the systems I built are sold to external clients. I work with clients directly, from gathering requirements through to later changes.",
  } as L,
};

/* ================================================================== */

export const ui: Record<string, L> = {
  projectsHeading: { pl: "Projekty", en: "Projects" },
  projectsNote: {
    pl: "Kod większości z nich jest zamknięty — poniżej opisy, liczby i zrzuty ekranu.",
    en: "Most of the code is proprietary — below are write-ups, numbers and screenshots.",
  },
  cvLink: { pl: "CV (PDF)", en: "Résumé (PDF)" },
  backToIndex: { pl: "Wszystkie projekty", en: "All projects" },
  role: { pl: "Rola", en: "Role" },
  stack: { pl: "Technologie", en: "Stack" },
  liveOpen: { pl: "Otwórz demo", en: "Open the demo" },
  liveClosed: { pl: "Aplikacja produkcyjna", en: "Production app" },
  liveClosedNote: { pl: "wymaga logowania", en: "requires a login" },
  repoPrivate: { pl: "Repozytorium prywatne", en: "Private repository" },
  screenshots: { pl: "Zrzuty ekranu", en: "Screenshots" },
  galleryHint: { pl: "Kliknij, aby powiększyć", en: "Click to enlarge" },
  close: { pl: "Zamknij", en: "Close" },
  prev: { pl: "Poprzedni", en: "Previous" },
  next: { pl: "Następny", en: "Next" },
  footerNote: {
    pl: "Strona zbudowana w Next.js. Kod jest publiczny.",
    en: "Built with Next.js. The source is public.",
  },
};
