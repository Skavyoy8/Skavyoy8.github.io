import { ArrowIcon, SectionHeader, Viewfinder } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { timeline } from '@/content/timeline'
import { parcoursCopy, tryhackme } from '@/content/tryhackme'
import { isTodo } from '@/content/types'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' })

export function Parcours() {
  const { stats } = tryhackme
  const l = parcoursCopy.labels
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="relative py-[16vh]">
      <SectionHeader id="parcours-title" index={parcoursCopy.index} title={parcoursCopy.title} intro={parcoursCopy.intro} />
      <div className="container-x grid grid-cols-4 gap-x-(--gutter) gap-y-16 lg:grid-cols-12">
        <div className="relative col-span-4 rounded-lg border border-line bg-surface/90 backdrop-blur-md lg:col-span-7" data-reveal="fade">
          <Viewfinder />
          <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-xs">
            <span className="flex items-center gap-2" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-accent" />
            </span>
            <span className="text-muted">{parcoursCopy.consoleTitle}</span>
          </div>
          <div className="grid gap-px bg-line sm:grid-cols-2">
            <div className="bg-surface p-5">
              <p className="label text-muted">{l.username}</p>
              <p className="mt-3 font-mono text-lg">
                <Fill value={tryhackme.username}>{(v) => v}</Fill>
              </p>
            </div>
            <div className="bg-surface p-5">
              <p className="label text-muted">{l.rank}</p>
              <p className="mt-3 font-mono text-lg">
                <Fill value={stats.rank}>{(v) => v}</Fill>
              </p>
            </div>
            <div className="bg-surface p-5">
              <p className="label text-muted">{l.rooms}</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight tabular-nums">
                <Fill value={stats.rooms}>{(v) => <span data-count={v}>{v}</span>}</Fill>
              </p>
            </div>
            <div className="bg-surface p-5">
              <p className="label text-muted">{l.badges}</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight tabular-nums">
                <Fill value={stats.badges}>{(v) => <span data-count={v}>{v}</span>}</Fill>
              </p>
            </div>
          </div>
          <div className="border-t border-line p-5">
            <p className="label flex justify-between text-muted">
              <span>{l.top}</span>
              <Fill value={stats.topPercent}>{(v) => <span className="text-accent">Top {v} %</span>}</Fill>
            </p>
            <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-line" role="presentation">
              {isTodo(stats.topPercent) ? null : (
                <span className="absolute inset-y-0 left-0 rounded-full bg-accent" style={{ width: `${100 - stats.topPercent}%` }} />
              )}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-4 font-mono text-xs text-muted">
            <span>
              {l.snapshot} <Fill value={stats.snapshotDate}>{(v) => dateFormat.format(new Date(v))}</Fill>
            </span>
            {isTodo(tryhackme.profileUrl) ? (
              <TodoMark hint={tryhackme.profileUrl.todo} />
            ) : (
              <a href={tryhackme.profileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-fg hover:text-accent">
                {l.profile} <ArrowIcon className="size-3.5" />
              </a>
            )}
          </div>
        </div>

        <div className="col-span-4 lg:col-span-4 lg:col-start-9" data-draw-scope>
          <h3 className="label text-muted">{parcoursCopy.timelineTitle}</h3>
          <div className="relative mt-8 pl-10">
            <svg className="absolute top-0 left-[7px] h-full w-2 overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100" aria-hidden="true">
              <path d="M1 0 V100" stroke="rgb(255 255 255 / .1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <path d="M1 0 V100" stroke="#c8ff2e" strokeWidth="2" vectorEffect="non-scaling-stroke" data-draw />
            </svg>
            <ol className="space-y-14">
              {timeline.map((step) => (
                <li key={step.title} className="relative">
                  <span
                    className={`absolute top-1 -left-10 size-4 rounded-full border-2 ${step.state === 'en cours' ? 'border-accent bg-accent/30' : 'border-line-strong bg-bg'}`}
                    aria-hidden="true"
                  />
                  <p className="label text-muted">
                    {step.when}
                    {step.age ? ` · ${step.age}` : ''}
                  </p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</p>
                  <p className="mt-2 text-pretty text-muted">{step.detail}</p>
                  <p className={`label mt-3 ${step.state === 'en cours' ? 'text-accent' : 'text-cold'}`}>{step.state}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
