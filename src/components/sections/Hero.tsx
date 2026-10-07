import Image from 'next/image'
import { ParisTime } from '@/components/ui/Live'
import { Magnetic } from '@/components/ui/Magnetic'
import { ArrowIcon, buttonGhost, buttonPrimary, StatusDot } from '@/components/ui/Primitives'
import { Fill } from '@/components/ui/Todo'
import { hero, site } from '@/content/site'
import { parcoursCopy, tryhackme } from '@/content/tryhackme'
import { asset } from '@/lib/asset'

export function Hero() {
  const stats = [
    { label: parcoursCopy.labels.rooms, value: tryhackme.stats.rooms, href: '#rooms', suffix: '' },
    { label: parcoursCopy.labels.badges, value: tryhackme.stats.badges, href: '#badges', suffix: '' },
    { label: parcoursCopy.labels.top, value: tryhackme.stats.topPercent, href: '#parcours', suffix: ' %' },
  ]

  return (
    <section id="accueil" aria-labelledby="hero-title" className="relative flex min-h-svh flex-col justify-end pt-28 pb-6">
      <div className="container-x">
        <p className="label flex items-center gap-3 text-muted" data-hero-fade>
          <StatusDot /> {hero.eyebrow}
        </p>
        <h1 id="hero-title" className="text-mega mt-5 -ml-[0.05em] mix-blend-difference">
          <span className="sr-only">{site.name}.</span>
          <span aria-hidden="true">
            <span data-reveal="hero">{site.name}</span>
            <span className="text-accent">.</span>
          </span>
        </h1>

        <div className="mt-8 grid grid-cols-4 gap-x-(--gutter) gap-y-8 lg:mt-10 lg:grid-cols-12 lg:items-end">
          <p className="col-span-4 max-w-xl text-lg text-pretty text-fg/90 lg:col-span-5 lg:text-xl" data-hero-fade>
            {site.tagline}
          </p>
          <div className="col-span-4 flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end" data-hero-fade>
            <Magnetic>
              <a href={hero.ctaPrimary.href} className={buttonPrimary} data-cursor="link">
                {hero.ctaPrimary.label}
                <ArrowIcon direction="down" className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={hero.ctaSecondary.href} className={buttonGhost} data-cursor="link">
                {hero.ctaSecondary.label}
                <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-line pt-5 lg:flex-row lg:items-end lg:justify-between" data-hero-fade>
          <ul className="label flex flex-wrap items-center gap-x-6 gap-y-3 text-muted" aria-label="Infos">
            <li className="flex items-center gap-2 text-fg">
              <StatusDot /> {site.status}
            </li>
            <li className="text-fg">{site.seeking}</li>
            <li>{site.location}</li>
            <li>
              <ParisTime /> · Paris
            </li>
            <li className="flex items-center gap-2">
              <Image src={asset(site.avatar)} alt="" width={20} height={20} className="size-5 rounded-full object-cover grayscale" />@{site.github.user}
            </li>
          </ul>
          <ul className="grid grid-cols-3 gap-px overflow-hidden rounded-md border border-line bg-line" aria-label="Statistiques TryHackMe">
            {stats.map((stat) => (
              <li key={stat.label} className="bg-bg/80 backdrop-blur-sm transition-colors hover:bg-surface">
                <a href={stat.href} className="block h-full px-4 py-3">
                <span className="label block text-[0.625rem] text-muted">{stat.label}</span>
                <span className="mt-1.5 block font-mono text-xl tabular-nums">
                  <Fill value={stat.value}>
                    {(value) => (
                      <>
                        <span data-count={value}>{value}</span>
                        {stat.suffix}
                      </>
                    )}
                  </Fill>
                </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#a-propos"
        className="label absolute top-[22vh] right-(--gutter) hidden flex-col items-center gap-3 text-muted [writing-mode:vertical-rl] lg:flex"
        aria-label="Défiler vers À propos"
      >
        {hero.scrollHint}
        <span className="relative block h-16 w-px overflow-hidden bg-line">
          <span className="scroll-line absolute inset-0 bg-fg" />
        </span>
      </a>
    </section>
  )
}
