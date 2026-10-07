'use client'

import { ArrowIcon } from '@/components/ui/Primitives'
import type { Pillar } from '@/content/pillars'
import { emit } from '@/lib/events'
import { scrollToTarget } from '@/lib/scroll'

const linkClass = 'group mono inline-flex items-center gap-2 text-fg/85 transition-colors hover:text-accent'

export function PillarLink({ link }: { link: Pillar['link'] }) {
  const { filter } = link
  if (!filter) {
    return (
      <a href={link.href} className={linkClass}>
        {link.label}
        <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </a>
    )
  }
  return (
    <button
      type="button"
      className={linkClass}
      onClick={() => {
        emit('rooms:filter', { category: filter })
        scrollToTarget('#rooms')
      }}
    >
      {link.label}
      <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}
