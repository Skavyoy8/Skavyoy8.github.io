'use client'

import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { homelab } from '@/content/homelab'
import { useCalm } from '@/lib/calm'

const EASE = [0.16, 1, 0.3, 1] as const
const links = homelab.links

/** Journal du panneau : les liaisons prévues défilent, la plus récente arrive en haut. */
export function NetworkLog() {
  const calm = useCalm()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (calm) return
    const id = window.setInterval(() => setOffset((o) => (o + 1) % links.length), 3200)
    return () => window.clearInterval(id)
  }, [calm])

  const rows = [0, 1, 2].map((i) => links[(offset + links.length - i) % links.length]!)

  return (
    <ul className="mt-3 space-y-1.5 font-mono text-[11.5px]">
      <AnimatePresence initial={false} mode="popLayout">
        {rows.map((link, i) => (
          <m.li
            key={link.from}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3 text-muted"
          >
            <span className={`size-1.5 rounded-full ${i === 0 ? 'bg-accent shadow-[0_0_8px_#c8ff2e]' : 'bg-white/25'}`} aria-hidden="true" />
            <span className="truncate">
              <span className={i === 0 ? 'text-fg/90' : 'text-fg/60'}>{link.from}</span> → {link.to}
            </span>
            <span className={link.speed === '10G' ? 'text-accent' : ''}>{link.speed}</span>
          </m.li>
        ))}
      </AnimatePresence>
    </ul>
  )
}
