import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ExternalLink, Lock } from "lucide-react";
import { projects, ui, type Locale } from "@/data/portfolio";
import { Gallery } from "@/components/gallery";
import { LocaleSwitch } from "@/components/locale-switch";

export function generateStaticParams() {
  return (["pl", "en"] as Locale[]).flatMap((locale) =>
    projects.map((project) => ({ locale, id: project.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) return {};
  const l = locale as Locale;
  return {
    title: `${project.title[l]} — Bartosz Rezmer`,
    description: project.summary[l],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale: raw, id } = await params;
  const locale = raw as Locale;
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[260px] blueprint-grid" />

      <div className="relative mx-auto max-w-4xl px-6 sm:px-10 pb-24">
        {/* ---------------- pasek górny ---------------- */}
        <div className="flex items-center justify-between py-6 border-b border-rule-soft">
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {ui.backToIndex[locale]}
          </Link>
          <LocaleSwitch current={locale} />
        </div>

        {/* ---------------- nagłówek projektu ---------------- */}
        <header className="reveal pt-14 pb-10 border-b border-rule">
          <span className="font-mono text-[0.72rem] tracking-[0.15em] text-ink-faint">
            {project.year[locale]}
          </span>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-[1.08] tracking-[-0.02em] text-ink">
            {project.title[locale]}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-ink-soft">
            {project.summary[locale]}
          </p>

          {(project.liveUrl || project.repoIsPrivate) && (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[0.75rem]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  project.liveIsOpen
                    ? "group inline-flex items-center gap-2 bg-accent text-paper-raised px-3 py-1.5 rounded-sm hover:bg-ink transition-colors"
                    : "group inline-flex items-center gap-2 text-ink hover:text-accent transition-colors"
                }
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {project.liveIsOpen ? (
                  ui.liveOpen[locale]
                ) : (
                  <>
                    <span className="border-b border-rule group-hover:border-accent transition-colors">
                      {ui.liveClosed[locale]}
                    </span>
                    <span className="text-ink-faint">
                      ({ui.liveClosedNote[locale]})
                    </span>
                  </>
                )}
              </a>
            )}
            {project.repoIsPrivate && (
              <span className="inline-flex items-center gap-2 text-ink-faint">
                <Lock className="w-3.5 h-3.5" />
                {ui.repoPrivate[locale]}
              </span>
            )}
          </div>
          )}
        </header>

        {/* ---------------- liczby ---------------- */}
        <section className="reveal grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 py-10 border-b border-rule-soft" style={{ animationDelay: "80ms" }}>
          {project.metrics.map((metric) => (
            <div key={metric.value + metric.label[locale]}>
              <div className="font-display text-3xl sm:text-[2.1rem] leading-none text-accent">
                {metric.value}
              </div>
              <div className="mt-2 font-mono text-[0.68rem] uppercase tracking-wider leading-tight text-ink-faint">
                {metric.label[locale]}
              </div>
            </div>
          ))}
        </section>

        {/* ---------------- treść + metadane ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_190px] gap-x-14 gap-y-10 pt-12">
          <article className="prose-doc reveal" style={{ animationDelay: "140ms" }}>
            <ReactMarkdown>{project.body[locale]}</ReactMarkdown>
          </article>

          <aside className="lg:pt-1 space-y-8 lg:border-l lg:border-rule-soft lg:pl-7">
            <div>
              <h2 className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-faint mb-2">
                {ui.role[locale]}
              </h2>
              <p className="text-[0.86rem] leading-relaxed text-ink-soft">
                {project.role[locale]}
              </p>
            </div>
            <div>
              <h2 className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-ink-faint mb-2">
                {ui.stack[locale]}
              </h2>
              <ul className="space-y-1">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-[0.76rem] text-ink-soft"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* ---------------- zrzuty ekranu ---------------- */}
        <Gallery
          images={project.images}
          locale={locale}
          projectTitle={project.title[locale]}
        />

        {/* ---------------- nawigacja na dole ---------------- */}
        <footer className="mt-20 pt-6 border-t border-rule">
          <Link
            href={`/${locale}`}
            className="group inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-ink-faint hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {ui.backToIndex[locale]}
          </Link>
        </footer>
      </div>
    </main>
  );
}
