import type { ReactNode } from 'react'
import { Ambient } from '@/components/layout/Ambient'
import { Footer } from '@/components/layout/Footer'
import { Nav } from '@/components/layout/Nav'
import { RevealObserver } from '@/components/layout/RevealObserver'
import { Terminal } from '@/components/ui/Terminal'
import { Toaster } from '@/components/ui/Toaster'

/**
 * Habillage sombre des pages secondaires (détail du lab, /link/) : fond animé, barre, pied de page, terminal.
 * L'accueil « Atelier » a son propre en-tête et pied de page, il n'utilise pas ce layout.
 */
export default function LegacyLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Ambient />
      <div className="progress" aria-hidden="true" />
      <Nav />
      {children}
      <Footer />
      <Terminal />
      <Toaster />
      <RevealObserver />
    </>
  )
}
