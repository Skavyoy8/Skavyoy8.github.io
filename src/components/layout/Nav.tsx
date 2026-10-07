'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { navCopy, sections } from '@/content/nav'
import { site } from '@/content/site'
import { calmStore, useCalm } from '@/lib/calm'
import { emit } from '@/lib/events'
import { gsap, useGSAP } from '@/lib/gsap'
import { scrambleTo } from '@/lib/scramble'
import { Menu } from './Menu'

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const calm = useCalm()
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<string>(sections[0].id)
  const labelRef = useRef<HTMLSpanElement>(null)
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

  // Le libellé se « décrypte » à chaque changement de section.
  useEffect(() => {
    const el = labelRef.current
    if (!el) return
    const section = sections.find((s) => s.id === current)
    if (!section) return
    return scrambleTo(el, `${section.index} / ${section.label}`)
  }, [current])

  useGSAP(
    () => {
      if (!barRef.current) return
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } },
      )
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  const close = () => {
    setOpen(false)
    menuButton.current?.focus()
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 text-white mix-blend-difference">
        <div
          ref={barRef}
          className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-white"
          role="progressbar"
          aria-label={navCopy.progressLabel}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <nav aria-label="Navigation principale" className="container-x flex h-(--header-h) items-center justify-between gap-4">
          <Link href="/#accueil" className="pointer-events-auto text-lg font-semibold tracking-tight" aria-label={`${site.name}, accueil`}>
            {site.name}
            <span className="text-accent">.</span>
          </Link>
          <span className="label hidden min-w-[16ch] text-center md:block" aria-hidden="true">
            <span ref={labelRef}>{isHome ? '00 / Accueil' : '03 / Lab'}</span>
          </span>
          <div className="pointer-events-auto flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => emit('terminal:toggle')}
              className="label hidden rounded-full border border-white/25 px-3 py-1.5 transition-colors hover:border-white sm:inline-flex"
              aria-label={navCopy.terminalLabel}
              aria-keyshortcuts="Control+K Meta+K"
            >
              {navCopy.terminalHint}
            </button>
            <button
              type="button"
              onClick={() => calmStore.toggle()}
              aria-pressed={calm}
              title={navCopy.calmLabel}
              className="label flex items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 transition-colors hover:border-white"
            >
              <span className={`size-1.5 rounded-full ${calm ? 'bg-white' : 'border border-white'}`} aria-hidden="true" />
              <span className="hidden sm:inline">{calm ? navCopy.calmOn : navCopy.calmOff}</span>
              <span className="sm:hidden">Calme</span>
            </button>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="menu-principal"
              className="label rounded-full bg-white px-4 py-1.5 text-black"
            >
              {navCopy.menu}
            </button>
          </div>
        </nav>
      </header>
      <Menu open={open} onClose={close} current={current} />
    </>
  )
}
