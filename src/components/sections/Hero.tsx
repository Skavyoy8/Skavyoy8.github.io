import type { CSSProperties } from 'react'
import { ArrowIcon, buttonGhost, buttonPrimary, Pill } from '@/components/ui/Primitives'
import { tools } from '@/content/pillars'
import { hero, toolsStrip } from '@/content/site'
import { ProfileCard } from './ProfileCard'

export function Hero() {
  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative overflow-x-clip pt-[calc(var(--header-h)+9vh)] pb-24 lg:min-h-svh lg:pt-[calc(var(--header-h)+15vh)]">
      <div className="dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_25%_35%,#000,transparent)]" aria-hidden="true" />

      <div className="container-x relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p data-hero-fade>
            <Pill className="rounded-md">{hero.pill}</Pill>
          </p>
          <h1 id="hero-title" className="mt-7 text-[clamp(2.6rem,4.7vw,4.4rem)] leading-[1.02] font-semibold tracking-[-0.045em]" data-reveal="hero">
            <span className="block">{hero.title.line}</span>
            <span className="accent-serif block text-fg/90">{hero.title.accent}</span>
          </h1>
          <p className="mt-7 max-w-lg text-[1.05rem] leading-relaxed text-pretty text-muted" data-hero-fade>
            {hero.intro}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3" data-hero-fade>
            <a href={hero.ctaPrimary.href} className={buttonPrimary}>
              {hero.ctaPrimary.label}
              <ArrowIcon direction="down" className="size-3.5" />
            </a>
            <a href={hero.ctaSecondary.href} className={buttonGhost}>
              {hero.ctaSecondary.label}
              <ArrowIcon className="size-3.5" />
            </a>
          </div>
          <p className="mono mt-6 text-muted/80" data-hero-fade>
            {hero.meta}
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8 lg:-mt-6" data-hero-panel>
          <div className="hero-panel">
            <ProfileCard />
          </div>
        </div>
      </div>

      <div className="container-x relative mt-24 lg:mt-[22vh]">
        <p className="mono text-muted" data-scramble>
          {toolsStrip.intro}
        </p>
        <ul className="mt-7 grid grid-cols-4 gap-x-4 gap-y-7 sm:grid-cols-8" aria-label="Outils">
          {tools.map((tool, i) => (
            <li key={tool} className="relative flex flex-col items-start gap-3" style={{ '--i': i } as CSSProperties}>
              <span className="tool-tile tile size-14 rounded-2xl text-[13px]" aria-hidden="true">
                {toolsStrip.abbr[i]}
              </span>
              <span className="mono text-[11.5px] text-muted">{tool}</span>
              {i < tools.length - 1 ? <span className="tool-link absolute top-[26px] left-[68px] hidden h-[3px] w-[calc(100%-60px)] sm:block" aria-hidden="true" /> : null}
            </li>
          ))}
        </ul>
        <a href="#a-propos" className="mono mt-16 inline-flex items-center gap-2 text-muted transition-colors hover:text-fg" aria-label={hero.scrollLabel}>
          <ArrowIcon direction="down" className="size-3.5" /> {hero.scrollHint}
        </a>
      </div>
    </section>
  )
}
