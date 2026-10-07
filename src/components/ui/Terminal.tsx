'use client'

import { usePathname, useRouter } from 'next/navigation'
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { about } from '@/content/about'
import { projects, statusLabel } from '@/content/lab'
import { socials } from '@/content/links'
import { sections } from '@/content/nav'
import { terminalCopy } from '@/content/terminal'
import { tryhackme } from '@/content/tryhackme'
import { isTodo } from '@/content/types'
import { calmStore } from '@/lib/calm'
import { on } from '@/lib/events'
import { scrollToTarget } from '@/lib/scroll'

type Line = { id: number; kind: 'in' | 'out' | 'err' | 'ok'; text: string }

const COMMANDS = ['help', 'whoami', 'ls', 'cd', 'cat', 'projects', 'rooms', 'open', 'calm', 'clear', 'exit', 'sudo'] as const
const ALIASES: Record<string, string> = { contact: 'reseaux', about: 'a-propos', apropos: 'a-propos', home: 'accueil', competences: 'interets', apprends: 'interets', projets: 'lab', projects: 'lab', tryhackme: 'pratique', thm: 'pratique', rooms: 'pratique' }
const OPENABLE: Record<string, string> = { github: 'github', gh: 'github', thm: 'tryhackme', tryhackme: 'tryhackme', discord: 'discord', linkedin: 'linkedin', instagram: 'instagram', tiktok: 'tiktok' }

let lineId = 0
const make = (kind: Line['kind'], text: string): Line => ({ id: ++lineId, kind, text })
const welcome = () => terminalCopy.welcome.map((t) => make('out', t))

