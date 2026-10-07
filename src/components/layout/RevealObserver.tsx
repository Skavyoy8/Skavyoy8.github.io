'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Fait apparaître les éléments [data-reveal] quand ils entrent à l'écran.
 * Un seul IntersectionObserver pour toute la page ; le reste est en CSS (globals.css).
 */
export function RevealObserver() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-in', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    for (const el of document.querySelectorAll('[data-reveal]:not([data-in])')) observer.observe(el)
    return () => observer.disconnect()
  }, [pathname])

  return null
}
