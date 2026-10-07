'use client'

import { useId, useMemo, useState } from 'react'
import { CardBar } from '@/components/ui/Primitives'
import { demos } from '@/content/pillars'

const W = 600
const H = 200
const PERIODS = 2
const y = (x: number) => H / 2 - Math.sin((x / W) * PERIODS * Math.PI * 2) * (H * 0.36)

// Le signal analogique : une sinusoïde continue, calculée une fois.
const analog = Array.from({ length: 121 }, (_, i) => {
  const x = (i / 120) * W
  return `${i ? 'L' : 'M'}${x.toFixed(1)} ${y(x).toFixed(1)}`
}).join('')

/** Électronique & signal : on échantillonne une onde et on voit le numérique apparaître. */
export function SignalDemo() {
  const d = demos.signal
  const id = useId()
  const [samples, setSamples] = useState(8)

  const { points, steps } = useMemo(() => {
    const count = samples * PERIODS
    const pts = Array.from({ length: count + 1 }, (_, i) => {
      const x = (i / count) * W
      return [x, y(x)] as const
    })
    // Bloqueur d'ordre zéro : chaque valeur est tenue jusqu'à l'échantillon suivant.
    const path = pts.map(([x, v], i) => (i ? `H${x.toFixed(1)}V${v.toFixed(1)}` : `M${x.toFixed(1)} ${v.toFixed(1)}`)).join('')
    return { points: pts, steps: path }
  }, [samples])

  return (
    <div className="glass p-6 sm:p-7">
      <CardBar title={d.title} meta={d.meta} />
      <svg viewBox={`-8 -8 ${W + 16} ${H + 16}`} className="mt-6 w-full" role="img" aria-label={`${d.analog} et ${d.digital} : ${d.footer(samples)}`}>
        <line x1="0" x2={W} y1={H / 2} y2={H / 2} stroke="rgb(255 255 255 / .08)" />
        <path d={analog} fill="none" stroke="rgb(237 237 239 / .45)" strokeWidth="1.5" />
        <path d={steps} fill="none" stroke="#c8ff2e" strokeWidth="1.6" strokeLinejoin="round" />
        {points.map(([x, v]) => (
          <g key={x}>
            <line x1={x} x2={x} y1={H / 2} y2={v} stroke="rgb(200 255 46 / .25)" />
            <circle cx={x} cy={v} r="3.2" fill="#c8ff2e" />
          </g>
        ))}
      </svg>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <label htmlFor={id} className="mono text-muted">
          {d.sliderLabel}
        </label>
        <input
          id={id}
          type="range"
          min={2}
          max={24}
          value={samples}
          onChange={(event) => setSamples(Number(event.target.value))}
          className="h-1 flex-1 cursor-pointer accent-[#c8ff2e]"
        />
        <output htmlFor={id} className="mono w-6 text-right text-accent">
          {samples}
        </output>
      </div>
      <p className="mono mt-5 flex gap-5 text-muted">
        <span className="flex items-center gap-2">
          <span className="h-px w-4 bg-fg/50" aria-hidden="true" /> {d.analog}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-px w-4 bg-accent" aria-hidden="true" /> {d.digital}
        </span>
      </p>
    </div>
  )
}
