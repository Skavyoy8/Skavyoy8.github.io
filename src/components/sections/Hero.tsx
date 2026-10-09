import Image from 'next/image'
import { ArrowIcon, buttonGhost, buttonPrimary, Caret, delay, vars } from '@/components/ui/Primitives'
import { hero, site } from '@/content/site'
import { asset } from '@/lib/asset'

/** Ma photo, dans un cadre sobre : un halo citron derrière, de fines lignes d'écran devant. */
function Photo() {
  const p = hero.photo
  return (
    <figure className="relative mx-auto w-full max-w-[22rem]">
      <span className="pointer-events-none absolute -inset-10 rounded-full bg-accent/[0.08] blur-3xl" aria-hidden="true" />
      <div className="scanlines relative aspect-square overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface shadow-[0_50px_120px_-50px_rgb(0_0_0/0.95)]">
        <Image src={asset(site.avatar)} alt={p.alt} width={236} height={236} priority className="size-full object-cover contrast-[1.08] grayscale" />
      </div>
      <figcaption className="mono mt-5 flex items-center justify-between gap-4 text-muted">
        <span>
          <span className="text-accent">$</span> {p.user}
        </span>
        <span>{p.meta}</span>
      </figcaption>
    </figure>
  )
}

/** L'accueil : le pseudo en grand suivi d'un curseur, qui je suis, et ma photo. */
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
          <Photo />
        </div>
      </div>
    </section>
  )
}
