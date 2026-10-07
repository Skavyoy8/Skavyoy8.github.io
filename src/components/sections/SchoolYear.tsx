'use client'

import { useSyncExternalStore } from 'react'
import { CardBar } from '@/components/ui/Primitives'
import { schoolYear } from '@/content/timeline'
import { parcoursCopy } from '@/content/tryhackme'

const DAY = 86_400_000
const start = Date.parse(`${schoolYear.start}T00:00:00Z`)
const end = Date.parse(`${schoolYear.end}T00:00:00Z`)
// Semaines du lundi au dimanche, à partir du lundi de la semaine de rentrée.
const firstMonday = start - ((new Date(start).getUTCDay() + 6) % 7) * DAY
const weekCount = Math.ceil((end - firstMonday) / (7 * DAY))

type Week = { index: number; month: number }
// Chaque semaine va dans le mois de son jeudi ; les jours de juillet rejoignent juin.
const weeks: Week[] = Array.from({ length: weekCount }, (_, index) => {
  const thursday = new Date(firstMonday + (index * 7 + 3) * DAY)
  const month = (thursday.getUTCMonth() + 12 - 8) % 12
  return { index, month: Math.min(month, 9) }
})
const columns = parcoursCopy.months.map((label, month) => ({ label, weeks: weeks.filter((w) => w.month === month) }))

// La date du jour n'existe que côté navigateur (le site est exporté en statique).
const subscribe = () => () => {}
const today = () => Math.floor(Date.now() / DAY) * DAY
const serverToday = () => null

export function SchoolYear() {
  const now = useSyncExternalStore(subscribe, today, serverToday)
  const current = now === null ? -1 : Math.floor((now - firstMonday) / (7 * DAY))
  const progress = now === null ? 0 : Math.min(Math.max((now - start) / (end - start), 0), 1)
  const d = parcoursCopy.dashboard
  const radius = 54
  const circumference = 2 * Math.PI * radius

  return (
    <>
      <article className="glass p-6 sm:p-7 lg:col-span-8" data-reveal="fade">
        <CardBar
          title={d.year}
          meta={
            <span className="inline-flex items-center gap-2 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-accent">
              <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
              {current < 0 || now === null ? d.soon : d.week(Math.min(current + 1, weekCount), weekCount)}
            </span>
          }
        />
        <div className="mt-7 grid grid-cols-10 gap-1.5 sm:gap-2" aria-hidden="true">
          {columns.map((column) => (
            <div key={column.label} className="flex flex-col gap-1.5 sm:gap-2">
              {column.weeks.map((week) => (
                <span
                  key={week.index}
                  className={`h-4 rounded-[4px] transition-colors duration-700 sm:h-5 ${
                    week.index === current
                      ? 'bg-accent shadow-[0_0_16px_-2px_#c8ff2e]'
                      : week.index < current
                        ? 'bg-white/[0.22]'
                        : 'bg-white/[0.05]'
                  }`}
                />
              ))}
              <span className="mono mt-1 text-center text-[10.5px] text-muted">{column.label}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="glass flex flex-col items-center justify-between gap-4 p-6 text-center sm:p-7 lg:col-span-4" data-reveal="fade">
        <CardBar title={d.gauge} className="w-full" />
        <div className="relative grid size-40 place-items-center">
          <svg viewBox="0 0 128 128" className="absolute inset-0 size-full -rotate-90" aria-hidden="true">
            <circle cx="64" cy="64" r={radius} fill="none" stroke="rgb(255 255 255 / .06)" strokeWidth="9" />
            <circle
              className="gauge-arc"
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="#c8ff2e"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              style={{ filter: 'drop-shadow(0 0 8px rgb(200 255 46 / .6))' }}
            />
          </svg>
          <p className="text-4xl font-semibold tracking-tight tabular-nums">{Math.round(progress * 100)} %</p>
        </div>
        <p className="mono text-muted">
          {schoolYear.start.slice(0, 4)} → {schoolYear.end.slice(0, 4)}
        </p>
      </article>
    </>
  )
}
