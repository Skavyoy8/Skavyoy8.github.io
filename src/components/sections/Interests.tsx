import { Motif } from '@/components/ui/Motif'
import { SectionHeader, Viewfinder } from '@/components/ui/Primitives'
import { interests, pillars, tools } from '@/content/pillars'
import { PillarLink } from './PillarLink'

export function Interests() {
  return (
    <section id="interets" aria-labelledby="interests-title" className="relative">
      <div className="hscroll-frame py-[14vh] lg:flex lg:h-svh lg:flex-col lg:justify-center lg:py-0" data-hscroll>
        <SectionHeader id="interests-title" index={interests.index} title={interests.title} intro={interests.intro} className="pb-10 lg:pb-12" />
        <div className="container-x" data-hscroll-viewport>
          <ol className="flex flex-col gap-4 lg:w-max lg:flex-row lg:gap-(--gutter)" data-hscroll-track>
            {pillars.map((pillar) => (
              <li key={pillar.index} className="lg:w-[min(34vw,540px)] lg:shrink-0">
                <article className="relative flex h-full flex-col gap-5 border border-line bg-surface/70 p-6 backdrop-blur-sm lg:p-7">
                  <Viewfinder />
                  <div className="label flex items-center justify-between text-muted">
                    <span className="text-accent">{pillar.index}</span>
                    <span>{pillar.category}</span>
                  </div>
                  <Motif motif={pillar.motif} />
                  <h3 className="text-title text-balance">{pillar.title}</h3>
                  <p className="text-pretty text-muted">{pillar.text}</p>
                  <ul className="flex flex-wrap gap-2" aria-label="Notions">
                    {pillar.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-line pt-4">
                    <PillarLink link={pillar.link} />
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <div className="marquee overflow-hidden border-y border-line py-5" aria-label="Outils que j’utilise">
        <ul className="marquee-track flex w-max gap-12 pr-12 text-[clamp(1.5rem,3vw,2.6rem)] font-medium tracking-tight text-fg/80">
          {tools.map((tool) => (
            <li key={tool} className="flex items-center gap-12 whitespace-nowrap">
              {tool}
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            </li>
          ))}
          {tools.map((tool) => (
            <li key={`dup-${tool}`} className="marquee-dup flex items-center gap-12 whitespace-nowrap" aria-hidden="true">
              {tool}
              <span className="size-2 rounded-full bg-accent" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
