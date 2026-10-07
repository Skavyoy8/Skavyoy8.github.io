'use client'

import { m } from 'motion/react'

/** Transition d'entrée : un rideau qui se retire vers le haut, puis le contenu se pose. */
export function PageEnter() {
  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[75] origin-top bg-surface"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
    />
  )
}
