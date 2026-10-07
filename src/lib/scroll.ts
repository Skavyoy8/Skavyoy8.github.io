'use client'

/** Défile vers une ancre (#id) ou un élément, en douceur sauf en mode calme. */
export function scrollToTarget(target: string | HTMLElement, { instant = false } = {}) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  const calm = document.documentElement.dataset.calm === 'true'
  el.scrollIntoView({ behavior: instant || calm ? 'auto' : 'smooth', block: 'start' })
  if (typeof target === 'string' && target.startsWith('#')) {
    history.replaceState(null, '', target)
  }
}
