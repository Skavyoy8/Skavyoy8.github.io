import Image from 'next/image'
import { ArrowIcon, Chip } from '@/components/ui/Primitives'
import { profileCard, site } from '@/content/site'
import { asset } from '@/lib/asset'

/**
 * Carte de présentation du héros, en verre : photo, nom, domaines,
 * puis une courte session de terminal qui répond aux questions d'un recruteur.
 * Les lignes apparaissent une à une (data-term-line, chorégraphie dans Reveals).
 */
export function ProfileCard() {
  const c = profileCard
  return (
    <div className="glass glass-blur overflow-hidden rounded-[22px]">
      <div className="flex items-center gap-4 border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-accent/80" />
        </span>
        <span className="mono text-muted">{c.prompt}</span>
        <span className="mono ml-auto flex items-center gap-2 text-accent">
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {c.status}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-5 px-5 pt-6 sm:px-6">
        <Image src={asset(site.avatar)} alt={`Photo de profil de ${site.name}`} width={72} height={72} className="size-[72px] rounded-2xl border border-white/10 object-cover" priority />
        <div className="min-w-0">
          <p className="text-[1.35rem] font-medium tracking-tight">{c.name}</p>
          <p className="mono text-muted">{c.role}</p>
        </div>
        <ul className="flex w-full flex-wrap gap-2" aria-label="Domaines">
          {c.focus.map((item, i) => (
            <li key={item}>
              <Chip active={i === 0}>{item}</Chip>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-5 mt-6 rounded-xl border border-white/[0.06] bg-black/40 p-4 font-mono text-[12.5px] leading-relaxed sm:mx-6">
        {c.session.map((line) => (
          <div key={line.cmd} className="mb-2.5" data-term-line>
            <p>
              <span className="text-accent">{c.prompt}</span> <span className="text-fg">{line.cmd}</span>
            </p>
            <p className="text-muted">{line.out}</p>
          </div>
        ))}
        <p data-term-line>
          <span className="text-accent">{c.prompt}</span> <span className="blink inline-block h-3.5 w-2 translate-y-0.5 bg-fg/80" aria-hidden="true" />
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-5 py-5 sm:px-6">
        <a href={site.github.url} target="_blank" rel="noopener noreferrer" className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-fg/85 transition-colors hover:border-accent/50 hover:text-accent">
          {c.links.github} <ArrowIcon className="size-3" />
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        <a href="#lab" className="mono inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-fg/85 transition-colors hover:border-accent/50 hover:text-accent">
          {c.links.projects} <ArrowIcon direction="down" className="size-3" />
        </a>
        <a href="#reseaux" className="mono ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-ink transition-colors hover:bg-[#d8ff6a]">
          {c.links.contact} <ArrowIcon className="size-3" />
        </a>
      </div>
    </div>
  )
}
