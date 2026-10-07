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

/** Le pseudo en texte, avec son point citron. */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`text-[1.35rem] font-semibold tracking-[-0.04em] ${className}`}>
      skavyoy<span className="text-accent">.</span>
    </span>
  )
}

export const buttonPrimary =
  'group inline-flex items-center gap-3 rounded-xl bg-gradient-to-b from-white to-[#d6d6dc] px-6 py-3.5 text-[0.9rem] font-medium text-ink shadow-[0_10px_40px_-12px_rgb(255_255_255/0.35)] transition-[transform,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-14px_rgb(255_255_255/0.5)]'
export const buttonGhost =
  'group inline-flex items-center gap-3 rounded-xl border border-line-strong bg-white/[0.02] px-6 py-3.5 text-[0.9rem] font-medium text-fg transition-colors duration-500 hover:border-white/25 hover:bg-white/[0.05]'

/** En-tête de section : « 01 / À PROPOS », puis le grand titre, l'intro à droite. */
export function SectionHead({ id, index, title, intro, children }: { id: string; index: string; title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <header className="grid gap-x-10 gap-y-5 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7" data-reveal>
        <p className="label text-muted">
          <span className="text-accent">{index.split(' / ')[0]}</span> / {index.split(' / ')[1]}
        </p>
        <h2 id={id} className="text-h2 mt-5 text-balance">
          {title}
        </h2>
      </div>
      {intro || children ? (
        <div className="max-w-md text-pretty text-muted lg:col-span-4 lg:col-start-9 lg:pb-2" data-reveal style={delay(0.1)}>
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
