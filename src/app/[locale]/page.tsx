import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { projects, personalInfo, ui, type Locale } from "@/data/portfolio";
import { LocaleSwitch } from "@/components/locale-switch";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] blueprint-grid" />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-10 pb-24">
        {/* ---------------- pasek górny ---------------- */}
        <div className="flex items-center justify-between py-6 border-b border-rule-soft">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-ink-faint">
            Portfolio
          </span>
          <LocaleSwitch current={locale} />
        </div>

        {/* ---------------- nagłówek ---------------- */}
        <header className="reveal grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start pt-16 pb-14">
          <div className="max-w-2xl">
            <h1 className="font-display text-5xl sm:text-6xl leading-[1.02] tracking-[-0.02em] text-ink">
              {personalInfo.name}
            </h1>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.2em] text-accent">
              {personalInfo.role[locale]}
            </p>

            <p className="mt-8 text-[1.05rem] leading-relaxed text-ink-soft">
              {personalInfo.intro[locale]}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[0.78rem]">
              <a
                href={personalInfo.cv[locale]}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-ink hover:text-accent transition-colors"
              >
                <FileText className="w-[0.95rem] h-[0.95rem]" />
                <span className="border-b border-rule group-hover:border-accent transition-colors">
                  {ui.cvLink[locale]}
                </span>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="group inline-flex items-center gap-2 text-ink hover:text-accent transition-colors"
              >
                <Mail className="w-[0.95rem] h-[0.95rem]" />
                <span className="border-b border-rule group-hover:border-accent transition-colors">
                  {personalInfo.email}
                </span>
              </a>
            </div>
          </div>

          <div className="relative w-[150px] sm:w-[190px] aspect-[4/5] shrink-0 order-first md:order-none">
            <div className="absolute -inset-2 border border-rule-soft" aria-hidden />
            <Image
              src={personalInfo.avatarUrl}
              alt={personalInfo.name}
              fill
              sizes="190px"
              priority
              className="object-cover object-top grayscale-[35%]"
            />
          </div>
        </header>

        {/* ---------------- projekty ---------------- */}
        <section id="projects" className="reveal" style={{ animationDelay: "120ms" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-3">
            <h2 className="font-display text-2xl text-ink">
              {ui.projectsHeading[locale]}
            </h2>
            <p className="text-[0.82rem] leading-relaxed text-ink-faint max-w-md sm:text-right">
              {ui.projectsNote[locale]}
            </p>
          </div>

          <ol className="divide-y divide-rule-soft">
            {projects.map((project, index) => (
              <li key={project.id}>
                <Link
                  href={`/${locale}/project/${project.id}`}
                  className="group grid grid-cols-1 md:grid-cols-[3rem_1fr_auto] gap-x-6 gap-y-3 py-8 transition-colors hover:bg-paper-raised -mx-4 px-4"
                >
                  <span className="font-mono text-xs text-ink-faint pt-2 group-hover:text-accent transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="font-display text-[1.45rem] leading-snug text-ink flex items-start gap-2">
                      <span className="border-b border-transparent group-hover:border-accent transition-colors">
                        {project.title[locale]}
                      </span>
                      <ArrowUpRight className="w-4 h-4 mt-2 shrink-0 text-ink-faint group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                    <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-ink-soft">
                      {project.summary[locale]}
                    </p>

                    {/* wyróżnione liczby */}
                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 max-w-xl">
                      {project.metrics.slice(0, 3).map((metric) => (
                        <span key={metric.value + metric.label[locale]} className="block">
                          <span className="block font-display text-lg text-accent leading-none">
                            {metric.value}
                          </span>
                          <span className="mt-1.5 block font-mono text-[0.63rem] uppercase tracking-wider text-ink-faint leading-tight">
                            {metric.label[locale]}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:text-right md:max-w-[190px]">
                    <span className="font-mono text-[0.68rem] text-ink-faint block mb-2">
                      {project.year[locale]}
                    </span>
                    <span className="flex flex-wrap md:justify-end gap-x-3 gap-y-1 font-mono text-[0.68rem] text-ink-faint">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="whitespace-nowrap">
                          {tech}
                        </span>
                      ))}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- stopka ---------------- */}
        <footer className="mt-16 pt-6 border-t border-rule flex flex-col sm:flex-row justify-between gap-4 font-mono text-[0.7rem] text-ink-faint">
          <p>{ui.footerNote[locale]}</p>
          <div className="flex gap-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </div>
    </main>
  );
}
