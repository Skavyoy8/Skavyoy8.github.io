import { LogoMark } from '@/components/ui/Primitives'
import { manifesto } from '@/content/manifesto'

/**
 * La carte citron : elle s'ouvre en grand, les mots s'allument un à un,
 * puis elle se referme autour du logo (chorégraphie GSAP dans Reveals, data-manifesto).
 */
export function Manifesto() {
  const words = manifesto.text.split(' ')
  return (
    <section id="manifeste" aria-labelledby="manifesto-title" className="frost relative" data-manifesto>
      <div className="relative h-svh min-h-[560px]" data-manifesto-stage>
        <div className="manifesto-card on-lime dots-ink absolute inset-0 bg-accent text-ink" data-manifesto-card>
          <div className="container-x flex h-full flex-col items-center justify-center pb-[12vh] text-center">
            <h2 id="manifesto-title" className="mono text-ink/70" data-manifesto-kicker>
              {manifesto.kicker}
            </h2>
            <p className="text-h2 mt-6 max-w-[22ch] text-balance sm:max-w-[26ch]">
              {words.map((word, i) => {
                const accent = word.startsWith('*')
                const clean = word.replace(/\*/g, '')
                return (
                  <span key={i} data-manifesto-word className={`inline-block ${accent ? 'accent-serif' : ''}`}>
                    {clean}
                    {i < words.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </p>
          </div>
        </div>
        <div className="pointer-events-none absolute top-[68%] left-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.4rem] bg-[#0b0d05] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)]" data-manifesto-logo aria-hidden="true">
          <LogoMark className="size-11" />
        </div>
      </div>
    </section>
  )
}
