import Link from 'next/link'
import { SpotlightCard } from '@/components/ui/HoloCard'
import { ArrowIcon, CardBar, Chip, SectionHead } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { homelab } from '@/content/homelab'
import { labCopy, projects, statusLabel } from '@/content/lab'
import { isTodo } from '@/content/types'
import type { Repo } from '@/lib/github'
import { NetworkPanel } from './NetworkPanel'
import { RackIso } from './RackIso'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Europe/Paris' })
const go = (n: number) => n.toLocaleString('fr-FR', { maximumFractionDigits: 1 })

function Homelab() {
  const s = homelab.section
  const always = homelab.services.always
  const used = always.reduce((sum, service) => sum + service.ram, 0)
  const maxRam = Math.max(...always.map((service) => service.ram))
  return (
    <div className="container-x mt-16 lg:mt-24" data-rack>
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div
            className="relative flex h-[56svh] items-center justify-center overflow-hidden rounded-[1.25rem] border border-white/[0.08] lg:sticky lg:top-[calc(var(--header-h)+3vh)] lg:h-[80svh]"
            role="img"
            aria-label={s.rackLabel}
            data-rack-stage
          >
            <RackIso decorative className="rack-fallback h-full max-h-[640px] w-auto max-w-full p-6" />
            <span className="pointer-events-none absolute inset-x-6 top-5 flex items-center justify-between gap-4" aria-hidden="true">
              <span className="mono text-muted">{homelab.rack}</span>
              <span className="mono text-accent" data-rack-current>
                {homelab.units[0]?.name}
              </span>
            </span>
            <span className="mono pointer-events-none absolute bottom-5 left-6 flex items-center gap-2 text-accent" aria-hidden="true">
              <span className="pulse-dot size-1.5 rounded-full bg-accent" /> {homelab.status}
            </span>
            <span className="mono pointer-events-none absolute right-6 bottom-5 text-muted" aria-hidden="true">
              {s.scrollHint}
            </span>
          </div>
        </div>
        <ol className="glass glass-blur px-6 sm:px-8 lg:col-span-6">
          {homelab.units.map((unit, i) => (
            <li key={unit.id} className="rack-step flex gap-5 border-b border-white/[0.06] py-8 last:border-b-0 lg:min-h-[34svh] lg:flex-col lg:justify-center lg:py-10" data-rack-step={unit.id}>
              <span className="rack-step-index mono grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 text-muted transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-h3">{unit.name}</h3>
                <p className="mt-2 max-w-md text-pretty text-muted">{unit.detail}</p>
                <p className="mt-4 flex flex-wrap gap-2">
                  <Chip>{unit.heightU === 0 ? homelab.labels.onTop : `${go(unit.heightU)}U`}</Chip>
                  <Chip active={unit.phase === 1}>{unit.phase === 1 ? homelab.labels.phase1 : homelab.labels.phase2}</Chip>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="frost relative mt-20 grid gap-5 lg:grid-cols-12">
        <article className="glass p-6 sm:p-7 lg:col-span-7" data-reveal="fade">
          <CardBar title={s.servicesTitle} meta={homelab.labels.always.toLowerCase()} />
          <ul className="mt-6 divide-y divide-white/[0.06]" data-bars>
            {always.map((service) => (
              <li key={service.name} className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-3.5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_3.5rem]">
                <div className="min-w-0">
                  <p className="truncate text-[15px]">{service.name}</p>
                  <p className="mono truncate text-[11.5px] text-muted">{service.role}</p>
                </div>
                <span className="relative order-last col-span-2 h-1.5 rounded-full bg-white/[0.05] sm:order-none sm:col-span-1">
                  <span className="absolute inset-y-0 left-0 origin-left rounded-full bg-accent/80" style={{ width: `${(service.ram / maxRam) * 100}%` }} data-bar />
                </span>
                <span className="mono text-right text-muted">{go(service.ram)} Go</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="glass flex flex-col p-6 sm:p-7 lg:col-span-5" data-reveal="fade">
          <CardBar title={s.ramTitle} meta="MS-01" />
          <p className="mt-8 text-[clamp(3rem,6vw,4.5rem)] leading-none font-semibold tracking-[-0.05em]">
            {go(used)}
            <span className="ml-2 text-2xl text-muted">Go</span>
          </p>
          <p className="mono mt-3 text-muted">{s.ramOf(go(used), homelab.ram.total)}</p>
          <div className="mt-8 flex h-3 overflow-hidden rounded-full bg-white/[0.05]" aria-hidden="true">
            {always.map((service, i) => (
              <span key={service.name} className="h-full border-r border-[#0c0d0b]" style={{ width: `${(service.ram / homelab.ram.total) * 100}%`, background: `rgb(200 255 46 / ${0.95 - i * 0.09})` }} />
            ))}
          </div>
          <div className="mt-auto pt-8">
            <CardBar title={s.onDemandTitle} meta={homelab.labels.onDemand.toLowerCase()} />
            <ul className="mt-4 space-y-2.5">
              {homelab.services.onDemand.map((lab) => (
                <li key={lab.name} className="flex items-baseline justify-between gap-4">
                  <span className="text-[15px]">
                    {lab.name} <span className="mono text-[11.5px] text-muted">· {lab.type}</span>
                  </span>
                  <span className="mono text-muted">{go(lab.ram)} Go</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="lg:col-span-12" data-reveal="fade">
          <CardBar title={s.linksTitle} meta={s.lanNote} className="mb-4 px-1" />
          <NetworkPanel />
        </div>
      </div>
    </div>
  )
}

export function Lab({ repos }: { repos: Repo[] }) {
  return (
    <section id="lab" aria-labelledby="lab-title" className="relative py-[16vh]">
      <SectionHead id="lab-title" pill={labCopy.pill} title={labCopy.title} intro={labCopy.intro} />
      <Homelab />

      <div className="frost container-x relative mt-28 py-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-h3">{labCopy.projectsTitle}</h3>
          <p className="mono text-muted">{labCopy.projectsCount(projects.length)}</p>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-reveal="stagger">
          {projects.map((project) => (
            <li key={project.slug}>
              <SpotlightCard className="glass flex h-full flex-col gap-4 p-6 sm:p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mono flex items-center gap-2 text-accent">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <Fill value={project.status}>{(status) => statusLabel[status].toLowerCase()}</Fill>
                  </span>
                  {project.private ? <span className="mono text-muted">· {labCopy.privateLabel.toLowerCase()}</span> : null}
                </div>
                <h4 className="text-[1.35rem] font-medium tracking-tight">{project.title}</h4>
                <p className="text-pretty text-muted">{project.summary}</p>
                <ul className="flex flex-wrap gap-2" aria-label="Stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>
                      <Chip>{tech}</Chip>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.06] pt-4">
                  {project.detail ? (
                    <Link href={`/lab/${project.slug}/`} className="group mono inline-flex items-center gap-2 text-fg/85 hover:text-accent">
                      {labCopy.details}
                      <ArrowIcon direction="right" className="size-3.5" />
                    </Link>
                  ) : null}
                  {project.href ? (
                    isTodo(project.href) ? (
                      <TodoMark hint={project.href.todo} />
                    ) : (
                      <a href={project.href} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center gap-2 text-fg/85 hover:text-accent">
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
          <h3 className="text-h3">{labCopy.reposTitle}</h3>
          <p className="mono text-muted">{labCopy.reposIntro}</p>
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal="stagger">
          {repos.map((repo) => (
            <li key={repo.name} className="glass flex flex-col gap-3 p-5">
              <p className="font-mono text-sm text-fg">{repo.name}</p>
              <p className="line-clamp-3 text-sm text-pretty text-muted">{repo.description ?? '—'}</p>
              <p className="mono mt-auto text-[11px] text-muted">
                {repo.language ?? 'Code'} · {labCopy.updated.toLowerCase()} {dateFormat.format(new Date(repo.pushedAt))}
              </p>
              <div className="flex gap-4">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center gap-1.5 text-fg/85 hover:text-accent">
                  {labCopy.source} <ArrowIcon className="size-3" />
                  <span className="sr-only">de {repo.name}</span>
                </a>
                {repo.demo ? (
                  <a href={repo.demo} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center gap-1.5 text-accent hover:text-fg">
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
