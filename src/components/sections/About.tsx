import Image from 'next/image'
import QRCode from 'qrcode'
import { BadgeFlip } from '@/components/ui/BadgeFlip'
import { SectionHeader, Viewfinder } from '@/components/ui/Primitives'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'

/** Les mots entre [crochets] du contenu passent en accent. */
function Highlight({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        part.startsWith('[') ? (
          <span key={i} className="text-accent">
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

/** Version DOM du badge : fallback de la 3D (mode calme, pas de WebGL) et image au chargement. */
function BadgeCard() {
  const b = about.badge
  return (
    <div className="relative flex aspect-[1.6/2.25] w-[min(100%,330px)] flex-col overflow-hidden rounded-[18px] border border-line-strong bg-surface p-5 text-left shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)]">
      <div className="flex items-center justify-between">
        <span className="label text-muted">{b.org}</span>
        <span className="label rounded-sm bg-accent px-1.5 py-0.5 text-bg">{b.level}</span>
      </div>
      <div className="mt-5 flex items-center gap-4">
        <Image src={asset(site.avatar)} alt={`Avatar de ${site.name}`} width={84} height={84} className="size-[84px] rounded-md border border-line-strong object-cover grayscale" />
        <div className="h-10 w-12 rounded-sm border border-accent/40 bg-[repeating-linear-gradient(90deg,rgb(200_255_46/.25)_0_2px,transparent_2px_6px)]" aria-hidden="true" />
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight">{b.name}</p>
      <p className="font-mono text-xs text-muted">{b.handle}</p>
      <dl className="mt-4 space-y-1 font-mono text-[11px]">
        <div className="flex gap-2">
          <dt className="text-muted">FILIÈRE</dt>
          <dd>{b.role}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">STATUT</dt>
          <dd>{b.status}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-muted">ACCÈS</dt>
          <dd className="text-accent">{b.access}</dd>
        </div>
      </dl>
      <div className="mt-auto flex items-end justify-between gap-3">
        <span className="label text-[0.625rem] text-muted">{b.qrLabel}</span>
        <QrCode value={site.github.url} className="size-16 rounded-sm" />
      </div>
    </div>
  )
}

/** Verso du badge : infos rapides. */
function BadgeBack() {
  const b = about.badge
  return (
    <div className="relative flex aspect-[1.6/2.25] w-[min(100%,330px)] flex-col overflow-hidden rounded-[18px] border border-line-strong bg-surface p-5 text-left">
      <p className="label text-muted">{b.backTitle}</p>
      <dl className="mt-4 divide-y divide-line">
        {b.backLines.map(([label, value]) => (
          <div key={label} className="py-2.5">
            <dt className="label text-[0.625rem] text-muted">{label}</dt>
            <dd className="mt-1 text-lg font-medium tracking-tight">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-auto flex items-end justify-between">
        <span className="h-8 w-28 bg-[repeating-linear-gradient(90deg,#ededef_0_2px,transparent_2px_4px,#ededef_4px_5px,transparent_5px_8px)] opacity-70" aria-hidden="true" />
        <span className="label text-[0.625rem] text-muted">{site.url.replace('https://', '')}</span>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-1.5 bg-accent" aria-hidden="true" />
    </div>
  )
}

export function About() {
  return (
    <section id="a-propos" aria-labelledby="about-title" className="relative py-[16vh]">
      <SectionHeader id="about-title" index={about.index} title={about.title} />
      <div className="container-x grid grid-cols-4 gap-x-(--gutter) gap-y-14 lg:grid-cols-12">
        <div className="col-span-4 lg:col-span-7">
          <p className="text-statement text-balance" data-reveal="title">
            <Highlight text={about.statement} />
          </p>
          <div className="mt-10 grid max-w-3xl gap-6 text-pretty text-muted sm:grid-cols-2" data-reveal="stagger">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="relative mt-12 grid max-w-3xl grid-cols-2 gap-px border border-line bg-line" data-reveal="stagger">
            {about.facts.map((fact) => (
              <div key={fact.label} className="bg-bg p-4">
                <dt className="label text-muted">{fact.label}</dt>
                <dd className="mt-2 text-sm">{fact.value}</dd>
              </div>
            ))}
            <Viewfinder />
          </dl>
        </div>
        <div className="col-span-4 lg:sticky lg:top-24 lg:col-span-5 lg:self-start" data-reveal="fade">
          <BadgeFlip front={<BadgeCard />} back={<BadgeBack />} />
        </div>
      </div>
    </section>
  )
}
