import Image from 'next/image'
import { ArrowIcon, buttonGhost, buttonPrimary, Caret, delay, vars } from '@/components/ui/Primitives'
import { hero, site } from '@/content/site'
import { asset } from '@/lib/asset'

/** Mes domaines présentés comme les ports ouverts d'une machine, ligne par ligne. */
function ScanCard() {
  const s = hero.scan
  return (
    <figure className="card overflow-hidden rounded-[1.4rem] bg-[#0b0b0e] shadow-[0_50px_120px_-50px_rgb(0_0_0/0.95)]">
      <span className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" aria-hidden="true" />
      <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-white/12" />
          <span className="size-2.5 rounded-full bg-white/12" />
          <span className="size-2.5 rounded-full bg-accent/80" />
        </span>
        <span className="mono text-muted">{s.title}</span>
      </div>
      <div className="px-5 py-5 font-mono text-[0.7rem] leading-[1.9] sm:px-6 sm:text-[0.78rem]">
        <p className="scan-line" style={delay(0.35)}>
          <span className="text-accent">$</span> <span className="text-fg">{s.command}</span>
        </p>
        <p className="scan-line text-muted" style={delay(0.5)}>
          {s.start}
        </p>
        <div className="mt-3" role="table" aria-label="Mes domaines">
          <div role="row" className="scan-line grid grid-cols-[5rem_3.6rem_1fr] text-muted/80" style={delay(0.62)}>
            {s.head.map((h) => (
              <span key={h} role="columnheader">
                {h}
              </span>
            ))}
          </div>
          {s.ports.map((row, i) => {
            const listening = row.state === 'listen'
            return (
              <div
                key={row.port}
                role="row"
                className={`scan-line -mx-2 grid grid-cols-[5rem_3.6rem_1fr] rounded-md px-2 ${listening ? 'bg-accent/[0.07] text-accent' : ''}`}
                style={delay(0.75 + i * 0.12)}
              >
                <span role="cell" className={listening ? '' : 'text-fg/70'}>
                  {row.port}
                </span>
                <span role="cell" className={listening ? 'pulse-dot' : 'text-accent'}>
                  {row.state}
                </span>
                <span role="cell" className={listening ? '' : 'text-fg/90'}>
                  {row.service}
                  {'note' in row ? <span className="ml-2 hidden text-accent/70 sm:inline">{row.note}</span> : null}
                </span>
              </div>
            )
          })}
        </div>
        <p className="scan-line mt-3 text-muted" style={delay(0.75 + s.ports.length * 0.12)}>
          {s.done}
        </p>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-line px-5 py-4 sm:px-6">
        <Image src={asset(site.avatar)} alt="" width={40} height={40} className="size-10 rounded-full border border-line-strong object-cover grayscale" />
        <span className="min-w-0">
          <span className="block text-[0.9rem] font-medium">{s.who}</span>
          <span className="mono block truncate text-muted">{s.where}</span>
        </span>
      </figcaption>
    </figure>
  )
}

/** L'accueil : le pseudo en grand suivi d'un curseur, qui je suis, et la carte « scan ». */
export function Hero() {
  const letters = [...hero.name]
  return (
    <section id="accueil" aria-labelledby="accueil-title" className="relative flex min-h-svh flex-col pt-28 pb-8 sm:pt-32">
      <div className="container-x grid flex-1 items-center gap-x-12 gap-y-14 pb-16 lg:grid-cols-12">
        <div className="lg:col-span-7">

          <h1 id="accueil-title" className="text-[clamp(4rem,11vw,10rem)] leading-[0.95] font-semibold tracking-[-0.065em]">
            <span className="sr-only">{hero.srName}</span>
            <span aria-hidden="true" className="inline-flex items-baseline pb-[0.06em]">
              {letters.map((letter, i) => (
                <span key={i} className="rise text-metal inline-block" style={vars({ '--i': i })}>
                  {letter}
                </span>
              ))}
              <Caret className="ml-[0.06em] h-[0.09em] w-[0.42em] translate-y-[0.02em] shadow-[0_0_24px_rgb(200_255_46/0.7)]" />
            </span>
          </h1>

          <p className="fade-up mt-6 text-[clamp(1.4rem,2.2vw,1.9rem)] font-medium tracking-[-0.03em]" style={delay(0.4)}>
            {hero.lead}
          </p>
          <p className="fade-up mt-3 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-muted" style={delay(0.48)}>
            {hero.intro}
          </p>

          <div className="fade-up mt-10 flex flex-wrap gap-3" style={delay(0.56)}>
            <a href={hero.ctaPrimary.href} className={buttonPrimary}>
              {hero.ctaPrimary.label}
              <ArrowIcon direction="down" className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>
            <a href={hero.ctaSecondary.href} className={buttonGhost}>
              {hero.ctaSecondary.label}
              <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="fade-up mx-auto w-full max-w-[30rem] lg:col-span-5 lg:mr-0" style={delay(0.25)}>
          <ScanCard />
        </div>
      </div>
    </section>
  )
}
