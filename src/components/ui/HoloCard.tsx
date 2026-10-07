'use client'

import { type PointerEvent, type ReactNode, useRef } from 'react'

/** Carte holographique : tilt 3D + reflet irisé qui suit le pointeur (variables CSS, aucun re-render). */
export function HoloCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || document.documentElement.dataset.calm === 'true') return
    const rect = el.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    el.style.setProperty('--rx', `${(0.5 - py) * 18}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * 22}deg`)
    el.style.setProperty('--px', `${px * 100}%`)
    el.style.setProperty('--py', `${py * 100}%`)
    el.style.setProperty('--glare', '1')
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--glare', '0')
  }

  return (
    <div ref={ref} className={`holo relative ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} data-cursor="view">
      {children}
      <span className="holo-sheen" aria-hidden="true" />
    </div>
  )
}

/** Carte à projecteur : la bordure s'allume sous le curseur. */
export function SpotlightCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    el.style.setProperty('--my', `${event.clientY - rect.top}px`)
  }
  return (
    <div ref={ref} className={`spotlight ${className}`} onPointerMove={onMove}>
      {children}
    </div>
  )
}
