'use client'

import { LayoutGroup, m } from 'motion/react'
import { useState } from 'react'
import { CardBar } from '@/components/ui/Primitives'
import { demos } from '@/content/pillars'

const EASE = [0.16, 1, 0.3, 1] as const

/** Linux & systèmes : la même pile, aujourd'hui sur VirtualBox, demain sur Proxmox. */
export function VirtDemo() {
  const d = demos.virt
  const [when, setWhen] = useState<'today' | 'tomorrow'>('today')
  const stack = d.stacks[when]

  return (
    <div className="glass p-6 sm:p-7">
      <CardBar
        title={d.title}
        meta={
          <span role="group" aria-label={d.toggleLabel} className="inline-flex rounded-full border border-white/10 p-0.5">
            {(['today', 'tomorrow'] as const).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={when === key}
                onClick={() => setWhen(key)}
                className={`relative rounded-full px-3 py-1 transition-colors ${when === key ? 'text-ink' : 'text-muted hover:text-fg'}`}
              >
                {when === key ? <m.span layoutId="virt-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ duration: 0.5, ease: EASE }} /> : null}
                {key === 'today' ? d.today : d.tomorrow}
              </button>
            ))}
          </span>
        }
      />
      <LayoutGroup>
        <m.div layout className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-3" transition={{ duration: 0.6, ease: EASE }}>
          <p className="mono flex justify-between px-1 text-muted">
            <span>{d.host}</span>
            <span className="text-fg/85">{stack.host}</span>
          </p>
          <m.div layout className="mt-3 rounded-xl border border-accent/30 bg-accent/[0.05] p-3" transition={{ duration: 0.6, ease: EASE }}>
            <p className="mono flex justify-between px-1 text-muted">
              <span>{d.hypervisor}</span>
              <span className="text-accent">{stack.hypervisor}</span>
            </p>
            <m.ul layout className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" transition={{ duration: 0.6, ease: EASE }}>
              {stack.guests.map((guest, i) => (
                <m.li
                  key={`${when}-${i}`}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
                  className="tile h-16 rounded-xl px-2 text-center text-[11px]"
                >
                  {guest}
                </m.li>
              ))}
            </m.ul>
          </m.div>
        </m.div>
      </LayoutGroup>
      <p className="mono mt-6 text-muted">{d.footer}</p>
    </div>
  )
}
