import type { ReactNode } from 'react'
import { Chip, SectionHead } from '@/components/ui/Primitives'
import { interests, type PillarDemo, pillars } from '@/content/pillars'
import { EnumDemo, OsiDemo } from './demos/StaticDemos'
import { SignalDemo } from './demos/SignalDemo'
import { VirtDemo } from './demos/VirtDemo'
import { PillarLink } from './PillarLink'

const demo: Record<PillarDemo, ReactNode> = {
  enum: <EnumDemo />,
  osi: <OsiDemo />,
  virt: <VirtDemo />,
  signal: <SignalDemo />,
}

export function Interests() {
  return (
    <section id="interets" aria-labelledby="interests-title" className="frost relative py-[16vh]">
      <SectionHead id="interests-title" pill={interests.pill} title={interests.title} intro={interests.intro} />

      <ol className="container-x mt-16 space-y-24 lg:mt-24 lg:space-y-36">
        {pillars.map((pillar, i) => (
          <li key={pillar.index} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`} data-reveal="fade">
              <p className="mono text-muted">
                {pillar.index} · {pillar.category.toLowerCase()}
              </p>
              <h3 className="text-h3 mt-4 text-balance">{pillar.title}</h3>
              <p className="mt-4 max-w-md text-pretty text-muted">{pillar.text}</p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Notions">
                {pillar.tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <PillarLink link={pillar.link} />
              </div>
            </div>
            <div className={`lg:col-span-7 ${i % 2 ? 'lg:order-1 lg:col-start-1' : ''}`} data-reveal="fade">
              {demo[pillar.demo]}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
