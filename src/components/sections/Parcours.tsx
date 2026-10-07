import { ArrowIcon, buttonPrimary, CardBar, Chip, SectionHead } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { timeline, timelineSlider } from '@/content/timeline'
import { parcoursCopy, tryhackme } from '@/content/tryhackme'
import { isTodo } from '@/content/types'
import { SchoolYear } from './SchoolYear'
import { TimelineSlider } from './TimelineSlider'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' })

function Profile() {
  const { stats } = tryhackme
  const l = parcoursCopy.labels
  return (
    <article className="glass flex flex-col p-6 sm:p-7 lg:col-span-5" data-reveal="fade">
      <CardBar title={parcoursCopy.dashboard.profile} meta={<Fill value={tryhackme.username}>{(v) => `@${v}`}</Fill>} />
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <dt className="mono text-muted">{l.rooms.toLowerCase()}</dt>
          <dd className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
            <Fill value={stats.rooms}>{(v) => <span data-count={v}>{v}</span>}</Fill>
          </dd>
        </div>
        <div>
          <dt className="mono text-muted">{l.badges.toLowerCase()}</dt>
          <dd className="mt-1 text-4xl font-semibold tracking-tight tabular-nums">
            <Fill value={stats.badges}>{(v) => <span data-count={v}>{v}</span>}</Fill>
          </dd>
        </div>
        <div>
          <dt className="mono text-muted">{l.rank.toLowerCase()}</dt>
          <dd className="mt-1 font-mono">
            <Fill value={stats.rank}>{(v) => v}</Fill>
          </dd>
        </div>
        <div>
          <dt className="mono text-muted">{l.top.toLowerCase()}</dt>
          <dd className="mt-1 font-mono text-accent">
            <Fill value={stats.topPercent}>{(v) => `top ${v} %`}</Fill>
          </dd>
        </div>
      </dl>
      <div className="relative mt-6 h-1.5 overflow-hidden rounded-full bg-white/[0.06]" role="presentation">
        {isTodo(stats.topPercent) ? null : <span className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${100 - stats.topPercent}%` }} />}
      </div>
      <div className="mono mt-auto flex flex-wrap items-center justify-between gap-3 pt-6 text-muted">
        <span>
          {l.snapshot.toLowerCase()} <Fill value={stats.snapshotDate}>{(v) => dateFormat.format(new Date(v))}</Fill>
        </span>
        {isTodo(tryhackme.profileUrl) ? (
          <TodoMark hint={tryhackme.profileUrl.todo} />
        ) : (
          <a href={tryhackme.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg hover:text-accent">
            {l.profile} <ArrowIcon className="size-3.5" />
          </a>
        )}
      </div>
    </article>
  )
}

function LastRoom() {
  const room = tryhackme.rooms[0]
  const d = parcoursCopy.dashboard
  return (
    <article className="glass flex flex-col p-6 sm:p-7 lg:col-span-4" data-reveal="fade">
      <CardBar title={d.lastRoom} meta={room ? <Fill value={room.date}>{(v) => dateFormat.format(new Date(v))}</Fill> : null} />
      {room ? (
        <>
          <p className="mt-6 text-2xl font-semibold tracking-tight">{room.name}</p>
          <p className="mt-3 text-pretty text-muted">{room.learned}</p>
        </>
      ) : null}
      <a href="#rooms" className="mono mt-auto inline-flex items-center gap-2 pt-6 text-fg/85 hover:text-accent">
        {d.roomsLink} <ArrowIcon direction="down" className="size-3.5" />
      </a>
    </article>
  )
}

function Status() {
  const d = parcoursCopy.dashboard
  return (
    <article className="glass flex flex-col p-6 sm:p-7 lg:col-span-3" data-reveal="fade">
      <CardBar title={d.status} />
      <p className="mt-6 flex items-center gap-2.5 text-[1.15rem] font-medium">
        <span className="pulse-dot size-2 rounded-full bg-accent shadow-[0_0_10px_#c8ff2e]" aria-hidden="true" />
        {d.statusValue}
      </p>
      <p className="mono mt-2 text-muted">{d.statusDetail}</p>
      <a href="#reseaux" className="mono mt-auto inline-flex items-center gap-2 pt-6 text-fg/85 hover:text-accent">
        {d.statusCta} <ArrowIcon className="size-3.5" />
      </a>
    </article>
  )
}

export function Parcours() {
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="frost relative py-[16vh]">
      <SectionHead id="parcours-title" pill={parcoursCopy.pill} title={parcoursCopy.title} intro={parcoursCopy.intro} />

      <div className="container-x mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
        <SchoolYear />
        <Profile />
        <LastRoom />
        <Status />
      </div>

      <div className="container-x mt-20">
        <h3 className="text-h3">{parcoursCopy.timelineTitle}</h3>
        <div className="mt-8">
          <TimelineSlider />
        </div>
        <ul className="mt-5 grid gap-5 md:grid-cols-2" data-reveal="stagger">
          {timeline.map((step) => {
            const current = step.state === 'en cours'
            return (
              <li key={step.title} className={`glass flex flex-col p-6 sm:p-7 ${current ? 'border-accent/30' : ''}`}>
                <div className="flex items-start justify-between gap-4">
                  <p className="mono text-muted">
                    {step.when}
                    {step.age ? ` · ${step.age}` : ''}
                  </p>
                  <Chip active={current}>{timelineSlider.badges[step.state]}</Chip>
                </div>
                <p className="mt-5 text-3xl font-semibold tracking-tight">{step.title}</p>
                <p className="mt-2 text-pretty text-muted">{step.detail}</p>
                <ul className="mt-6 space-y-2.5">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-[15px] text-fg/85">
                      <svg viewBox="0 0 12 12" className="size-3 text-accent" aria-hidden="true">
                        <path d="M2 6.4 4.7 9 10 3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
                {current ? null : (
                  <a href="#reseaux" className={`${buttonPrimary} mt-8 justify-center`}>
                    {timelineSlider.cta}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
