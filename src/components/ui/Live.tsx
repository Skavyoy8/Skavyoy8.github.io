'use client'

import { formatParisTime, useNow } from '@/hooks/useNow'

export function ParisTime({ className = '' }: { className?: string }) {
  const now = useNow()
  return (
    <time className={`tabular-nums ${className}`} dateTime={now ? new Date(now).toISOString() : undefined}>
      {formatParisTime(now)}
    </time>
  )
}
