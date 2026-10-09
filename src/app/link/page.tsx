import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowIcon } from '@/components/ui/Primitives'
import { linkPage, socials } from '@/content/links'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'

export const metadata: Metadata = {
  title: linkPage.title,
  description: `${linkPage.intro} ${site.name}, ${site.tagline}`,
  alternates: { canonical: './link/' },
}

/** Page de liens (le profil GitHub de Luke pointe vers /link/). */
export default function LinkPage() {
  return (
    <main id="contenu" tabIndex={-1} className="relative z-10 grid min-h-svh place-items-center px-(--gutter) py-28 outline-none">
      <div className="relative w-full max-w-md">
        <div className="flex items-center gap-4">
          <Image src={asset(site.avatar)} alt={`Avatar de ${site.name}`} width={64} height={64} className="size-16 rounded-full border border-line-strong object-cover grayscale" />
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {site.name}
              <span className="text-accent">.</span>
            </h1>
            <p className="label text-muted">{site.status} · {site.location}</p>
          </div>
        </div>
        <p className="mt-6 text-pretty text-muted">{site.tagline}</p>
        <ul className="mt-8 space-y-3">
          <li>
            <Link href="/" className="group flex items-center justify-between rounded-lg bg-fg px-5 py-4 font-medium text-bg transition-colors hover:bg-accent">
              {linkPage.home}
              <ArrowIcon className="size-4" />
            </Link>
          </li>
          {socials.map((link) => (
            <li key={link.id}>
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg border border-line-strong px-5 py-4 transition-colors hover:border-accent"
                >
                  <span>
                    {link.label} <span className="ml-2 font-mono text-sm text-muted">{link.handle}</span>
                  </span>
                  <ArrowIcon className="size-4" />
                </a>
              ) : (
                <span className="flex items-center justify-between rounded-lg border border-line px-5 py-4">
                  <span>{link.label}</span>
                  <span className="font-mono text-sm text-muted">{link.handle}</span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
