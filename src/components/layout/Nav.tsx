'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ArrowIcon, Wordmark } from '@/components/ui/Primitives'
import { navCopy, navLinks, sections } from '@/content/nav'
import { site } from '@/content/site'
import { calmStore, useCalm } from '@/lib/calm'
import { emit } from '@/lib/events'
import { Menu } from './Menu'

const iconButton = 'grid size-9 place-items-center rounded-xl border border-line text-fg/70 transition-colors hover:border-white/20 hover:text-fg'

/** Barre flottante en verre : le pseudo, les sections, puis terminal, mode calme et contact. */
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
      <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
        <nav aria-label="Navigation principale" className="container-x">
          <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border border-line bg-[#0b0b0d]/75 pr-3 pl-5 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)] backdrop-blur-xl sm:pl-7">
            <Link href="/#accueil" aria-label={`${site.name}, accueil`}>
              <Wordmark />
            </Link>

            <ul className="hidden items-center gap-8 lg:flex">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    aria-current={isHome && current === link.id ? 'location' : undefined}
                    className="relative py-2 text-[0.875rem] text-fg/60 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-500 hover:text-fg aria-[current=location]:text-fg aria-[current=location]:after:scale-x-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
                className="group ml-1 hidden items-center gap-3 rounded-xl border border-line-strong bg-white/[0.03] px-4 py-2 text-[0.85rem] font-medium transition-colors hover:border-white/25 hover:bg-white/[0.06] sm:inline-flex"
              >
                {navCopy.cta}
                <ArrowIcon className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
