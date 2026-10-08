import Image from 'next/image'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'

/** Les mots entre [crochets] ressortent en blanc, le reste reste gris. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith('[') ? (
          <span key={i} className="text-fg">
            {part.slice(1, -1)}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

// Les huit couleurs du terminal, en bas de la fiche neofetch.
const PALETTE = ['#050506', '#ff6b6b', '#c8ff2e', '#ffd166', '#8fd8ff', '#c3a4ff', '#7ce7d1', '#f1f1f3']

export function About() {
  const c = about.card
  return (
    <section id="a-propos" aria-labelledby="a-propos-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="a-propos-title" index={about.index} command={about.command} title={about.title} />

      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <p className="text-[clamp(1.6rem,2.6vw,2.35rem)] leading-[1.3] font-medium tracking-[-0.03em] text-pretty text-muted" data-reveal>
            <Emphasis text={about.statement} />
          </p>
          <div className="mt-10 max-w-xl space-y-5 text-pretty text-muted" data-reveal style={delay(0.1)}>
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <a
            href={site.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-10 inline-flex items-center gap-3 border-b border-line-strong pb-1.5 text-fg/90 transition-colors hover:border-accent hover:text-accent"
            data-reveal
            style={delay(0.15)}
          >
            {about.githubCta}
            <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only">(nouvel onglet)</span>
          </a>
        </div>

        {/* La fiche façon neofetch : la commande Linux qui résume une machine en un coup d'œil. */}
        <aside className="card self-start overflow-hidden font-mono text-[0.8rem] lg:col-span-5" data-reveal style={delay(0.15)} aria-label="Fiche de profil">
          <p className="border-b border-line px-6 py-3.5 text-muted">
            <span className="text-accent">$</span> {c.command}
          </p>
          <div className="flex flex-col gap-6 p-6 sm:flex-row">
            <Image src={asset(site.avatar)} alt="" width={112} height={112} className="size-28 shrink-0 rounded-xl border border-line-strong object-cover grayscale" />
            <div className="min-w-0 flex-1">
              <p className="text-[0.95rem] text-fg">
                <span className="text-accent">{c.user.split('@')[0]}</span>@{c.user.split('@')[1]}
              </p>
              <p className="text-muted" aria-hidden="true">
                ────────────
              </p>
              <dl className="mt-1 space-y-1">
                {c.facts.map((fact) => (
                  <div key={fact.label} className="flex flex-wrap gap-x-2">
                    <dt className="text-accent">{fact.label} :</dt>
                    <dd className="text-fg/85">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex" aria-hidden="true">
                {PALETTE.map((color) => (
                  <span key={color} className="h-3.5 w-5" style={{ background: color }} />
                ))}
              </div>
            </div>
          </div>
          <a href="#reseaux" className="group flex items-center justify-between border-t border-line px-6 py-4 font-sans text-[0.9rem] text-fg/90 transition-colors hover:bg-white/[0.03] hover:text-accent">
            {c.cta}
            <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </aside>
      </div>
    </section>
  )
}
