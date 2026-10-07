'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useHydrated, useMediaQuery } from '@/hooks/useMedia'
import { useCalm } from '@/lib/calm'
import { flags, on } from '@/lib/events'
import { isSoftwareRenderer, useWebGL } from './webgl'

/**
 * Sans GPU utilisable, le navigateur refuse un contexte demandé avec failIfMajorPerformanceCaveat,
 * ou nomme un moteur logiciel (SwiftShader, llvmpipe) : on le note sur <html> pour remplacer
 * le flou CSS (très coûteux en rendu logiciel) par un verre opaque.
 */
function markSoftwareRendering(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
    const software = !gl || isSoftwareRenderer(gl)
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    if (software) document.documentElement.dataset.render = 'software'
    return software
  } catch {
    document.documentElement.dataset.render = 'software'
    return true
  }
}

// three, R3F et le bloom vivent dans leur propre chunk, chargé une fois la page affichée.
const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => null })

export function RibbonLoader() {
  const hydrated = useHydrated()
  const calm = useCalm()
  const webgl = useWebGL()
  // Le chemin du ruban est ancré aux sections de l'accueil : ailleurs, l'image statique suffit.
  const home = usePathname() === '/'
  // Pour l'instant, le ruban 3D est réservé aux ordinateurs ; les téléphones gardent l'image statique.
  const desktop = useMediaQuery('(min-width: 1024px) and (hover: hover) and (pointer: fine)')
  const [idle, setIdle] = useState(false)
  const [software, setSoftware] = useState(false)
  // La sonde WebGL et la 3D attendent la fin du préloader : son animation reste fluide.
  const [booted, setBooted] = useState(false)
  useEffect(() => {
    if (flags.preloaderDone) {
      const id = setTimeout(() => setBooted(true), 0)
      return () => clearTimeout(id)
    }
    return on('preloader:done', () => setBooted(true))
  }, [])

  useEffect(() => {
    if (!hydrated || !booted) return
    // Le texte d'abord : le fond démarre quand le navigateur souffle.
    const ready = () => {
      // Sans GPU, un ruban à quelques images par seconde n'apporte rien : l'image statique reste.
      setSoftware(markSoftwareRendering())
      setIdle(true)
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(ready, { timeout: 1200 })
      return () => window.cancelIdleCallback(id)
    }
    // Safari n'a pas requestIdleCallback.
    const id = setTimeout(ready, 300)
    return () => clearTimeout(id)
  }, [hydrated, booted])

  return hydrated && idle && !software && webgl && desktop && home && !calm ? <Scene /> : null
}
