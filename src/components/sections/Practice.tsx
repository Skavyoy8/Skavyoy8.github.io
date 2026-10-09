import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { practiceCopy, roomCategories, tryhackme } from '@/content/tryhackme'

const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'Europe/Paris' })

/** TryHackMe : les chiffres du profil, les dernières rooms et le drapeau du CTF. */
export function Practice() {
  const { stats } = tryhackme
  const statItems = [
    { label: practiceCopy.labels.rooms, value: String(stats.rooms) },
    { label: practiceCopy.labels.badges, value: String(stats.badges) },
    { label: practiceCopy.labels.top, value: `Top ${stats.topPercent} %` },
    { label: practiceCopy.labels.rank, value: stats.rank },
  ]
  return (
    <section id="pratique" aria-labelledby="pratique-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="pratique-title" index={practiceCopy.index} command={practiceCopy.command} title={practiceCopy.title} />

      <dl className="mt-16 grid grid-cols-2 border-y border-line lg:grid-cols-4" data-reveal>
        {statItems.map((item, i) => (
          <div key={item.label} className={`py-7 pr-6 ${i % 2 ? 'border-l border-line pl-6' : ''} ${i === 2 ? 'border-t border-line lg:border-t-0 lg:border-l lg:pl-6' : ''} ${i === 3 ? 'border-t border-line lg:border-t-0' : ''}`}>
            <dt className="label text-muted">{item.label}</dt>
            <dd className="mt-3 text-[clamp(1.4rem,2.4vw,2.1rem)] leading-none font-medium tracking-[-0.04em] whitespace-nowrap">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div id="rooms" className="scroll-mt-28 lg:col-span-8">
          <h3 className="label text-muted" data-reveal>
            {practiceCopy.roomsTitle}
          </h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {tryhackme.rooms.map((room, i) => (
              <li key={room.slug} data-reveal style={delay(i * 0.05)}>
                <a href={room.url} target="_blank" rel="noopener noreferrer" className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-5 transition-colors hover:bg-white/[0.02]">
                  <span>
                    <span className="flex flex-wrap items-baseline gap-x-3">
                      <span className="text-[1.15rem] font-medium tracking-tight text-fg/95">{room.name}</span>
                      <span className="mono text-muted">{roomCategories.find((c) => c.id === room.category)?.label}</span>
                    </span>
                    <span className="mt-1 block text-[0.9rem] text-pretty text-muted">{room.learned}</span>
                  </span>
                  <ArrowIcon className="size-4 text-muted transition-[transform,color] duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  <span className="sr-only">
                    {practiceCopy.open} : {room.name} (nouvel onglet)
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Le drapeau qu'on récupère à la fin d'un challenge CTF, et le lien vers le profil. */}
        <aside className="card self-start p-7 lg:col-span-4" data-reveal style={delay(0.1)} aria-label="Profil TryHackMe">
          <svg viewBox="0 0 120 120" className="h-24 w-auto" aria-hidden="true">
            <path d="M30 108V14" stroke="rgb(255 255 255 / .35)" strokeWidth="2.4" strokeLinecap="round" />
            <path className="flag-wave" d="M32 16c18-8 30 8 48 0s22-4 30 0v40c-8-4-12-8-30 0s-30-8-48 0Z" fill="rgb(200 255 46 / .12)" stroke="#c8ff2e" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
          <p className="mt-5 font-mono text-[0.78rem] break-all text-accent">{practiceCopy.flag}</p>
          <p className="mono mt-6 text-muted">
            {tryhackme.username} · {practiceCopy.labels.snapshot.toLowerCase()} {dateFormat.format(new Date(`${stats.snapshotDate}T12:00:00Z`))}
          </p>
          <a href={tryhackme.profileUrl} target="_blank" rel="noopener noreferrer" className="group mt-6 inline-flex items-center gap-2 text-fg/90 transition-colors hover:text-accent">
            {practiceCopy.profileLink}
            <ArrowIcon className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </aside>
      </div>
    </section>
  )
}
