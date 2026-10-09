import type { CSSProperties, ReactNode } from 'react'

/** Décalage d'une apparition ou d'une animation CSS (variable --d). */
export const delay = (seconds: number) => ({ '--d': `${seconds}s` }) as CSSProperties

/** Variables CSS en style inline (--i, --h…). */
export const vars = (values: Record<`--${string}`, string | number>) => values as CSSProperties

/** Le logo : une tuile citron avec un créneau de signal numérique (aussi l'icône du site). */
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#c8ff2e" />
      <path d="M6 20h5v-8h5v8h5v-8h5" fill="none" stroke="#0b0d05" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Le curseur de terminal citron qui clignote, en « _ » après le pseudo. */
export function Caret({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`caret inline-block bg-accent ${className}`} />
}

/** Le pseudo en texte, suivi du curseur. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-[0.12em] text-[1.25rem] font-semibold tracking-[-0.04em] ${className}`}>
      skavyoy
      <Caret className="h-[0.1em] w-[0.48em]" />
    </span>
  )
}

export const buttonPrimary =
  'group inline-flex items-center gap-3 rounded-full bg-accent px-6 py-3.5 text-[0.9rem] font-semibold text-ink shadow-[0_12px_44px_-14px_rgb(200_255_46/0.6)] transition-[transform,box-shadow,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#d8ff6a] hover:shadow-[0_18px_54px_-14px_rgb(200_255_46/0.75)]'
export const buttonGhost =
  'group inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3.5 text-[0.9rem] font-medium text-fg transition-colors duration-500 hover:border-white/30 hover:bg-white/[0.04]'

type Title = readonly [string, string]

/**
 * En-tête de section : la commande qui « ouvre » la section, puis un titre en deux tons
 * (la première moitié en blanc, la seconde en gris), l'intro à droite.
 */
export function SectionHead({ id, index, command, title, intro, children }: { id: string; index: string; command: string; title: Title; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8" data-reveal>
        <p className="mono flex items-center gap-3 text-muted">
          <span>{index}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
          <span>
            <span className="text-accent">$</span> {command}
          </span>
        </p>
        <h2 id={id} className="text-h2 mt-6 text-balance">
          {title[0]} <span className="block text-muted">{title[1]}</span>
        </h2>
      </div>
      {intro || children ? (
        <div className="max-w-sm text-pretty text-muted lg:col-span-4 lg:pb-2" data-reveal style={delay(0.1)}>
          {intro ? <p>{intro}</p> : null}
          {children}
        </div>
      ) : null}
    </header>
  )
}

export function Chip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return <span className={`tag ${active ? 'border-accent/40 text-accent' : ''}`}>{children}</span>
}

export function ArrowIcon({ direction = 'up-right', className = 'size-4' }: { direction?: 'up-right' | 'down' | 'right' | 'up'; className?: string }) {
  const rotate = { 'up-right': 0, right: 45, down: 135, up: -45 }[direction]
  return (
    <svg viewBox="0 0 16 16" className={className} style={{ transform: `rotate(${rotate}deg)` }} aria-hidden="true" fill="none">
      <path d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
