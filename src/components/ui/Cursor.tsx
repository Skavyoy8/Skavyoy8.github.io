'use client'

import { m, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useIsTouch, useHydrated } from '@/hooks/useMedia'
import { useCalm } from '@/lib/calm'

type CursorState = 'default' | 'link' | 'drag' | 'view' | 'text'

const LABELS: Partial<Record<CursorState, string>> = { drag: 'drag', view: 'voir' }
const SIZES: Record<CursorState, number> = { default: 34, link: 64, drag: 84, view: 84, text: 0 }

export function Cursor() {
  const hydrated = useHydrated()
  const calm = useCalm()
  const touch = useIsTouch()
  if (!hydrated || calm || touch) return null
  return <CursorLayer />
}

function CursorLayer() {
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const rx = useSpring(x, { stiffness: 420, damping: 42, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 420, damping: 42, mass: 0.6 })
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('has-cursor')
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = event.target instanceof Element ? event.target : null
      const hit = target?.closest('[data-cursor], a, button, label, summary, input, textarea, select')
      let next: CursorState = 'default'
      if (hit) {
        const explicit = hit.getAttribute('data-cursor') as CursorState | null
        next = explicit ?? (hit.matches('input, textarea, select') ? 'text' : 'link')
      }
      setState((prev) => (prev === next ? prev : next))
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  const size = SIZES[state]
  const label = LABELS[state]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] mix-blend-difference" style={{ opacity: visible ? 1 : 0 }}>
      <m.div className="absolute top-0 left-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" style={{ x, y }} />
      <m.div
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white font-mono text-[10px] tracking-[0.2em] text-white uppercase"
        style={{ x: rx, y: ry }}
        animate={{ width: size, height: size, opacity: size ? 1 : 0, backgroundColor: label ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        {label ? <span className="text-black">{label}</span> : null}
      </m.div>
    </div>
  )
}
