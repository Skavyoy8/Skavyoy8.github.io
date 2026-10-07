'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowIcon } from '@/components/ui/Primitives'
import { RackDiagram } from '@/components/ui/RackDiagram'
import { useWebGL } from '@/components/three/webgl'
import { homelab } from '@/content/homelab'
import { useHydrated } from '@/hooks/useMedia'
import { useCalm } from '@/lib/calm'
import { gsap, useGSAP } from '@/lib/gsap'
import { sceneState } from '@/lib/sceneState'

const stages = [homelab.sequence.assemble, homelab.sequence.explode, homelab.sequence.boot, homelab.sequence.network]
const ramAlways = homelab.services.always.reduce((sum, s) => sum + s.ram, 0)
const ramDemand = homelab.services.onDemand.reduce((sum, s) => sum + s.ram, 0)
const fmt = (n: number) => String(n).replace('.', ',')

export function LabSequence() {
  const hydrated = useHydrated()
  const calm = useCalm()
  const webgl = useWebGL()
  if (hydrated && !calm && webgl) return <LabPinned />
  return <LabStatic />
}

function Services({ compact = false }: { compact?: boolean }) {
  const groups = [
    { title: homelab.labels.always, items: homelab.services.always },
    { title: homelab.labels.onDemand, items: homelab.services.onDemand },
  ]
  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="label mb-2 text-muted">{group.title}</p>
          <ul className="divide-y divide-line border-y border-line">
            {group.items.map((service) => (
              <li key={service.name} className="flex items-baseline justify-between gap-4 py-2" data-service>
                <span>
                  <span className="text-sm text-fg">{service.name}</span>
                  {compact ? null : <span className="block text-xs text-muted">{service.role}</span>}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-muted">
                  {service.type} · {fmt(service.ram)} Go
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div>
        <p className="label flex justify-between text-muted">
          <span>{homelab.labels.ram}</span>
          <span>
            {fmt(ramAlways)} + {fmt(ramDemand)} / {homelab.ram.total} Go
          </span>
        </p>
        <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-line">
          <span className="block h-full origin-left bg-accent" style={{ width: `${(ramAlways / homelab.ram.total) * 100}%` }} data-ram-bar />
          <span className="block h-full origin-left bg-cold/70" style={{ width: `${(ramDemand / homelab.ram.total) * 100}%` }} data-ram-bar />
        </div>
      </div>
    </div>
  )
}

function Network() {
  return (
    <ul className="space-y-3">
      {homelab.links.map((link) => (
        <li key={link.from} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 font-mono text-[11px]">
          <span className="text-fg">{link.from}</span>
          <span className="flex items-center gap-2 text-accent">
            <span className="block h-px w-10 origin-left bg-accent" data-net-line />
            {link.speed}
          </span>
          <span className="text-muted">{link.to}</span>
        </li>
      ))}
    </ul>
  )
}

/** Version sans 3D (mode calme, pas de WebGL) : complète et lisible. */
function LabStatic() {
  return (
    <div className="container-x grid grid-cols-4 gap-x-(--gutter) gap-y-12 lg:grid-cols-12">
      <div className="col-span-4 lg:col-span-7">
        <p className="label text-accent">{homelab.status}</p>
        <RackDiagram className="mt-6 w-full max-w-2xl" />
      </div>
      <div className="col-span-4 space-y-10 lg:col-span-5">
        {stages.map((stage) => (
          <div key={stage.title}>
            <p className="label text-muted">{stage.kicker}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">{stage.title}</h3>
            <p className="mt-2 text-pretty text-muted">{stage.text}</p>
          </div>
        ))}
        <Services />
        <Network />
        <Link href="/lab/homelab/" className="group label inline-flex items-center gap-2 hover:text-accent">
          {homelab.labels.detailsCta} <ArrowIcon direction="right" className="size-3.5" />
        </Link>
      </div>
    </div>
  )
}

/** Séquence pinnée : rack assemblé → vue éclatée légendée → Proxmox démarre → câblage 10G. */
function LabPinned() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const s = sceneState
      const stageEls = gsap.utils.toArray<HTMLElement>('[data-stage]')
      gsap.set(stageEls.slice(1), { autoAlpha: 0, y: 32 })
      gsap.set('[data-services], [data-network]', { autoAlpha: 0 })
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=380%', pin: true, scrub: 0.8, anticipatePin: 1, refreshPriority: 5 },
      })
      const swap = (from: number, to: number, at: number) => {
        tl.to(stageEls[from] ?? {}, { autoAlpha: 0, y: -32, duration: 0.3, ease: 'power2.in' }, at)
        tl.to(stageEls[to] ?? {}, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power2.out' }, at + 0.25)
      }
      tl.to(s, { explode: 1, duration: 1.2 }, 0.5)
      swap(0, 1, 0.6)
      tl.to(s, { focus: 1, duration: 0.6 }, 2.1)
      swap(1, 2, 2.1)
      tl.to('[data-services]', { autoAlpha: 1, x: 0, duration: 0.35 }, 2.2)
      tl.from('[data-services] [data-service]', { autoAlpha: 0, x: 24, stagger: 0.06, duration: 0.3 }, 2.3)
      tl.from('[data-services] [data-ram-bar]', { scaleX: 0, stagger: 0.2, duration: 0.6 }, 2.6)
      tl.to('[data-services]', { autoAlpha: 0, duration: 0.3 }, 3.7)
      swap(2, 3, 3.7)
      tl.to(s, { explode: 0.25, focus: 0, duration: 0.8 }, 3.7)
      tl.to('[data-network]', { autoAlpha: 1, duration: 0.3 }, 3.9)
      tl.from('[data-network] [data-net-line]', { scaleX: 0, stagger: 0.12, duration: 0.4 }, 4.0)
      tl.fromTo('[data-rail]', { scaleY: 0 }, { scaleY: 1, duration: tl.duration() }, 0)
      tl.to({}, { duration: 0.5 })
    },
    { scope: root },
  )

  return (
    <div ref={root} className="relative h-svh overflow-hidden">
      <div className="container-x relative grid h-full grid-cols-4 gap-x-(--gutter) lg:grid-cols-12">
        <div className="relative col-span-4 self-end pb-10 lg:col-span-4 lg:self-center lg:pb-0">
          <p className="label mb-6 flex items-center gap-2 text-accent">
            <span className="pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
            {homelab.status}
          </p>
          <div className="grid">
            {stages.map((stage, i) => (
              <div key={stage.title} data-stage className="col-start-1 row-start-1" aria-hidden={i > 0 ? undefined : undefined}>
                <p className="label text-muted">{stage.kicker} / 4</p>
                <h3 className="mt-3 text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.045em]">{stage.title}</h3>
                <p className="mt-4 max-w-sm text-pretty text-muted">{stage.text}</p>
              </div>
            ))}
          </div>
          <Link href="/lab/homelab/" className="group label mt-8 inline-flex items-center gap-2 hover:text-accent">
            {homelab.labels.detailsCta} <ArrowIcon direction="right" className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
        {homelab.units.map((unit, i) => (
          <div
            key={unit.id}
            ref={(el) => {
              sceneState.rackLabels[i] = el
            }}
            className="absolute top-0 left-0 opacity-0 will-change-transform"
          >
            <div className="flex -translate-y-1/2 items-center gap-3">
              <span className="block h-px w-12 bg-fg/40" />
              <div>
                <p className={`text-sm font-medium ${unit.id === 'server' ? 'text-accent' : 'text-fg'}`}>{unit.name}</p>
                <p className="label text-[0.625rem] text-muted">
                  {unit.heightU ? `${fmt(unit.heightU)}U` : homelab.labels.onTop} · {unit.phase === 2 ? homelab.labels.phase2 : homelab.labels.phase1}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-(--gutter) top-24 max-h-[46svh] overflow-hidden rounded-lg border border-line bg-surface/85 p-5 backdrop-blur-md lg:inset-x-auto lg:top-1/2 lg:right-(--gutter) lg:max-h-none lg:w-[min(30rem,34vw)] lg:-translate-y-1/2" data-services>
        <p className="label mb-4 text-accent">Proxmox · MS-01 · {homelab.ram.total} Go</p>
        <Services compact />
      </div>

      <div className="absolute inset-x-(--gutter) top-24 rounded-lg border border-line bg-surface/85 p-5 backdrop-blur-md lg:inset-x-auto lg:top-1/2 lg:right-(--gutter) lg:w-[min(30rem,34vw)] lg:-translate-y-1/2" data-network>
        <p className="label mb-4 flex justify-between text-accent">
          <span>Câblage</span>
          <span>{homelab.labels.lanOnly}</span>
        </p>
        <Network />
      </div>

      <div className="absolute top-1/2 left-2 hidden h-40 w-px -translate-y-1/2 bg-line lg:block" aria-hidden="true">
        <span className="block h-full w-full origin-top bg-accent" data-rail />
      </div>
    </div>
  )
}
