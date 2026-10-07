'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { LogoMark, StatusDot } from '@/components/ui/Primitives'
import { navCopy, navLinks, sections } from '@/content/nav'
import { site } from '@/content/site'
import { calmStore, useCalm } from '@/lib/calm'
import { emit } from '@/lib/events'
import { gsap, useGSAP } from '@/lib/gsap'
import { Menu } from './Menu'

const iconButton = 'grid size-8 place-items-center rounded-full border border-white/[0.08] bg-black/30 text-fg/75 transition-colors hover:border-white/20 hover:text-fg'

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const calm = useCalm()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>(sections[0].id)
  const headerRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
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

  // Fond de la barre : transparent en haut, verre fumé dès qu'on descend.
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const update = () => {
      header.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false'
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useGSAP(
    () => {
      if (!barRef.current) return
      gsap.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } })
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  const close = () => {
    setOpen(false)
    menuButton.current?.focus()
  }

  return (
    <>
      <header ref={headerRef} data-scrolled="false" className="group/nav fixed inset-x-0 top-0 z-50">
        <div
          className="glass-blur absolute inset-0 border-b border-white/[0.06] opacity-0 transition-opacity duration-700 group-data-[scrolled=true]/nav:opacity-100"
          aria-hidden="true"
        />
        <div
          ref={barRef}
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent/70"
          role="progressbar"
          aria-label={navCopy.progressLabel}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <nav aria-label="Navigation principale" className="container-x relative flex h-(--header-h) items-center justify-between gap-4">
          <Link href="/#accueil" className="flex items-center gap-2.5 text-[15px] font-medium tracking-tight" aria-label={`${site.name}, accueil`}>
            <LogoMark />
            {site.name}
          </Link>

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/#${link.id}`}
                  aria-current={isHome && current === link.id ? 'location' : undefined}
                  className="text-[13px] text-fg/55 transition-colors duration-300 hover:text-fg aria-[current=location]:text-fg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <span className="mono mr-1.5 hidden items-center gap-2 rounded-full border border-white/[0.08] bg-black/30 px-3 py-1.5 text-fg/80 2xl:inline-flex">
              <StatusDot /> {navCopy.status}
            </span>
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
              className="btn-lime ml-1.5 hidden rounded-full bg-accent px-4 py-1.5 text-[13px] font-medium text-ink transition-colors hover:bg-[#d8ff6a] sm:inline-flex"
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
              className={`${iconButton} ml-1.5`}
            >
              <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M3 5.5h10M3 10.5h10" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <Menu open={open} onClose={close} current={current} />
    </>
  )
}
