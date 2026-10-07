'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { useCalm } from '@/lib/calm'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { scrollToTarget, setLenis } from '@/lib/scroll'

/** Lenis piloté par gsap.ticker et synchronisé avec ScrollTrigger. Coupé en mode calme. */
export function SmoothScroll() {
  const calm = useCalm()

  useEffect(() => {
    if (calm) {
      setLenis(null)
      ScrollTrigger.refresh()
      return
    }
    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true })
    setLenis(lenis)
    // En développement seulement : pratique pour piloter le scroll depuis la console.
    if (process.env.NODE_ENV === 'development') Object.assign(window, { __lenis: lenis })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.refresh()
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [calm])

  // Liens d'ancre de la page courante : défilement doux (Lenis) au lieu du saut natif.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href*="#"]') : null
      if (!link || link.dataset.native !== undefined || link.target === '_blank') return
      const url = new URL(link.href)
      if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return
      const target = document.querySelector<HTMLElement>(url.hash)
      if (!target) return
      event.preventDefault()
      scrollToTarget(url.hash)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  // Recalcule les positions quand les polices sont chargées (les titres changent de hauteur).
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return null
}
