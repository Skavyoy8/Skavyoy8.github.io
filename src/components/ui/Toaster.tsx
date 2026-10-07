'use client'

import { AnimatePresence, m } from 'motion/react'
import { useEffect, useState } from 'react'
import { on } from '@/lib/events'

type Toast = { id: number; message: string }
let nextId = 0

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(
    () =>
      on('toast', ({ message }) => {
        const id = ++nextId
        setToasts((list) => [...list.slice(-2), { id, message }])
        window.setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3200)
      }),
    [],
  )

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[80] flex flex-col items-center gap-2 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <m.p
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/90 px-4 py-2 font-mono text-xs text-fg backdrop-blur-md"
          >
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {t.message}
          </m.p>
        ))}
      </AnimatePresence>
    </div>
  )
}
