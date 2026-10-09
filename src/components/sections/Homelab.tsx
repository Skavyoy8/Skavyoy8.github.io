import Link from 'next/link'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { Rack } from '@/components/ui/Rack'
import { homelab } from '@/content/homelab'

const format = (n: number) => String(n).replace('.', ',')

/** Le rack en vue de face et la liste de ses unités ; le détail (services, câblage) est sur la page du projet. */
export function Homelab() {
  const s = homelab.section
  return (
    <section id="homelab" aria-labelledby="homelab-title" className="homelab container-x relative py-28 sm:py-36">
      <SectionHead id="homelab-title" index={s.index} command={s.command} title={s.title} intro={s.intro}>
        <p className="mono mt-5 flex items-center gap-2 text-fg/80">
          <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {homelab.status}
        </p>
      </SectionHead>

      <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5" data-reveal>
          <Rack />
          <p className="mono mt-6 text-center text-muted">{homelab.rack}</p>
        </div>

        <div className="self-center lg:col-span-7" data-reveal style={delay(0.1)}>
          <ol className="divide-y divide-line border-y border-line" aria-label={s.rackLabel}>
            {homelab.units.map((unit) => (
              <li key={unit.id} data-unit-row={unit.id} className="group grid grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-4 py-4 transition-colors hover:bg-white/[0.02]">
                <span className="mono text-muted transition-colors group-hover:text-accent">{unit.heightU ? `${format(unit.heightU)}U` : homelab.labels.onTop}</span>
                <span>
                  <span className="text-fg/95">{unit.name}</span>
                  <span className="mt-0.5 block text-[0.88rem] text-muted">{unit.detail}</span>
                </span>
                <span className={`mono text-[0.7rem] ${unit.phase === 1 ? 'text-accent' : 'text-muted'}`}>
                  {unit.phase === 1 ? homelab.labels.phase1 : homelab.labels.phase2}
                </span>
              </li>
            ))}
          </ol>
          <Link href="/lab/homelab/" className="group mt-8 inline-flex items-center gap-2 text-fg/90 transition-colors hover:text-accent">
            {s.details}
            <ArrowIcon direction="right" className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
