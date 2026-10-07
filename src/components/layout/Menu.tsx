'use client'

import { AnimatePresence, m } from 'motion/react'
import Link from 'next/link'
import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { navCopy, sections } from '@/content/nav'
import { site } from '@/content/site'
import { getLenis } from '@/lib/scroll'

const EASE = [0.16, 1, 0.3, 1] as const

export function Menu({ open, onClose, current }: { open: boolean; onClose: () => void; current: string }) {
  const panel = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const preview = sections.find((s) => s.id === (hovered ?? current)) ?? sections[0]

  useEffect(() => {
    if (!open) return
    const lenis = getLenis()
    lenis?.stop()
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a, button')
    first?.focus()
    return () => {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [open])

  // Piège de focus + Échap.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose()
      return
    }
    if (event.key !== 'Tab' || !panel.current) return
    const focusables = Array.from(panel.current.querySelectorAll<HTMLElement>('a[href], button'))
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (!first || !last) return
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          ref={panel}
          id="menu-principal"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-[70] flex flex-col bg-surface"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(100% 0 0% 0)' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="container-x flex h-(--header-h) shrink-0 items-center justify-between">
            <span className="text-lg font-semibold tracking-tight">
              {site.name}
              <span className="text-accent">.</span>
            </span>
            <button type="button" onClick={onClose} className="label rounded-full border border-line-strong px-4 py-1.5 hover:border-fg">
              {navCopy.close}
            </button>
          </div>
          <div className="container-x grid min-h-0 flex-1 grid-cols-4 gap-x-(--gutter) lg:grid-cols-12">
            <nav aria-label="Sections" className="col-span-4 flex flex-col justify-center overflow-y-auto py-6 lg:col-span-8" data-lenis-prevent>
              <ul>
                {sections.map((section, i) => (
                  <li key={section.id} className="overflow-hidden">
                    <m.div
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        href={`/#${section.id}`}
                        onClick={onClose}
                        onMouseEnter={() => setHovered(section.id)}
                        onFocus={() => setHovered(section.id)}
                        aria-current={current === section.id ? 'location' : undefined}
                        className="group flex items-baseline gap-4 py-0.5 text-[clamp(2.25rem,6.2vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.05em] text-fg/40 transition-colors duration-500 hover:text-fg focus-visible:text-fg aria-[current=location]:text-fg"
                      >
                        <span className="label w-8 shrink-0 text-muted">{section.index}</span>
                        <span className="transition-transform duration-500 ease-signal group-hover:translate-x-3">{section.label}</span>
                      </Link>
                    </m.div>
                  </li>
                ))}
              </ul>
            </nav>
            <aside className="relative col-span-4 hidden flex-col justify-end pb-12 lg:flex" aria-hidden="true">
              <AnimatePresence mode="wait">
                <m.div
                  key={preview.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <p className="text-[9rem] leading-none font-semibold tracking-[-0.06em] text-accent">{preview.index}</p>
                  <p className="mt-4 max-w-xs text-lg text-muted">{preview.preview}</p>
                </m.div>
              </AnimatePresence>
            </aside>
          </div>
          <p className="container-x label pb-6 text-muted">Échap pour fermer · ⌘K pour le terminal</p>
        </m.div>
      ) : null}
    </AnimatePresence>
  )
}
