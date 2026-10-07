import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { timeline, timelineCopy } from '@/content/timeline'

/** Deux étapes reliées par un fil : le bac en cours, puis le BTS visé. */
export function Journey() {
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="parcours-title" index={timelineCopy.index} title={timelineCopy.title} intro={timelineCopy.intro} />

      <ol className="relative mt-16 grid gap-4 md:grid-cols-2">
        {/* Le fil entre les deux cartes. */}
        <span className="absolute top-12 right-[25%] left-[25%] hidden h-px bg-gradient-to-r from-accent/70 via-white/20 to-white/5 md:block" aria-hidden="true" />
        {timeline.map((step, i) => {
          const current = step.state === 'en cours'
          return (
            <li key={step.title} className={`card relative p-7 sm:p-9 ${current ? 'border-accent/25' : ''}`} data-reveal style={delay(i * 0.12)}>
              <div className="flex items-center justify-between gap-4">
                <span className={`grid size-6 place-items-center rounded-full border ${current ? 'border-accent bg-accent/15' : 'border-dashed border-white/25'}`} aria-hidden="true">
                  <span className={`size-2 rounded-full ${current ? 'pulse-dot bg-accent' : 'bg-white/30'}`} />
                </span>
                <span className={`label ${current ? 'text-accent' : 'text-muted'}`}>{timelineCopy.states[step.state]}</span>
              </div>
              <p className="mono mt-8 text-muted">
                {step.when}
                {step.age ? ` · ${step.age}` : ''}
              </p>
              <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05] font-medium tracking-[-0.04em]">{step.title}</h3>
              <p className="mt-3 text-pretty text-muted">{step.detail}</p>
              <ul className="mt-6 space-y-2">
                {step.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-[0.9rem] text-fg/85">
                    <span className={`h-px w-4 ${current ? 'bg-accent' : 'bg-white/30'}`} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              {!current ? (
                <a href="#reseaux" className="group mt-8 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-[0.9rem] text-fg/90 transition-colors hover:border-accent hover:text-accent">
                  {timelineCopy.cta}
                  <ArrowIcon className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
