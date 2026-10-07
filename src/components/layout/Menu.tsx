'use client'

import Link from 'next/link'
import { type KeyboardEvent, useEffect, useRef } from 'react'
import { delay, Wordmark } from '@/components/ui/Primitives'
import { navCopy, sections } from '@/content/nav'

/** Menu plein écran (téléphone et tablette) : la liste des sections. */
export function Menu({ open, onClose, current }: { open: boolean; onClose: () => void; current: string }) {
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLElement>('a, button')?.focus()
    return () => {
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

  if (!open) return null
  return (
    <div
      ref={panel}
      id="menu-principal"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      onKeyDown={onKeyDown}
      className="overlay-in fixed inset-0 z-[70] flex flex-col bg-bg/[0.97]"
    >
      <div className="container-x flex h-[5.5rem] shrink-0 items-center justify-between pt-3">
        <Wordmark className="pl-5" />
        <button type="button" onClick={onClose} className="mono mr-3 rounded-xl border border-line-strong px-4 py-2 hover:bg-white/5">
          {navCopy.close}
        </button>
      </div>
      <nav aria-label="Sections" className="container-x flex flex-1 flex-col justify-center overflow-y-auto py-8">
        <ul>
          {sections.map((section, i) => (
            <li key={section.id} className="fade-up" style={delay(0.05 + i * 0.04)}>
              <Link
                href={`/#${section.id}`}
                onClick={onClose}
                aria-current={current === section.id ? 'location' : undefined}
                className="flex items-baseline gap-4 py-1 text-[clamp(2rem,8vw,3.5rem)] leading-[1.1] font-medium tracking-[-0.05em] text-fg/45 transition-colors hover:text-fg focus-visible:text-fg aria-[current=location]:text-fg"
              >
                <span className="mono w-7 shrink-0 text-accent/80">{section.index}</span>
                {section.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
