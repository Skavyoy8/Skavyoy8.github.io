'use client'

import type { RoomCategory } from '@/content/tryhackme'

type EventMap = {
  'rooms:filter': { category: RoomCategory | 'all' }
  'terminal:toggle': undefined
  toast: { message: string }
  'preloader:done': undefined
  konami: undefined
}

/** Drapeaux d'événements « une fois » (pour un composant monté après coup). */
export const flags = { preloaderDone: false }

export function emit<K extends keyof EventMap>(name: K, ...detail: EventMap[K] extends undefined ? [] : [EventMap[K]]) {
  if (name === 'preloader:done') flags.preloaderDone = true
  window.dispatchEvent(new CustomEvent(name, { detail: detail[0] }))
}

export function on<K extends keyof EventMap>(name: K, handler: (detail: EventMap[K]) => void) {
  const listener = (event: Event) => handler((event as CustomEvent<EventMap[K]>).detail)
  window.addEventListener(name, listener)
  return () => window.removeEventListener(name, listener)
}

export function toast(message: string) {
  emit('toast', { message })
}
