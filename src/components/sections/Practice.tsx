import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { difficulties, practiceCopy, roomCategories, tryhackme } from '@/content/tryhackme'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' })
const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00Z`))

function Flask({ className = 'size-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 2.5h4M8.5 2.5v5L4 15.5a1.4 1.4 0 0 0 1.2 2h9.6a1.4 1.4 0 0 0 1.2-2L11.5 7.5v-5M6 12.5h8" />
    </svg>
  )
}

/** TryHackMe : le profil, les rooms terminées et les badges. Les chiffres restent à remplir par Luke. */
export function Practice() {
  const { stats } = tryhackme
  const statItems = [
    { label: practiceCopy.labels.rooms, value: <Fill value={stats.rooms}>{(n) => n}</Fill> },
    { label: practiceCopy.labels.badges, value: <Fill value={stats.badges}>{(n) => n}</Fill> },
    { label: practiceCopy.labels.top, value: <Fill value={stats.topPercent}>{(n) => `Top ${n} %`}</Fill> },
  ]
  return (
    <section id="pratique" aria-labelledby="pratique-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="pratique-title" index={practiceCopy.index} command={practiceCopy.command} title={practiceCopy.title} intro={practiceCopy.intro} />

      <div className="card mt-16 overflow-hidden" data-reveal>
        <div className="grid items-center gap-10 p-7 sm:p-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="label flex items-center gap-2.5 text-muted">
              <Flask />
              {practiceCopy.profile}
            </p>
            <p className="mt-5 text-[clamp(2rem,4vw,3.2rem)] leading-none font-medium tracking-[-0.045em]">
              <Fill value={tryhackme.username}>{(name) => name}</Fill>
            </p>
            <p className="mt-4">
              <Fill value={stats.rank}>{(rank) => <span className="tag border-accent/30 text-accent">{rank}</span>}</Fill>
            </p>
            <p className="mt-5 max-w-sm text-pretty text-muted">{practiceCopy.intro}</p>
            <p className="mt-6">
              <Fill value={tryhackme.profileUrl}>
                {(url) => (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-fg/90 transition-colors hover:text-accent">
                    {practiceCopy.profileLink}
                    <ArrowIcon className="size-3.5" />
                    <span className="sr-only">(nouvel onglet)</span>
                  </a>
                )}
              </Fill>
            </p>
          </div>
          {/* Le drapeau qu'on récupère à la fin d'un challenge CTF. */}
          <div className="relative hidden w-72 md:block" aria-hidden="true">
            <svg viewBox="0 0 120 120" className="mx-auto h-36 w-auto">
              <path d="M30 108V14" stroke="rgb(255 255 255 / .35)" strokeWidth="2.4" strokeLinecap="round" />
              <path className="flag-wave" d="M32 16c18-8 30 8 48 0s22-4 30 0v40c-8-4-12-8-30 0s-30-8-48 0Z" fill="rgb(200 255 46 / .12)" stroke="#c8ff2e" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <p className="mt-4 rounded-lg border border-accent/25 bg-accent/[0.06] px-3 py-2 text-center font-mono text-[0.72rem] text-accent">{practiceCopy.flag}</p>
          </div>
        </div>
        <dl className="grid border-t border-line sm:grid-cols-3">
          {statItems.map((item, i) => (
            <div key={item.label} className={`px-7 py-6 sm:px-10 ${i ? 'border-t border-line sm:border-t-0 sm:border-l' : ''}`}>
              <dt className="label text-muted">{item.label}</dt>
              <dd className="mt-3 text-[1.9rem] leading-none font-medium tracking-tight">{item.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mono border-t border-line px-7 py-4 text-muted sm:px-10">
          {practiceCopy.labels.snapshot} <Fill value={stats.snapshotDate}>{formatDate}</Fill>
        </p>
      </div>

      <div id="rooms" className="mt-20 scroll-mt-28">
        <h3 className="text-[1.8rem] font-medium tracking-[-0.035em]" data-reveal>
          {practiceCopy.roomsTitle}
        </h3>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {tryhackme.rooms.map((room) => (
            <li key={room.slug} className="card flex flex-col p-7" data-reveal>
              <div className="label flex items-center justify-between gap-4 text-muted">
                <span>{roomCategories.find((c) => c.id === room.category)?.label}</span>
                <span className="flex items-center gap-1.5 normal-case tracking-normal text-accent">✓ {practiceCopy.done}</span>
              </div>
              <h4 className="mt-6 flex items-center gap-3 text-[1.6rem] font-medium tracking-[-0.03em]">
                <span className="grid size-10 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent">
                  <Flask />
                </span>
                {room.name}
              </h4>
              <p className="label mt-6 text-muted">{practiceCopy.learnedLabel}</p>
              <p className="mt-2 flex-1 text-pretty text-fg/80">{room.learned}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
                <Fill value={room.difficulty}>{(d) => <span className="tag">{difficulties.find((x) => x.id === d)?.label}</span>}</Fill>
                <Fill value={room.date}>{(date) => <span className="mono text-muted">{formatDate(date)}</span>}</Fill>
                <a href={room.url} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-2 text-[0.9rem] text-fg/85 transition-colors hover:text-accent">
                  {practiceCopy.open}
                  <span className="sr-only"> : {room.name} (nouvel onglet)</span>
                  <ArrowIcon className="size-3.5" />
                </a>
              </div>
            </li>
          ))}
          <li className="grid place-items-center rounded-[1.375rem] border border-dashed border-white/12 p-7 text-center" data-reveal style={delay(0.08)}>
            <div>
              <p className="text-[1.15rem] text-fg/80">{practiceCopy.todoRooms}</p>
              <p className="mt-3">
                <TodoMark hint={tryhackme.roomsTodo.todo} />
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div id="badges" className="mt-20 scroll-mt-28">
        <h3 className="text-[1.8rem] font-medium tracking-[-0.035em]" data-reveal>
          {practiceCopy.badgesTitle}
        </h3>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {(tryhackme.badges.length ? tryhackme.badges : Array.from({ length: 4 }, () => null)).map((badge, i) => (
            <li key={badge?.name ?? i} className="card flex flex-col items-center p-6 text-center" data-reveal style={delay(i * 0.06)}>
              <svg viewBox="0 0 72 72" className="h-20 w-auto" aria-hidden="true">
                <rect
                  x="14"
                  y="14"
                  width="44"
                  height="44"
                  rx="10"
                  transform="rotate(45 36 36)"
                  fill={badge ? 'rgb(200 255 46 / .08)' : 'none'}
                  stroke={badge ? '#c8ff2e' : 'rgb(255 255 255 / .22)'}
                  strokeDasharray={badge ? undefined : '4 5'}
                  strokeWidth="1.3"
                />
                <path d="M36 27v18M27 36h18" stroke="rgb(255 255 255 / .25)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <p className="mt-4 font-medium text-fg/90">{badge ? badge.name : practiceCopy.badgeSlot}</p>
              {badge ? <p className="mt-1 text-[0.85rem] text-muted">{badge.description}</p> : null}
            </li>
          ))}
        </ul>
        {tryhackme.badges.length ? null : (
          <p className="mt-5" data-reveal>
            <TodoMark hint={tryhackme.badgesTodo.todo} />
          </p>
        )}
      </div>
    </section>
  )
}
