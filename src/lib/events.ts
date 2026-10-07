'use client'

type EventMap = {
  'terminal:toggle': undefined
  toast: { message: string }
}

export function emit<K extends keyof EventMap>(name: K, ...detail: EventMap[K] extends undefined ? [] : [EventMap[K]]) {
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
