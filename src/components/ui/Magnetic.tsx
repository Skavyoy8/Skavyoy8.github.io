'use client'

import { m, useMotionValue, useSpring } from 'motion/react'
import { type PointerEvent, type ReactNode, useRef } from 'react'

const SPRING = { stiffness: 180, damping: 22, mass: 0.5 }

/** Bouton magnétique : le contenu suit légèrement le pointeur, sans rebond. */
export function Magnetic({ children, strength = 0.3, className = '' }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, SPRING)
  const sy = useSpring(y, SPRING)

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (event.pointerType !== 'mouse' || document.documentElement.dataset.calm === 'true') return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span ref={ref} className={`inline-flex ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </m.span>
  )
}
