'use client'

import { type ReactNode, useState } from 'react'
import { about } from '@/content/about'
import { HoloCard } from './HoloCard'

/**
 * Badge d'accès : carte holographique qui s'incline sous la souris
 * et se retourne d'un clic (recto identité, verso infos rapides).
 */
export function BadgeFlip({ front, back }: { front: ReactNode; back: ReactNode }) {
  const [flipped, setFlipped] = useState(false)
  const toggle = () => setFlipped((f) => !f)

  return (
    <div className="flex flex-col items-center" data-badge data-flipped={flipped ? 'true' : 'false'}>
      <HoloCard className="rounded-[18px]">
        <div className="badge-flip" onClick={toggle}>
          <div className="badge-face" aria-hidden={flipped ? true : undefined}>
            {front}
          </div>
          <div className="badge-face badge-face-back" aria-hidden={flipped ? undefined : true}>
            {back}
          </div>
        </div>
      </HoloCard>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        className="mono mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 transition-colors hover:bg-white/[0.09]"
      >
        <span aria-hidden="true">↻</span> {about.badge.flip}
      </button>
      <p className="mono mt-3 text-muted">{about.badge.hint}</p>
    </div>
  )
}
