import type { ReactNode } from 'react'

type Title = { readonly before: string; readonly accent: string; readonly after: string }

export function AccentTitle({ title }: { title: Title }) {
  return (
    <>
      {title.before} <span className="accent-serif">{title.accent}</span>
      {title.after}
    </>
  )
}

/** Le logo : une tuile citron avec un créneau de signal numérique. */
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#c8ff2e" />
      <path d="M6 20h5v-8h5v8h5v-8h5" fill="none" stroke="#0b0d05" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const buttonPrimary =
  'btn-lime group inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-[background-color,box-shadow] duration-500 hover:bg-[#d8ff6a]'
export const buttonGhost =
  'group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-fg transition-colors duration-500 hover:bg-white/[0.09]'

export function Pill({ children, tone = 'accent', className = '' }: { children: ReactNode; tone?: 'accent' | 'muted'; className?: string }) {
  return (
    <span className={`pill ${className}`}>
      <span className={`size-1.5 rounded-full ${tone === 'accent' ? 'bg-accent shadow-[0_0_8px_#c8ff2e]' : 'bg-muted'}`} aria-hidden="true" />
      {children}
    </span>
  )
}

/** En-tête de section : pastille, grand titre à gauche, intro à droite. */
export function SectionHead({ id, pill, title, intro, className = '' }: { id: string; pill: string; title: Title; intro?: ReactNode; className?: string }) {
  return (
    <header className={`container-x grid gap-x-10 gap-y-6 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className="lg:col-span-7">
        <p data-reveal="fade">
          <Pill>{pill}</Pill>
        </p>
        <h2 id={id} className="text-h2 mt-6 text-balance" data-reveal="title">
          <AccentTitle title={title} />
        </h2>
      </div>
      {intro ? (
        <p className="max-w-md text-pretty text-[0.95rem] leading-relaxed text-muted lg:col-span-4 lg:col-start-9 lg:pb-2" data-reveal="fade">
          {intro}
        </p>
      ) : null}
    </header>
  )
}

/** Barre de titre d'une carte : légende mono à gauche, méta à droite. */
export function CardBar({ title, meta, className = '' }: { title: ReactNode; meta?: ReactNode; className?: string }) {
  return (
    <div className={`mono flex items-center justify-between gap-4 text-muted ${className}`}>
      <span className="text-fg/85">{title}</span>
      {meta ? <span>{meta}</span> : null}
    </div>
  )
}

export function Chip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] ${
        active ? 'border-accent/50 bg-accent/10 text-accent' : 'border-line text-muted'
      }`}
    >
      {children}
    </span>
  )
}

export function StatusDot({ tone = 'accent' }: { tone?: 'accent' | 'cold' | 'muted' }) {
  const color = tone === 'accent' ? 'bg-accent shadow-[0_0_8px_#c8ff2e]' : tone === 'cold' ? 'bg-cold' : 'bg-muted'
  return <span className={`pulse-dot inline-block size-1.5 rounded-full ${color}`} aria-hidden="true" />
}

export function ArrowIcon({ direction = 'up-right', className = 'size-4' }: { direction?: 'up-right' | 'down' | 'right' | 'up'; className?: string }) {
  const rotate = { 'up-right': 0, right: 45, down: 135, up: -45 }[direction]
  return (
    <svg viewBox="0 0 16 16" className={className} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true" fill="none">
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  )
}
