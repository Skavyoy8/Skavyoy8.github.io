import { delay, SectionHead } from '@/components/ui/Primitives'
import { interests, pillars } from '@/content/pillars'
import { SkillVisual } from './SkillVisual'

export function Skills() {
  return (
    <section id="interets" aria-labelledby="interets-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="interets-title" index={interests.index} command={interests.command} title={interests.title} />

      {/* Quatre cartes en 2 × 2, toutes à l'horizontale : le texte à gauche, l'illustration à droite. */}
      <ul className="mt-16 grid gap-4 lg:grid-cols-2">
        {pillars.map((pillar, i) => (
          <li key={pillar.index} className="card flex flex-col gap-6 p-6 sm:flex-row sm:p-7" data-reveal style={delay((i % 2) * 0.08)}>
            <div className="flex flex-1 flex-col justify-between gap-8">
              <p className="mono flex items-center justify-between gap-3 text-muted">
                <span>
                  {pillar.index} · {pillar.category}
                </span>
                <span className="flex items-center gap-2 text-fg/70">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                  {pillar.status}
                </span>
              </p>
              <div>
                <h3 className="text-[1.6rem] leading-tight font-medium tracking-[-0.035em]">{pillar.title}</h3>
                <p className="mt-2 text-[0.92rem] text-pretty text-muted">{pillar.text}</p>
              </div>
            </div>
            <div className="grid place-items-center overflow-hidden rounded-2xl border border-line bg-black/25 px-3 sm:w-[48%]">
              <SkillVisual kind={pillar.visual} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
