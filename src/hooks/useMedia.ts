'use client'

import { useSyncExternalStore } from 'react'

/** Media query sans setState dans un effet ; faux côté serveur. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useIsTouch = () => useMediaQuery('(hover: none), (pointer: coarse)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')

const subscribeNothing = () => () => {}

/** Vrai une fois hydraté côté client. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  )
}
