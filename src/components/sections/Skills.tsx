import { delay, SectionHead } from '@/components/ui/Primitives'
import { interests, pillars, tools } from '@/content/pillars'
import { SkillVisual } from './SkillVisual'

export function Skills() {
  return (
    <section id="interets" aria-labelledby="interets-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="interets-title" index={interests.index} title={interests.title} intro={interests.intro} />

      <ul className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pillars.map((pillar, i) => (
          <li key={pillar.index} className="card flex flex-col p-6" data-reveal style={delay(i * 0.08)}>
            <div className="mono flex items-center justify-between text-muted">
              <span>{pillar.index}</span>
              <span className="flex items-center gap-2 text-fg/70">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                {pillar.status}
              </span>
            </div>
            <SkillVisual kind={pillar.visual} />
            <p className="label text-muted">{pillar.category}</p>
            <h3 className="mt-2 text-[1.6rem] leading-tight font-medium tracking-[-0.035em]">{pillar.title}</h3>
            <p className="mt-3 flex-1 text-[0.9rem] text-pretty text-muted">{pillar.text}</p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={`Outils : ${pillar.title}`}>
              {pillar.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line px-6 py-5 sm:flex-row sm:items-center" data-reveal>
        <p className="label shrink-0 text-muted">{interests.toolsTitle}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-fg/80" aria-label={interests.toolsTitle}>
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
