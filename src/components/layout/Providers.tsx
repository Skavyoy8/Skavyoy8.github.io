'use client'

import { type ReactNode, useEffect } from 'react'

/** Marque la page comme hydratée (utile aux tests) ; le reste du site n'a besoin d'aucun contexte. */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.hydrated = 'true'
  }, [])
  return <>{children}</>
}
