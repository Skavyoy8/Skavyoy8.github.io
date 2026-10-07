'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { HoloCard } from '@/components/ui/HoloCard'
import { about } from '@/content/about'
import { useHydrated } from '@/hooks/useMedia'
import { useCalm } from '@/lib/calm'
import { useWebGL } from './webgl'

// rapier (WebAssembly) n'est chargé qu'à l'approche de la section À propos.
const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false, loading: () => null })

/** Badge d'accès : lanyard physique en 3D, ou carte en tilt CSS (mode calme, pas de WebGL, chargement). */
export function BadgeStage({ children }: { children: ReactNode }) {
  const hydrated = useHydrated()
  const calm = useCalm()
  const webgl = useWebGL()
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)
  const [ready, setReady] = useState(false)
  const live = hydrated && !calm && webgl
  const show3D = live && ready

  useEffect(() => {
    if (!live) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [live])

  const onReady = useCallback(() => setReady(true), [])

  return (
    <div ref={ref} className="relative h-[70svh] min-h-[520px] lg:h-[84svh]" data-badge-stage={show3D ? '3d' : 'static'}>
      <div className={`absolute inset-0 flex items-start justify-center pt-[6svh] transition-opacity duration-700 ${show3D ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
        <HoloCard className="rounded-[18px]">{children}</HoloCard>
      </div>
      {live && near ? <Lanyard onReady={onReady} /> : null}
      <p className="label pointer-events-none absolute inset-x-0 bottom-0 text-center text-muted">{show3D ? about.badge.dragHint : about.badge.fallbackHint}</p>
    </div>
  )
}
