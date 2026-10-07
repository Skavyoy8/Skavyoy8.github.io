'use client'

import { useSyncExternalStore } from 'react'

let now = 0
const listeners = new Set<() => void>()
let timer: ReturnType<typeof setInterval> | null = null

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (!timer) {
    now = Date.now()
    timer = setInterval(() => {
      now = Date.now()
      for (const l of listeners) l()
    }, 1000)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && timer) {
      clearInterval(timer)
      timer = null
    }
  }
}

/** Horloge partagée (une seule minuterie pour toute la page). 0 côté serveur. */
export function useNow(): number {
  return useSyncExternalStore(
    subscribe,
    () => now || Date.now(),
    () => 0,
  )
}

const parisTime = new Intl.DateTimeFormat('fr-FR', {
  timeZone: 'Europe/Paris',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
})

export function formatParisTime(timestamp: number): string {
  return timestamp ? parisTime.format(timestamp) : '--:--:--'
}
