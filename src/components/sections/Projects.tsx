import Link from 'next/link'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { Fill } from '@/components/ui/Todo'
import { githubRepos, labCopy, projects, statusLabel } from '@/content/lab'
import { isTodo } from '@/content/types'
import type { Repo } from '@/lib/github'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { month: 'short', year: 'numeric', timeZone: 'Europe/Paris' })
const linkClass = 'group/link inline-flex items-center gap-2 text-[0.9rem] text-fg/85 transition-colors hover:text-accent'

export function Projects({ repos }: { repos: Repo[] }) {
  return (
    <section id="lab" aria-labelledby="lab-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="lab-title" index={labCopy.index} title={labCopy.title} intro={labCopy.intro} />

      <ul className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <li key={project.slug} className={`card flex flex-col p-7 ${i === 0 ? 'lg:col-span-2' : ''}`} data-reveal style={delay((i % 3) * 0.08)}>
            <div className="mono flex items-center justify-between gap-4 text-muted">
              <span className="flex items-center gap-2 text-fg/80">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                <Fill value={project.status}>{(status) => statusLabel[status]}</Fill>
              </span>
              {project.private ? <span>{labCopy.privateLabel}</span> : <span>{String(i + 1).padStart(2, '0')}</span>}
            </div>
            <h3 className={`mt-8 font-medium tracking-[-0.035em] ${i === 0 ? 'text-[clamp(1.8rem,3vw,2.6rem)] leading-[1.05]' : 'text-[1.6rem] leading-tight'}`}>{project.title}</h3>
            <p className={`mt-3 flex-1 text-pretty text-muted ${i === 0 ? 'max-w-xl' : 'text-[0.9rem]'}`}>{project.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`Technologies : ${project.title}`}>
              {project.stack.map((tech) => (
                <li key={tech} className="tag">
                  {tech}
                </li>
              ))}
            </ul>
            {project.detail || project.href ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5">
                {project.detail ? (
                  <Link href={`/lab/${project.slug}/`} className={linkClass}>
                    {labCopy.details}
                    <span className="sr-only"> : {project.title}</span>
                    <ArrowIcon direction="right" className="size-3.5 transition-transform duration-500 group-hover/link:translate-x-0.5" />
                  </Link>
                ) : null}
                {project.href ? (
                  isTodo(project.href) ? (
                    <Fill value={project.href}>{() => null}</Fill>
                  ) : (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {labCopy.source}
                      <span className="sr-only"> : {project.title} (nouvel onglet)</span>
                      <ArrowIcon className="size-3.5" />
                    </a>
                  )
                ) : null}
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {repos.length ? (
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal>
            <h3 className="text-[1.8rem] font-medium tracking-[-0.035em]">{labCopy.reposTitle}</h3>
            <p className="max-w-sm text-[0.9rem] text-muted">{labCopy.reposIntro}</p>
          </div>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {repos.map((repo, i) => (
              <li key={repo.name} data-reveal style={delay((i % 2) * 0.06)}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group card flex h-full items-start gap-4 rounded-2xl p-5 transition-colors hover:border-white/15 hover:bg-white/[0.03]"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-fg/95">{repo.name}</span>
                    {repo.description ? <span className="mt-1 line-clamp-2 block text-[0.85rem] text-muted">{repo.description}</span> : null}
                    <span className="mono mt-3 flex gap-4 text-muted">
                      {repo.language ? <span>{repo.language}</span> : null}
                      <span>{dateFormat.format(new Date(repo.pushedAt))}</span>
                    </span>
                  </span>
                  <ArrowIcon className="mt-1 size-4 shrink-0 text-muted transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  <span className="sr-only">(nouvel onglet)</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`https://github.com/${githubRepos.user}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-[0.9rem] text-muted transition-colors hover:text-fg"
          >
            github.com/{githubRepos.user}
            <ArrowIcon className="size-3.5" />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>
      ) : null}
    </section>
  )
}
