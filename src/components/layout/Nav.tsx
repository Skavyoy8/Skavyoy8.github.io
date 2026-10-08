'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LogoMark, Wordmark } from '@/components/ui/Primitives'
import { navCopy, navLinks, sections } from '@/content/nav'
import { site } from '@/content/site'
import { calmStore, useCalm } from '@/lib/calm'
import { emit } from '@/lib/events'
import { Menu } from './Menu'

const iconButton = 'grid size-9 place-items-center rounded-full border border-line text-fg/70 transition-colors hover:border-white/20 hover:text-fg'

/** Barre fixe sur toute la largeur : le logo, les sections numérotées, puis terminal, mode calme et contact. */
export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const calm = useCalm()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>(sections[0].id)
  const menuButton = useRef<HTMLButtonElement>(null)

  // Section courante : la bande centrale de l'écran décide.
  useEffect(() => {
    if (!isHome) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [isHome])

  const close = () => {
    setOpen(false)
    menuButton.current?.focus()
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/75 backdrop-blur-xl">
        <nav aria-label="Navigation principale" className="container-x">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/#accueil" aria-label={`${site.name}, accueil`} className="flex items-center gap-3">
              <LogoMark className="size-7" />
              <Wordmark className="text-[1.1rem]" />
            </Link>

            <ul className="hidden items-center gap-7 lg:flex">
              {navLinks.map((link) => {
                const index = sections.find((section) => section.id === link.id)?.index
                return (
                  <li key={link.id}>
                    <Link
                      href={`/#${link.id}`}
                      aria-current={isHome && current === link.id ? 'location' : undefined}
                      className="group flex items-baseline gap-1.5 text-[0.875rem] text-fg/60 transition-colors duration-300 hover:text-fg aria-[current=location]:text-fg"
                    >
                      <span className="mono text-[0.65rem] text-muted transition-colors group-aria-[current=location]:text-accent" aria-hidden="true">
                        {index}
                      </span>
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => emit('terminal:toggle')}
                className={`${iconButton} hidden md:grid`}
                aria-label={navCopy.terminalLabel}
                aria-keyshortcuts="Control+K Meta+K"
                title={`${navCopy.terminalLabel} (${navCopy.terminalHint})`}
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3 4.5 3.5 3.5L3 11.5M8.5 12H13" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => calmStore.toggle()}
                aria-pressed={calm}
                aria-label={calm ? navCopy.calmOn : navCopy.calmOff}
                title={navCopy.calmLabel}
                className={`${iconButton} ${calm ? 'border-accent/50 text-accent' : ''}`}
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  {calm ? <path d="M2 8h12" /> : <path d="M1.5 8c1.6-3.4 3.2-3.4 4.8 0s3.2 3.4 4.8 0 2.4-2.6 3.4-1.4" />}
                </svg>
              </button>
              <Link
                href="/#reseaux"
                className="ml-1 hidden rounded-full bg-accent px-4 py-2 text-[0.85rem] font-semibold text-ink transition-colors hover:bg-[#d8ff6a] sm:inline-flex"
              >
                {navCopy.cta}
              </Link>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={open}
                aria-controls="menu-principal"
                aria-label={navCopy.menu}
                className={`${iconButton} lg:hidden`}
              >
                <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 5.5h10M3 10.5h10" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
      <Menu open={open} onClose={close} current={current} />
    </>
  )
}
