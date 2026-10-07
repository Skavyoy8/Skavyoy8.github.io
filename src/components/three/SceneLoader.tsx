'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useHydrated } from '@/hooks/useMedia'
import { useCalm } from '@/lib/calm'
import { useWebGL } from './webgl'

// three et R3F vivent dans ce chunk : il n'est chargé qu'à l'approche du Lab.
const Experience = dynamic(() => import('./Experience'), { ssr: false, loading: () => null })

export function SceneLoader() {
  const hydrated = useHydrated()
  const calm = useCalm()
  const webgl = useWebGL()
  const [near, setNear] = useState(false)
  const live = hydrated && !calm && webgl

  useEffect(() => {
    if (!live) return
    const lab = document.getElementById('lab')
    if (!lab) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: '150% 0px' },
    )
    observer.observe(lab)
    return () => observer.disconnect()
  }, [live])

  return live && near ? <Experience /> : null
}
