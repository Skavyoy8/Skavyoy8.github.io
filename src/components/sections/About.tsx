import Image from 'next/image'
import QRCode from 'qrcode'
import type { CSSProperties } from 'react'
import { BadgeFlip } from '@/components/ui/BadgeFlip'
import { ArrowIcon, CardBar, SectionHead } from '@/components/ui/Primitives'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'

/** Les mots entre [crochets] du contenu passent en accent. */
function Highlight({ text }: { text: string }) {
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

/** QR généré au build, en SVG : aucune image externe, aucun JS. */
function QrCode({ value, className = '' }: { value: string; className?: string }) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: 'M' })
  const size = modules.size
  let d = ''
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className={className} role="img" aria-label={`QR code vers ${value}`} shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={size + 2} height={size + 2} fill="#ededef" />
      <path d={d} fill="#050506" />
    </svg>
  )
}

function BadgeFront() {
  const b = about.badge
  return (
    <div className="relative flex aspect-[1.6/2.25] w-[min(100%,300px)] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#101209] p-5 text-left">
      <div className="flex items-center justify-between">
        <span className="mono text-muted">{b.org}</span>
        <span className="mono rounded-md bg-accent px-1.5 py-0.5 text-[11px] text-ink">{b.level}</span>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Image src={asset(site.avatar)} alt={`Avatar de ${site.name}`} width={80} height={80} className="size-20 rounded-xl border border-white/10 object-cover" />
        <div className="h-10 w-12 rounded-md border border-accent/40 bg-[repeating-linear-gradient(90deg,rgb(200_255_46/.25)_0_2px,transparent_2px_6px)]" aria-hidden="true" />
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight">{b.name}</p>
      <p className="mono text-muted">{b.handle}</p>
      <dl className="mt-4 space-y-1 font-mono text-[11px]">
        <div className="flex gap-2">
          <dt className="text-muted">filière</dt>
          <dd>{b.role}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">statut</dt>
          <dd>{b.status}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">accès</dt>
          <dd className="text-accent">{b.access}</dd>
        </div>
      </dl>
      <div className="mt-auto flex items-end justify-between gap-3">
        <span className="mono text-[10.5px] text-muted">{b.qrLabel}</span>
        <QrCode value={site.github.url} className="size-14 rounded-md" />
      </div>
    </div>
  )
}

function BadgeBack() {
  const b = about.badge
  return (
    <div className="relative flex aspect-[1.6/2.25] w-[min(100%,300px)] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#101209] p-5 text-left">
      <p className="mono text-muted">{b.backTitle}</p>
      <dl className="mt-3 divide-y divide-white/[0.06]">
        {b.backLines.map(([label, value]) => (
          <div key={label} className="py-2">
            <dt className="mono text-[10.5px] text-muted">{label}</dt>
            <dd className="mt-0.5 font-medium tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
      <span className="absolute inset-x-0 bottom-0 h-1.5 bg-accent" aria-hidden="true" />
    </div>
  )
}

/** Le hub : l'avatar au centre, relié aux quatre terrains de jeu. */
function Hub() {
  const [a, b, c, d] = about.who.hub
  const node = (item: (typeof about.who.hub)[number]) => (
    <span className="flex flex-col items-center gap-2">
      <span className="tile size-11 rounded-full text-[11px]">{item.abbr}</span>
      <span className="mono text-[11px] text-muted">{item.label}</span>
    </span>
  )
  return (
    <div className="relative mt-8 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 sm:gap-3" aria-hidden="true">
      <div className="flex flex-col gap-6">
        {node(a!)}
        {node(b!)}
      </div>
      <div className="flex flex-col gap-[4.6rem]">
        <span className="hub-link relative h-px bg-white/15" data-dir="out" style={{ '--i': 0 } as CSSProperties} />
        <span className="hub-link relative h-px bg-white/15" data-dir="out" style={{ '--i': 2 } as CSSProperties} />
      </div>
      <div className="relative grid size-24 place-items-center rounded-[1.6rem] bg-accent/90 shadow-[0_0_60px_-10px_rgb(200_255_46/0.8)] sm:size-28">
        <Image src={asset(site.avatar)} alt="" width={96} height={96} className="size-[84%] rounded-[1.3rem] object-cover" />
      </div>
      <div className="flex flex-col gap-[4.6rem]">
        <span className="hub-link relative h-px bg-white/15" data-dir="in" style={{ '--i': 1 } as CSSProperties} />
        <span className="hub-link relative h-px bg-white/15" data-dir="in" style={{ '--i': 3 } as CSSProperties} />
      </div>
      <div className="flex flex-col gap-6">
        {node(c!)}
        {node(d!)}
      </div>
    </div>
  )
}

export function About() {
  const [first, second, next] = about.paragraphs
  return (
    <section id="a-propos" aria-labelledby="about-title" className="frost relative py-[18vh]">
      <SectionHead id="about-title" pill={about.pill} title={about.title} intro={<Highlight text={about.statement} />} />

      <div className="container-x mt-14 grid gap-5 lg:mt-20 lg:grid-cols-12">
        <article className="glass flex flex-col p-6 sm:p-8 lg:col-span-7" data-reveal="fade">
          <h3 className="text-h3">{about.who.title}</h3>
          <p className="mt-4 max-w-xl text-pretty text-muted">{first}</p>
          <p className="mt-3 max-w-xl text-pretty text-muted">{second}</p>
          <div className="mt-auto pt-10">
            <Hub />
            <p className="mono mt-8 text-muted">{about.who.caption}</p>
          </div>
        </article>

        <article className="glass flex flex-col items-center p-6 sm:p-8 lg:col-span-5" data-reveal="fade">
          <CardBar title={about.badgeCard.title} meta={about.badgeCard.text} className="w-full" />
          <div className="mt-8 w-full">
            <BadgeFlip front={<BadgeFront />} back={<BadgeBack />} />
          </div>
        </article>

        <div className="glass grid gap-px overflow-hidden lg:col-span-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]" data-reveal="fade">
          <div className="flex flex-col justify-between gap-4 p-6">
            <p className="mono flex items-center gap-2 text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> {about.next.label}
            </p>
            <p className="text-pretty">{next}</p>
            <a href="#reseaux" className="mono inline-flex items-center gap-2 text-fg/80 transition-colors hover:text-accent">
              {about.next.cta} <ArrowIcon className="size-3.5" />
            </a>
          </div>
          <dl className="contents">
            {about.facts.map((fact) => (
              <div key={fact.label} className="border-t border-white/[0.06] p-6 lg:border-t-0 lg:border-l">
                <dt className="mono text-muted">{fact.label}</dt>
                <dd className="mt-2 text-[15px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
