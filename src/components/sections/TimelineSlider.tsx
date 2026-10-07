'use client'

import { AnimatePresence, m } from 'motion/react'
import { useId, useState } from 'react'
import { buttonPrimary, CardBar } from '@/components/ui/Primitives'
import { timeline, timelineSlider } from '@/content/timeline'

const EASE = [0.16, 1, 0.3, 1] as const

/** « Glisse dans le temps » : un curseur par année scolaire, la carte de droite suit. */
export function TimelineSlider() {
  const id = useId()
  const [index, setIndex] = useState(0)
  const stops = timelineSlider.stops
  const stop = stops[index]!
  const step = timeline[stop.step]!
  const max = stops.length - 1

  return (
    <div className="glass grid gap-px overflow-hidden lg:grid-cols-[1fr_22rem]" data-reveal="fade">
      <div className="p-6 sm:p-8">
        <CardBar title={timelineSlider.kicker} />
        <p className="mt-4 text-[1.35rem] font-medium tracking-tight">{timelineSlider.question}</p>
        <div className="relative mt-10">
          <label htmlFor={id} className="sr-only">
            {timelineSlider.label}
          </label>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full bg-white/[0.06]" aria-hidden="true">
            <span className="block h-full rounded-full bg-gradient-to-r from-accent/40 to-accent transition-[width] duration-500" style={{ width: `${(index / max) * 100}%` }} />
          </div>
          <input
            id={id}
            type="range"
            min={0}
            max={max}
            step={1}
            value={index}
            onChange={(event) => setIndex(Number(event.target.value))}
            aria-valuetext={`${stop.year} : ${step.title}`}
            className="timeline-range relative w-full cursor-pointer appearance-none bg-transparent"
          />
        </div>
        <ol className="mono mt-4 flex justify-between text-muted" aria-hidden="true">
          {stops.map((s, i) => (
            <li key={s.year} className={i === index ? 'text-fg' : ''}>
              {s.year}
            </li>
          ))}
        </ol>
      </div>
      <div className="flex flex-col border-t border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 lg:border-t-0 lg:border-l" aria-live="polite">
        <p className="mono text-muted">{index === 0 ? timelineSlider.current : stop.year}</p>
        <AnimatePresence mode="wait" initial={false}>
          <m.div key={index} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4, ease: EASE }}>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</p>
            <p className="mono mt-1 text-muted">
              {stop.note}
              {step.age && stop.step === 0 ? ` · ${step.age}` : ''}
            </p>
          </m.div>
        </AnimatePresence>
        <a href="#reseaux" className={`${buttonPrimary} mt-8 justify-center`}>
          {timelineSlider.cta}
        </a>
      </div>
    </div>
  )
}
