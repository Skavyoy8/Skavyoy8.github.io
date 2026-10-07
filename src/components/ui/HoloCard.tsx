import type { ReactNode } from 'react'

/** Carte holographique : reflet irisé fixe, qui s'intensifie au survol (CSS seul, rien ne suit la souris). */
export function HoloCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`holo relative ${className}`}>
      {children}
      <span className="holo-sheen" aria-hidden="true" />
    </div>
  )
}

/** Carte dont la bordure s'allume au survol. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`spotlight ${className}`}>{children}</div>
}
