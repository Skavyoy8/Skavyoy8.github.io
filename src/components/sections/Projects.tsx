import Link from 'next/link'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { labCopy, projects, statusLabel } from '@/content/lab'
import { site } from '@/content/site'

const linkClass = 'group/link inline-flex items-center gap-2 text-[0.9rem] text-fg/85 transition-colors hover:text-accent'

/** Les projets en liste épurée : numéro, titre, résumé, technos, statut et liens. */
export function Projects() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="lab-title" index={labCopy.index} command={labCopy.command} title={labCopy.title} intro={labCopy.intro} />

      <ul className="mt-16 divide-y divide-line border-y border-line">
        {projects.map((project, i) => (
          <li key={project.slug} className="grid gap-x-8 gap-y-5 py-10 md:grid-cols-[3rem_1fr_auto]" data-reveal style={delay(i * 0.06)}>
            <span className="mono pt-2 text-muted">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="text-[clamp(1.6rem,2.6vw,2.2rem)] leading-tight font-medium tracking-[-0.04em]">{project.title}</h3>
              <p className="mt-3 max-w-2xl text-pretty text-muted">{project.summary}</p>
              <p className="mono mt-4 text-muted">{project.stack.join('  ·  ')}</p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:flex-col md:items-end">
              <span className="mono flex items-center gap-2 text-fg/80">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {statusLabel[project.status]}
                {project.private ? <span className="text-muted">· {labCopy.privateLabel}</span> : null}
              </span>
              {project.detail ? (
                <Link href={`/lab/${project.slug}/`} className={linkClass}>
                  {labCopy.details}
                  <span className="sr-only"> : {project.title}</span>
                  <ArrowIcon direction="right" className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-0.5" />
                </Link>
              ) : null}
              {project.href ? (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {labCopy.source}
                  <span className="sr-only"> : {project.title} (nouvel onglet)</span>
                  <ArrowIcon className="size-3.5" />
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <a href={site.github.url} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex items-center gap-2 text-muted transition-colors hover:text-fg" data-reveal>
        {labCopy.githubCta}
        <ArrowIcon className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        <span className="sr-only">(nouvel onglet)</span>
      </a>
    </section>
  )
}
