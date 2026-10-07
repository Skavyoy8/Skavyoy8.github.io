import Image from 'next/image'
import { ArrowIcon, buttonGhost, buttonPrimary, delay, vars } from '@/components/ui/Primitives'
import { hero, site } from '@/content/site'
import { asset } from '@/lib/asset'

function ChipIcon({ kind }: { kind: 'rack' | 'target' }) {
  return (
    <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      {kind === 'rack' ? (
        <>
          <rect x="3.5" y="3" width="13" height="4" rx="1" />
          <rect x="3.5" y="8" width="13" height="4" rx="1" />
          <rect x="3.5" y="13" width="13" height="4" rx="1" />
          <path d="M6 5h.01M6 10h.01M6 15h.01" strokeWidth="2" />
        </>
      ) : (
        <>
          <circle cx="10" cy="10" r="6.5" />
          <circle cx="10" cy="10" r="3" />
          <path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3" />
        </>
      )}
    </svg>
  )
}

/** L'accueil : le pseudo en grand, deux lignes pour dire qui je suis, et la carte de profil inclinée. */
export function Hero() {
  const letters = [...hero.name]
  return (
    <section id="accueil" aria-labelledby="accueil-title" className="relative flex min-h-svh flex-col pt-36 sm:pt-40 lg:pt-44">
      <div className="container-x grid flex-1 items-center gap-x-8 gap-y-16 pb-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="fade-up label inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-white/[0.02] px-4 py-2 text-fg/75">
            <span className="pulse-dot size-1.5 rounded-full bg-accent shadow-[0_0_8px_#c8ff2e]" aria-hidden="true" />
            {hero.tags.map((tag, i) => (
              <span key={tag} className={`items-center gap-3 ${i === hero.tags.length - 1 ? 'hidden sm:flex' : 'flex'}`}>
                {i ? (
                  <span className="text-muted/60" aria-hidden="true">
                    /
                  </span>
                ) : null}
                {tag}
              </span>
            ))}
          </p>

          <h1 id="accueil-title" className="mt-8 text-[clamp(4.2rem,11.5vw,10.5rem)] leading-[0.92] font-semibold tracking-[-0.065em]">
            <span className="sr-only">{hero.srName}</span>
            <span aria-hidden="true" className="inline-block pb-[0.08em]">
              {letters.map((letter, i) => (
                <span key={i} className="rise text-metal inline-block" style={vars({ '--i': i })}>
                  {letter}
                </span>
              ))}
              <span
                className="rise ml-[0.04em] inline-block size-[0.16em] rounded-full bg-accent shadow-[0_0_28px_rgb(200_255_46/0.7)]"
                style={vars({ '--i': letters.length })}
              />
            </span>
          </h1>

          <div className="fade-up mt-7 space-y-1 text-[1.1rem] leading-relaxed text-fg/80 sm:text-[1.3rem]" style={delay(0.45)}>
            {hero.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="fade-up mt-10 flex flex-wrap gap-3" style={delay(0.55)}>
            <a href={hero.ctaPrimary.href} className={buttonPrimary}>
              {hero.ctaPrimary.label}
              <ArrowIcon direction="down" className="size-4 transition-transform duration-500 group-hover:translate-y-0.5" />
            </a>
            <a href={hero.ctaSecondary.href} className={buttonGhost}>
              {hero.ctaSecondary.label}
              <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <ul className="fade-up mono mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted" style={delay(0.65)}>
            {hero.meta.map((item, i) => (
              <li key={item} className="flex items-center gap-4">
                {i ? (
                  <span className="text-accent/70" aria-hidden="true">
                    +
                  </span>
                ) : null}
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Carte de profil : décorative, l'identité est déjà dans le titre. */}
        <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:mr-0" aria-hidden="true">
          <div className="orbit -inset-[18%] hidden sm:block" />
          <div className="orbit -inset-[38%] hidden sm:block" />
          <div className="fade-up" style={delay(0.3)}>
            <div className="float">
              <div className="hero-card card overflow-hidden rounded-[1.6rem] bg-[#0d0d10] p-3">
                <div className="flex items-center justify-between px-2 pt-1 pb-3">
                  <span className="text-[0.95rem] font-semibold tracking-tight">{hero.card.handle}</span>
                  <ArrowIcon className="size-4 text-muted" />
                </div>
                <div className="hero-card-photo relative aspect-square overflow-hidden rounded-[1.1rem] border border-line">
                  <Image src={asset(site.avatar)} alt="" width={236} height={236} priority className="size-full object-cover contrast-[1.08] grayscale" />
                  <span className="corners" />
                </div>
                <div className="label flex items-center justify-between px-2 pt-3 pb-1 text-muted">
                  <span>{hero.card.org}</span>
                  <span>{hero.card.index}</span>
                </div>
              </div>
            </div>
          </div>

          {hero.card.chips.map((chip, i) => (
            <div
              key={chip.kicker}
              className={`fade-up absolute hidden sm:block ${i === 0 ? '-top-6 -right-4 xl:-right-10' : '-bottom-12 -left-6 xl:-left-12'}`}
              style={delay(0.6 + i * 0.12)}
            >
              <div className="float" style={delay(-2 - i * 2.5)}>
                <div className="card flex items-center gap-3 rounded-2xl bg-[#0f0f12]/95 py-3 pr-5 pl-3 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.9)]">
                  <span className="grid size-9 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent">
                    <ChipIcon kind={chip.icon} />
                  </span>
                  <span>
                    <span className="label block text-[0.625rem] text-muted">{chip.kicker}</span>
                    <span className="block text-[1.05rem] leading-tight font-semibold tracking-tight">{chip.value}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="label pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 rotate-90 text-muted/60 xl:block" aria-hidden="true">
        {hero.side}
      </p>

      <div className="container-x">
        <div className="mono flex items-center justify-end border-t border-line py-6 text-muted sm:justify-between">
          <span className="hidden sm:inline">{hero.footLeft}</span>
          <a href="#a-propos" className="group flex items-center gap-3 transition-colors hover:text-fg">
            {hero.scroll}
            <ArrowIcon direction="down" className="size-4 transition-transform duration-500 group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
