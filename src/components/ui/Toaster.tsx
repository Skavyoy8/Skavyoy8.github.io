'use client'

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
      {toasts.map((t) => (
        <p key={t.id} className="dialog-in flex items-center gap-2.5 rounded-full border border-line-strong bg-surface px-4 py-2 font-mono text-xs text-fg">
          <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
          {t.message}
        </p>
      ))}
    </div>
  )
}
