'use client'

import { useSyncExternalStore } from 'react'

/**
 * Mode calme : choix mémorisé de l'utilisateur, sinon prefers-reduced-motion.
 * Le script de démarrage (layout) pose data-calm sur <html> avant le premier rendu.
 */
const KEY = 'skavyoy:calm'
const QUERY = '(prefers-reduced-motion: reduce)'
const listeners = new Set<() => void>()
let current: boolean | null = null

function read(): boolean {
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === '1') return true
    if (stored === '0') return false
  } catch {
    // stockage indisponible (navigation privée stricte) : on suit le système
  }
  return window.matchMedia(QUERY).matches
}

function apply(value: boolean) {
  document.documentElement.dataset.calm = value ? 'true' : 'false'
}

function notify() {
  for (const listener of listeners) listener()
}

export const calmStore = {
  subscribe(listener: () => void) {
    listeners.add(listener)
    const media = window.matchMedia(QUERY)
    const onChange = () => {
      current = read()
      apply(current)
      notify()
    }
    media.addEventListener('change', onChange)
    return () => {
      listeners.delete(listener)
      media.removeEventListener('change', onChange)
    }
  },
  get(): boolean {
    if (current === null) current = read()
    return current
  },
  getServer(): boolean {
    return false
  },
  set(value: boolean) {
    current = value
    try {
      localStorage.setItem(KEY, value ? '1' : '0')
    } catch {
      // pas grave : le choix vaut pour cette visite
    }
    apply(value)
    notify()
  },
  toggle() {
    calmStore.set(!calmStore.get())
  },
}

export function useCalm(): boolean {
  return useSyncExternalStore(calmStore.subscribe, calmStore.get, calmStore.getServer)
}

/** Script inline exécuté avant le rendu : évite tout flash d'animation en mode calme. */
export const bootScript = `(function(){try{var d=document.documentElement;var v=localStorage.getItem('${KEY}');var c=v==='1'||(v!=='0'&&matchMedia('${QUERY}').matches);d.dataset.calm=c?'true':'false';if(sessionStorage.getItem('skavyoy:booted'))d.dataset.booted='true';d.dataset.js='true'}catch(e){}})();`
