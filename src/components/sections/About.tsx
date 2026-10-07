import Image from 'next/image'
import { ArrowIcon, delay, SectionHead } from '@/components/ui/Primitives'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'

/** Les mots entre [crochets] ressortent en blanc. */
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith('[') ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(1, -1)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export function About() {
  return (
    <section id="a-propos" aria-labelledby="a-propos-title" className="container-x relative py-28 sm:py-36">
      <SectionHead id="a-propos-title" index={about.index} title={about.title} />

      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="space-y-1 text-[clamp(1.6rem,2.7vw,2.45rem)] leading-[1.25] font-medium tracking-[-0.03em] text-fg/75" data-reveal>
            {about.statement.map((line) => (
              <span key={line} className="block">
                <Emphasis text={line} />
              </span>
            ))}
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

        <aside className="card self-start overflow-hidden lg:col-span-5" data-reveal style={delay(0.15)} aria-label="Fiche de profil">
          <div className="flex items-center gap-4 border-b border-line p-6">
            <Image src={asset(site.avatar)} alt="" width={56} height={56} className="size-14 rounded-full border border-line-strong object-cover grayscale" />
            <div className="min-w-0 flex-1">
              <p className="text-[1.2rem] font-semibold tracking-tight">{about.card.title}</p>
              <p className="mono text-muted">{about.card.subtitle}</p>
            </div>
            <span className="text-2xl leading-none text-accent" aria-hidden="true">
              ✳
            </span>
          </div>
          <dl>
            {about.card.facts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                <dt className="text-muted">{fact.label}</dt>
                <dd className="text-right font-medium text-fg/90">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <a href="#reseaux" className="group flex items-center justify-between px-6 py-5 text-fg/90 transition-colors hover:bg-white/[0.03] hover:text-accent">
            {about.card.cta}
            <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </aside>
      </div>
    </section>
  )
}
