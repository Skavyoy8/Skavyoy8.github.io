import { delay, SectionHead } from '@/components/ui/Primitives'
import { interests, pillars } from '@/content/pillars'
import { SkillVisual } from './SkillVisual'

// Grille « bento » : la 1re et la 4e carte prennent deux colonnes, texte à gauche et illustration à droite.
const WIDE = [0, 3]

export function Skills() {
  return (
    <section id="interets" aria-labelledby="interets-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="interets-title" index={interests.index} command={interests.command} title={interests.title} intro={interests.intro} />

      <ul className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pillars.map((pillar, i) => {
          const wide = WIDE.includes(i)
          return (
            <li
              key={pillar.index}
              className={`card flex flex-col gap-6 p-7 ${wide ? 'xl:col-span-2 xl:flex-row xl:items-stretch' : ''}`}
              data-reveal
              style={delay((i % 2) * 0.08)}
            >
              <div className={`flex flex-1 flex-col ${wide ? 'xl:order-1 xl:justify-between xl:py-1' : 'order-2'}`}>
                <div className="mono flex items-center justify-between text-muted">
                  <span>
                    {pillar.index} · {pillar.category}
                  </span>
                  <span className="flex items-center gap-2 text-fg/70">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {pillar.status}
                  </span>
                </div>
                <div>
                  <h3 className="mt-6 text-[1.75rem] leading-tight font-medium tracking-[-0.035em]">{pillar.title}</h3>
                  <p className="mt-3 text-[0.92rem] text-pretty text-muted">{pillar.text}</p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`Outils : ${pillar.title}`}>
                  {pillar.tags.map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`grid place-items-center rounded-2xl border border-line bg-black/25 ${wide ? 'xl:order-2 xl:w-[46%]' : 'order-1'}`}>
                <SkillVisual kind={pillar.visual} />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