function resolveSection(arg: string): string | null {
  const key = arg.replace(/^[#/~.]+/, '').toLowerCase()
  const id = ALIASES[key] ?? key
  return sections.find((s) => s.id === id || s.index === id)?.id ?? null
}

function complete(value: string): string {
  const parts = value.split(' ')
  if (parts.length === 1) {
    const match = COMMANDS.filter((c) => c.startsWith(parts[0] ?? ''))
    return match.length === 1 ? `${match[0]} ` : value
  }
  const [cmd, ...rest] = parts
  const arg = rest.join(' ')
  let pool: readonly string[] = []
  const prefix = `${cmd} `
  if (cmd === 'cd') pool = sections.map((s) => s.id)
  else if (cmd === 'open') pool = ['github', 'thm', 'discord', 'linkedin', 'instagram', 'tiktok']
  else if (cmd === 'cat') pool = ['about']
  else if (cmd === 'sudo') pool = ['hire-luke']
  const match = pool.filter((p) => p.startsWith(arg))
  return match.length === 1 ? `${prefix}${match[0]}` : value
}

export function Terminal() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<Line[]>(welcome)
  const [value, setValue] = useState('')
  const history = useRef<string[]>([])
  const cursor = useRef(-1)
  const input = useRef<HTMLInputElement>(null)
  const output = useRef<HTMLDivElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => on('terminal:toggle', () => setOpen((o) => !o)), [])

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const typing = !!target && (target.isContentEditable || /^(input|textarea|select)$/i.test(target.tagName))
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((o) => !o)
      } else if (event.key === '`' && !typing) {
        event.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!open) return
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const id = requestAnimationFrame(() => input.current?.focus())
    return () => {
      cancelAnimationFrame(id)
      returnFocus.current?.focus()
    }
  }, [open])

  useEffect(() => {
    output.current?.scrollTo({ top: output.current.scrollHeight })
  }, [lines])

  const goTo = (id: string) => {
    setOpen(false)
    if (pathname !== '/') {
      router.push(`/#${id}`)
      return
    }
    window.setTimeout(() => scrollToTarget(`#${id}`), 80)
  }

  const execute = (raw: string): Line[] | 'clear' => {
    const [cmd = '', ...args] = raw.trim().split(/\s+/)
    const arg = args.join(' ')
    switch (cmd.toLowerCase()) {
      case '':
        return []
      case 'help':
        return terminalCopy.help.map(([c, d]) => make('out', `${c.padEnd(28, ' ')}${d}`))
      case 'whoami':
        return terminalCopy.whoami.map((t) => make('out', t))
      case 'ls':
        return [make('out', sections.map((s) => s.id).join('   '))]
      case 'cd': {
        if (!arg) return [make('err', terminalCopy.cdUsage)]
        const id = resolveSection(arg)
        if (!id) return [make('err', terminalCopy.cdUnknown(arg))]
        goTo(id)
        return [make('ok', terminalCopy.cdOk(id))]
      }
      case 'cat':
        if (arg !== 'about') return [make('err', 'usage : cat about')]
        return about.paragraphs.map((t) => make('out', t))
      case 'projects':
        return projects.map((p) => make('out', `${p.title.padEnd(26, ' ')}${isTodo(p.status) ? '[À REMPLIR]' : statusLabel[p.status]}`))
      case 'rooms':
        return tryhackme.rooms.map((r) => make('out', `${r.name.padEnd(26, ' ')}${r.learned}`))
      case 'open': {
        const id = OPENABLE[arg.toLowerCase()]
        const link = socials.find((s) => s.id === id)
        if (!link) return [make('err', terminalCopy.openUsage)]
        if (isTodo(link.href)) return [make('err', terminalCopy.openMissing(link.label))]
        window.open(link.href, '_blank', 'noopener,noreferrer')
        return [make('ok', terminalCopy.openOk(link.label))]
      }
      case 'calm': {
        calmStore.toggle()
        return [make('ok', calmStore.get() ? terminalCopy.calmOn : terminalCopy.calmOff)]
      }
      case 'clear':
        return 'clear'
      case 'exit':
        setOpen(false)
        return []
      case 'sudo':
        if (arg === 'hire-luke' || arg === 'hire-skavyoy') return terminalCopy.sudo.map((t) => make('ok', t))
        return [make('err', terminalCopy.sudoDenied)]
      default:
        return [make('err', terminalCopy.notFound(cmd))]
    }
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const raw = value
    setValue('')
    if (raw.trim()) history.current.push(raw.trim())
    cursor.current = -1
    const result = execute(raw)
    if (result === 'clear') setLines([])
    else setLines((prev) => [...prev, make('in', raw), ...result])
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setValue((v) => complete(v))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      const list = history.current
      if (!list.length) return
      cursor.current = cursor.current < 0 ? list.length - 1 : Math.max(0, cursor.current - 1)
      setValue(list[cursor.current] ?? '')
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      const list = history.current
      if (cursor.current < 0) return
      cursor.current += 1
      if (cursor.current >= list.length) {
        cursor.current = -1
        setValue('')
      } else setValue(list[cursor.current] ?? '')
    } else if (event.key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    }
  }

  if (!open) return null
  return (
    <div
      className="overlay-in fixed inset-0 z-[85] flex items-start justify-center bg-bg/75 px-3 pt-[12vh] sm:px-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setOpen(false)
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={terminalCopy.label}
        className="dialog-in w-full max-w-3xl overflow-hidden rounded-2xl border border-line-strong bg-surface font-mono text-[13px] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.8)]"
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-2" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-white/15" />
            <span className="size-2.5 rounded-full bg-accent" />
          </div>
          <p className="text-muted">{terminalCopy.title}</p>
          <button type="button" onClick={() => setOpen(false)} className="label text-muted hover:text-fg">
            Échap
          </button>
        </div>
        <div ref={output} role="log" aria-live="polite" aria-label="Sortie du terminal" className="h-[min(52vh,420px)] space-y-1 overflow-y-auto px-4 py-3" data-terminal-output>
          {lines.map((line) => (
            <p
              key={line.id}
              className={`break-words whitespace-pre-wrap ${line.kind === 'in' ? 'text-fg' : line.kind === 'err' ? 'text-[#ff8a7a]' : line.kind === 'ok' ? 'text-accent' : 'text-muted'}`}
            >
              {line.kind === 'in' ? <span className="text-accent">❯ </span> : null}
              {line.text}
            </p>
          ))}
        </div>
        <form onSubmit={submit} className="flex items-center gap-2 border-t border-line px-4 py-3">
          <label htmlFor="terminal-input" className="text-accent">
            <span aria-hidden="true">❯</span>
            <span className="sr-only">Commande</span>
          </label>
          <input
            id="terminal-input"
            ref={input}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder={terminalCopy.placeholder}
            className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none placeholder:text-muted/60"
          />
        </form>
        <p className="border-t border-line px-4 py-2 text-[11px] text-muted">{terminalCopy.hint}</p>
      </div>
    </div>
  )
}
