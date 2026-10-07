import Link from 'next/link'
import { ArrowIcon, buttonPrimary } from '@/components/ui/Primitives'

export default function NotFound() {
  return (
    <main id="contenu" tabIndex={-1} className="relative z-10 grid min-h-svh place-items-center px-(--gutter) outline-none">
      <div className="signal-fallback" aria-hidden="true" />
      <div className="relative text-center">
        <p className="label text-accent">Erreur 404 · signal perdu</p>
        <h1 className="text-mega mt-4">404</h1>
        <p className="mt-6 text-muted">Cette page n’existe pas, ou plus.</p>
        <Link href="/" className={`${buttonPrimary} mt-10`}>
          Retour à l’accueil <ArrowIcon className="size-4" />
        </Link>
      </div>
    </main>
  )
}
