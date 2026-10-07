import Link from 'next/link'
import { SpotlightCard } from '@/components/ui/HoloCard'
import { ArrowIcon, SectionHeader } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { labCopy, projects, statusLabel } from '@/content/lab'
import { isTodo } from '@/content/types'
import type { Repo } from '@/lib/github'
import { LabSequence } from './LabSequence'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Europe/Paris' })

export function Lab({ repos }: { repos: Repo[] }) {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative pt-[16vh]">
      <SectionHeader id="lab-title" index={labCopy.index} title={labCopy.title} intro={labCopy.intro} />
      <LabSequence />

      <div className="container-x mt-[14vh]">
        <h3 className="label mb-6 text-muted">{labCopy.projectsTitle}</h3>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-reveal="stagger">
          {projects.map((project) => (
            <li key={project.slug}>
              <SpotlightCard className="flex h-full flex-col gap-4 rounded-lg border border-line bg-surface/80 p-6 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="label flex items-center gap-2 text-accent">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <Fill value={project.status}>{(status) => statusLabel[status]}</Fill>
                  </span>
                  {project.private ? <span className="label text-muted">· {labCopy.privateLabel}</span> : null}
                </div>
                <h4 className="text-2xl font-semibold tracking-tight">{project.title}</h4>
                <p className="text-pretty text-muted">{project.summary}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Stack">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
                  {project.detail ? (
                    <Link href={`/lab/${project.slug}/`} className="group label inline-flex items-center gap-2 hover:text-accent" data-cursor="view">
                      {labCopy.details}
                      <ArrowIcon direction="right" className="size-3.5" />
                    </Link>
                  ) : null}
                  {project.href ? (
                    isTodo(project.href) ? (
                      <TodoMark hint={project.href.todo} />
                    ) : (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-2 hover:text-accent">
                        {labCopy.source}
                        <ArrowIcon className="size-3.5" />
                      </a>
                    )
                  ) : null}
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>

        <div className="mt-20 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <h3 className="label text-muted">{labCopy.reposTitle}</h3>
          <p className="text-sm text-muted">{labCopy.reposIntro}</p>
        </div>
        <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {repos.map((repo) => (
            <li key={repo.name} className="flex flex-col gap-3 bg-bg p-5">
              <p className="font-mono text-sm text-fg">{repo.name}</p>
              <p className="line-clamp-3 text-sm text-pretty text-muted">{repo.description ?? '—'}</p>
              <p className="label mt-auto text-[0.625rem] text-muted">
                {repo.language ?? 'Code'} · {labCopy.updated} {dateFormat.format(new Date(repo.pushedAt))}
              </p>
              <div className="flex gap-4">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1.5 hover:text-accent">
                  {labCopy.source} <ArrowIcon className="size-3" />
                  <span className="sr-only">de {repo.name}</span>
                </a>
                {repo.demo ? (
                  <a href={repo.demo} target="_blank" rel="noopener noreferrer" className="label inline-flex items-center gap-1.5 text-accent hover:text-fg">
                    {labCopy.demo} <ArrowIcon className="size-3" />
                    <span className="sr-only">de {repo.name}</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
