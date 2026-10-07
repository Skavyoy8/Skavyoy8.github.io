import type { ReactNode } from 'react'

type Title = { readonly before: string; readonly accent: string; readonly after: string }

/** Coins de cadre « viseur » : à placer dans un parent en position relative. */
export function Viewfinder() {
  return (
    <span className="viewfinder pointer-events-none absolute inset-0" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

export function AccentTitle({ title }: { title: Title }) {
  return (
    <>
      {title.before} <span className="accent-serif">{title.accent}</span>
      {title.after}
    </>
  )
}

export const buttonPrimary =
  'group inline-flex items-center gap-3 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors duration-500 hover:bg-accent'
export const buttonGhost =
  'group inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-fg transition-colors duration-500 hover:border-fg'

export function SectionHeader({ id, index, title, intro, className = 'pb-12 lg:pb-20' }: { id: string; index: string; title: Title; intro?: string; className?: string }) {
  return (
    <header className={`container-x grid grid-cols-4 gap-x-(--gutter) gap-y-6 lg:grid-cols-12 ${className}`}>
      <p className="label col-span-4 text-muted lg:col-span-12" data-scramble>
        {index}
      </p>
      <h2 id={id} className="text-display col-span-4 text-balance lg:col-span-8" data-reveal="title">
        <AccentTitle title={title} />
      </h2>
      {intro ? (
        <p className="col-span-4 self-end text-pretty text-muted lg:col-span-4 lg:col-start-9" data-reveal="fade">
          {intro}
        </p>
      ) : null}
    </header>
  )
}

export function Chip({ children, active = false }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] tracking-wide ${
        active ? 'border-accent/50 text-accent' : 'border-line text-muted'
      }`}
    >
      {children}
    </span>
  )
}

export function StatusDot({ tone = 'accent' }: { tone?: 'accent' | 'cold' | 'muted' }) {
  const color = tone === 'accent' ? 'bg-accent' : tone === 'cold' ? 'bg-cold' : 'bg-muted'
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
