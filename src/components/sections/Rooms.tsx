'use client'

import { AnimatePresence, m } from 'motion/react'
import { useEffect, useId, useMemo, useState } from 'react'
import { ArrowIcon } from '@/components/ui/Primitives'
import { Fill, TodoMark } from '@/components/ui/Todo'
import { type Difficulty, difficulties, type Room, type RoomCategory, roomCategories, roomsCopy, tryhackme } from '@/content/tryhackme'
import { isTodo } from '@/content/types'
import { on } from '@/lib/events'

const EASE = [0.16, 1, 0.3, 1] as const
const dateFormat = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium', timeZone: 'Europe/Paris' })
const rank = (d: Room['difficulty']) => (isTodo(d) ? 99 : (difficulties.find((x) => x.id === d)?.rank ?? 99))
const labelOf = (d: Difficulty) => difficulties.find((x) => x.id === d)?.label ?? d
const categoryLabel = (c: RoomCategory) => roomCategories.find((x) => x.id === c)?.label ?? c

function Rolling({ value }: { value: number }) {
  return (
    <span className="relative inline-flex overflow-hidden align-bottom tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span key={value} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.5, ease: EASE }}>
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  )
}

export function RoomsExplorer() {
  const searchId = useId()
  const [category, setCategory] = useState<RoomCategory | 'all'>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<'date' | 'difficulty'>('date')

  useEffect(() => on('rooms:filter', ({ category: next }) => setCategory(next)), [])

  const rooms = tryhackme.rooms
  const counts = useMemo(() => {
    const map = new Map<RoomCategory | 'all', number>([['all', rooms.length]])
    for (const c of roomCategories) map.set(c.id, rooms.filter((r) => r.category === c.id).length)
    return map
  }, [rooms])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = rooms.filter(
      (room) =>
        (category === 'all' || room.category === category) &&
        (!q || `${room.name} ${room.learned} ${categoryLabel(room.category)}`.toLowerCase().includes(q)),
    )
    return [...list].sort((a, b) => {
      if (sort === 'difficulty') return rank(a.difficulty) - rank(b.difficulty)
      const da = isTodo(a.date) ? '' : a.date
      const db = isTodo(b.date) ? '' : b.date
      return db.localeCompare(da)
    })
  }, [rooms, category, query, sort])

  const chips: { id: RoomCategory | 'all'; label: string }[] = [{ id: 'all', label: roomsCopy.all }, ...roomCategories]

  return (
    <div className="container-x">
      <div className="glass flex flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrer par catégorie" className="flex flex-wrap gap-2">
          {chips.map((chip) => {
            const active = category === chip.id
            return (
              <button
                key={chip.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(chip.id)}
                className={`relative isolate inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                  active ? 'border-accent text-ink' : 'border-white/10 text-fg hover:border-white/30'
                }`}
              >
                {active ? <m.span layoutId="room-chip" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ duration: 0.5, ease: EASE }} /> : null}
                {chip.label}
                <span className={`font-mono text-[11px] ${active ? 'text-ink/70' : 'text-muted'}`}>{counts.get(chip.id) ?? 0}</span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor={searchId} className="sr-only">
            {roomsCopy.searchLabel}
          </label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={roomsCopy.searchPlaceholder}
            className="w-56 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-sm placeholder:text-muted/70 focus:border-accent/60 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent"
          />
          <div role="group" aria-label={roomsCopy.sortLabel} className="flex rounded-full border border-white/10 p-0.5">
            {(['date', 'difficulty'] as const).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={sort === key}
                onClick={() => setSort(key)}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${sort === key ? 'bg-white/10 text-fg' : 'text-muted hover:text-fg'}`}
              >
                {key === 'date' ? roomsCopy.sortDate : roomsCopy.sortDifficulty}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mono mt-6 flex items-center gap-2 text-muted" aria-live="polite" data-rooms-count>
        <span className="text-fg">
          <Rolling value={visible.length} />
        </span>
        {roomsCopy.shown(visible.length)}
      </p>

      <m.ul layout className="mt-6 grid gap-4 md:grid-cols-2" aria-label="Rooms">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((room) => (
            <m.li
              key={room.slug}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="glass flex flex-col gap-4 p-6 sm:p-7"
              data-room
            >
              <div className="mono flex flex-wrap items-center justify-between gap-2 text-muted">
                <span className="text-accent">{categoryLabel(room.category)}</span>
                <span className="flex items-center gap-3">
                  <Fill value={room.difficulty}>{(d) => labelOf(d)}</Fill>
                  <span aria-hidden="true">·</span>
                  <Fill value={room.date}>{(d) => <time dateTime={d}>{dateFormat.format(new Date(d))}</time>}</Fill>
                </span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{room.name}</h3>
              <div>
                <p className="mono text-muted">{roomsCopy.learnedLabel.toLowerCase()}</p>
                <p className="mt-1.5 text-pretty text-fg/85">{room.learned}</p>
              </div>
              <a href={room.url} target="_blank" rel="noopener noreferrer" className="mono mt-auto inline-flex items-center gap-2 text-fg/85 hover:text-accent">
                {roomsCopy.open}
                <ArrowIcon className="size-3.5" />
                <span className="sr-only">{room.name}</span>
              </a>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <AnimatePresence>
        {visible.length === 0 ? (
          <m.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="glass mt-2 flex flex-col items-start gap-4 border-dashed p-10"
            data-rooms-empty
          >
            <p className="font-mono text-sm text-accent">0x00 · rien à afficher</p>
            <p className="text-2xl font-semibold tracking-tight">{roomsCopy.emptyTitle}</p>
            <p className="text-muted">{roomsCopy.emptyText}</p>
            <button
              type="button"
              onClick={() => {
                setCategory('all')
                setQuery('')
              }}
              className="mono rounded-full border border-white/10 px-4 py-2 hover:bg-white/5"
            >
              {roomsCopy.emptyReset}
            </button>
          </m.div>
        ) : null}
      </AnimatePresence>

      <p className="mt-8 flex flex-wrap items-center gap-3 text-sm text-muted">
        <TodoMark hint={tryhackme.roomsTodo.todo} /> {roomsCopy.todoRooms}
      </p>
    </div>
  )
}
