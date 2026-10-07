'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useHydrated } from '@/hooks/useMedia'
import { useCalm } from '@/lib/calm'
import { flags, on } from '@/lib/events'
import { useWebGL } from './webgl'

// three, R3F et drei vivent dans ce chunk, chargé après le premier rendu du texte.
const Experience = dynamic(() => import('./Experience'), { ssr: false, loading: () => null })

export function SceneLoader() {
  const hydrated = useHydrated()
  const calm = useCalm()
  const webgl = useWebGL()
  const [idle, setIdle] = useState(false)

  // La scène se monte après le préloader, quand le navigateur souffle : le texte et le rideau restent fluides.
  useEffect(() => {
    let cancel = () => {}
    const start = () => {
      if ('requestIdleCallback' in window) {
        const id = window.requestIdleCallback(() => setIdle(true), { timeout: 1200 })
        cancel = () => window.cancelIdleCallback(id)
      } else {
        const id = setTimeout(() => setIdle(true), 300)
        cancel = () => clearTimeout(id)
      }
    }
    if (flags.preloaderDone) start()
    const off = on('preloader:done', start)
    return () => {
      off()
      cancel()
    }
  }, [])

  const live = hydrated && !calm && webgl
  return (
    <>
      {live && idle ? null : <div className="signal-fallback" aria-hidden="true" />}
      {live && idle ? <Experience /> : null}
    </>
  )
}
