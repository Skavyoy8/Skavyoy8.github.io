'use client'

import type Lenis from 'lenis'

let lenis: Lenis | null = null

export function setLenis(instance: Lenis | null) {
  lenis = instance
}

export function getLenis() {
  return lenis
}

/** Défile vers une ancre (#id) ou un élément, avec Lenis si actif, sinon nativement. */
export function scrollToTarget(target: string | HTMLElement, { instant = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  if (lenis && !instant) {
    lenis.scrollTo(el, { duration: 1.4 })
  } else {
    const calm = document.documentElement.dataset.calm === 'true'
    el.scrollIntoView({ behavior: instant || calm ? 'auto' : 'smooth', block: 'start' })
  }
  if (typeof target === 'string' && target.startsWith('#')) {
    history.replaceState(null, '', target)
  }
}
