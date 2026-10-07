'use client'

import { useEffect, useRef } from 'react'

/**
 * Fond calme : deux halos de lumière fixes et une lueur discrète qui suit la souris
 * (rien ne bouge tant qu'on ne bouge pas). Rien ne passe derrière le texte avec du contraste :
 * le site reste lisible partout. Figé en mode calme.
 */
export function Backdrop() {
  const spot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = spot.current
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0
    let x = 0
    let y = 0
    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        el.style.setProperty('--spot-x', `${x}px`)
        el.style.setProperty('--spot-y', `${y}px`)
        el.style.opacity = '1'
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-glow backdrop-glow-a" />
      <div className="backdrop-glow backdrop-glow-b" />
      <div ref={spot} className="backdrop-spot" />
    </div>
  )
}
