import type { CSSProperties } from 'react'
import { CardBar } from '@/components/ui/Primitives'
import { demos } from '@/content/pillars'

/** Cybersécurité : la méthode d'une room, en cascade d'étapes. */
export function EnumDemo() {
  const d = demos.enum
  return (
    <div className="glass p-6 sm:p-7">
      <CardBar title={d.title} meta={d.meta} />
      <ul className="mt-7 space-y-4" data-bars>
        {d.steps.map((step, i) => (
          <li key={step.cmd} className="grid grid-cols-[1rem_8.5rem_1fr] items-center gap-3 sm:grid-cols-[1rem_10rem_1fr_6rem]">
            <svg viewBox="0 0 12 12" className="size-3 text-accent" aria-hidden="true">
              <path d="M2 6.4 4.7 9 10 3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <span className="mono truncate text-fg/90">{step.cmd}</span>
            <span className="relative h-2 rounded-full bg-white/[0.04]">
              <span
                className="absolute inset-y-0 origin-left rounded-full bg-accent shadow-[0_0_14px_-2px_#c8ff2e]"
                style={{ left: `${i * 24}%`, width: `${30 - i * 4}%`, opacity: 1 - i * 0.18 }}
                data-bar
              />
            </span>
            <span className="mono hidden text-right text-muted sm:block">{step.note}</span>
          </li>
        ))}
        <li className="grid grid-cols-[1rem_8.5rem_1fr] items-center gap-3 sm:grid-cols-[1rem_10rem_1fr_6rem]">
          <svg viewBox="0 0 12 12" className="size-3 text-muted" aria-hidden="true">
            <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M6 3.5V6l1.6 1" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="mono text-muted">{d.done}</span>
          <span className="relative h-2 rounded-full bg-white/[0.04]">
            <span className="absolute inset-y-0 left-[78%] w-[16%] origin-left rounded-full bg-[repeating-linear-gradient(90deg,#c8ff2e_0_3px,transparent_3px_6px)] opacity-70" data-bar />
          </span>
          <span className="mono hidden text-right text-accent sm:block">✓</span>
        </li>
      </ul>
      <div className="mt-6 grid grid-cols-[1rem_8.5rem_1fr] gap-3 sm:grid-cols-[1rem_10rem_1fr_6rem]" aria-hidden="true">
        <span />
        <span />
        <span className="mono flex justify-between border-t border-white/[0.06] pt-2 text-[11px] text-muted">
          {d.axis.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </span>
      </div>
      <p className="mono mt-6 text-muted">{d.footer}</p>
    </div>
  )
}

/** Réseaux : les sept couches, un paquet les traverse. */
export function OsiDemo() {
  const d = demos.osi
  return (
    <div className="glass p-6 sm:p-7">
      <CardBar title={d.title} meta={d.meta} />
      <ol className="mt-6 space-y-1.5">
        {d.layers.map((layer, i) => (
          <li
            key={layer.n}
            className="osi-row grid grid-cols-[1.5rem_1fr_auto] items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
            style={{ '--i': i } as CSSProperties}
          >
            <span className="osi-n mono text-muted">{layer.n}</span>
            <span className="text-[14px]">{layer.name}</span>
            <span className="mono text-[11px] text-muted">{layer.proto}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
