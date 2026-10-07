import type { CSSProperties, ReactNode } from 'react'
import { homelab, type RackUnit } from '@/content/homelab'

/**
 * Le rack 8U en vue isométrique, en SVG pur.
 * Chaque unité est une boîte (dessus, façade, flanc) ; la façade reçoit ses détails
 * (ports, LED, écran) dans son propre repère grâce à une matrice affine.
 * --explode (0 → 1, piloté au scroll) écarte les unités ; data-active allume l'unité en cours.
 */

const COS = Math.cos(Math.PI / 6)
const SIN = 0.5
const W = 240
const D = 110
const U = 34
const GAP = 20
const ROUTER_H = 12

const iso = (x: number, y: number, z: number) => [(x - y) * COS, (x + y) * SIN - z] as const
const pts = (list: (readonly [number, number])[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

type Placed = RackUnit & { z: number; h: number; order: number; w: number; x0: number }

// Du bas vers le haut : le cache plein en bas, le routeur posé sur le dessus.
function place(): Placed[] {
  const units = [...homelab.units].reverse()
  let z = 0
  return units.map((unit, order) => {
    const h = unit.heightU === 0 ? ROUTER_H : unit.heightU * U
    const w = unit.heightU === 0 ? W * 0.62 : W
    const placed = { ...unit, z, h, order, w, x0: (W - w) / 2 }
    z += h
    return placed
  })
}

function Front({ unit }: { unit: Placed }) {
  const { w, h } = unit
  const leds = (n: number, y: number, start = 16, step = 12) =>
    Array.from({ length: n }, (_, i) => <circle key={i} className="led" cx={start + i * step} cy={y} r="1.8" fill="rgb(237 237 239 / .25)" />)
  const ports = (n: number, y: number, start: number, step: number, pw = 9, ph = 7) =>
    Array.from({ length: n }, (_, i) => <rect key={i} x={start + i * step} y={y} width={pw} height={ph} rx="1" fill="#050506" stroke="rgb(255 255 255 / .18)" strokeWidth=".6" />)

  const details: Record<RackUnit['id'], ReactNode> = {
    router: (
      <>
        {leds(3, h / 2, 12, 9)}
        <rect x={w - 40} y={h / 2 - 2} width="26" height="4" rx="2" fill="rgb(255 255 255 / .12)" />
      </>
    ),
    screen: (
      <>
        <rect x="14" y="7" width={w - 28} height={h - 14} rx="3" fill="#050506" stroke="rgb(255 255 255 / .12)" strokeWidth=".6" />
        <polyline points={`22,${h - 18} 50,${h - 30} 74,${h - 24} 102,${h - 44} 130,${h - 36} 160,${h - 50} 190,${h - 40} ${w - 22},${h - 52}`} fill="none" stroke="#c8ff2e" strokeWidth="1.4" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={24 + i * 10} y="14" width="6" height={4 + ((i * 7) % 11)} fill="rgb(200 255 46 / .4)" />
        ))}
      </>
    ),
    patch: <>{ports(12, h / 2 - 3, 16, 17.5, 10, 6)}</>,
    switch: (
      <>
        {ports(8, h / 2 - 2, 16, 20)}
        <rect x={w - 46} y={h / 2 - 3} width="22" height="9" rx="1" fill="#050506" stroke="rgb(200 255 46 / .5)" strokeWidth=".7" />
        {leds(8, h / 2 - 8, 20.5, 20)}
      </>
    ),
    server: (
      <>
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={16 + i * 6} x2={16 + i * 6} y1="12" y2={h - 12} stroke="rgb(255 255 255 / .12)" strokeWidth="2" />
        ))}
        <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="rgb(237 237 239 / .55)">
          MS-01
        </text>
        {leds(3, h / 2, w - 44, 10)}
        <circle cx={w - 16} cy={h / 2} r="4" fill="none" stroke="rgb(255 255 255 / .3)" />
      </>
    ),
    reserve: (
      <>
        <rect x="10" y="7" width={w - 20} height={h - 14} rx="3" fill="none" stroke="rgb(255 255 255 / .2)" strokeDasharray="4 4" />
        <text x={w / 2} y={h / 2 + 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="rgb(237 237 239 / .4)">
          NAS
        </text>
      </>
    ),
    vent: (
      <>
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={20 + i * 15} y="9" width="7" height={h - 18} rx="2" fill="#050506" />
        ))}
      </>
    ),
    blank: <rect x="12" y={h / 2 - 1} width={w - 24} height="2" rx="1" fill="rgb(255 255 255 / .06)" />,
  }
  return <>{details[unit.id]}</>
}

function Unit({ unit }: { unit: Placed }) {
  const { x0, w, z, h } = unit
  const top = z + h
  const topFace = pts([iso(x0, 0, top), iso(x0 + w, 0, top), iso(x0 + w, D, top), iso(x0, D, top)])
  const front = pts([iso(x0, D, z), iso(x0 + w, D, z), iso(x0 + w, D, top), iso(x0, D, top)])
  const side = pts([iso(x0 + w, 0, z), iso(x0 + w, D, z), iso(x0 + w, D, top), iso(x0 + w, 0, top)])
  // Repère de la façade : u le long de la largeur, v vers le bas depuis le bord haut.
  const [ex, ey] = iso(x0, D, top)
  const matrix = `matrix(${COS} ${SIN} 0 1 ${ex.toFixed(2)} ${ey.toFixed(2)})`
  return (
    <g className="rack-unit" data-unit={unit.id} style={{ transform: `translateY(calc(var(--explode, 0) * ${-unit.order * GAP}px))` } as CSSProperties}>
      <polygon className="face-side" points={side} fill="#0d0e0a" stroke="rgb(255 255 255 / .1)" strokeWidth=".8" />
      <polygon className="face-front" points={front} fill="#15170f" stroke="rgb(255 255 255 / .14)" strokeWidth=".8" />
      <polygon className="face-top" points={topFace} fill="#1e2117" stroke="rgb(255 255 255 / .16)" strokeWidth=".8" />
      <g transform={matrix}>
        <Front unit={unit} />
      </g>
    </g>
  )
}

export function RackIso({ className = '', decorative = false }: { className?: string; decorative?: boolean }) {
  const units = place()
  const height = units.reduce((sum, u) => sum + u.h, 0)
  const maxLift = (units.length - 1) * GAP
  const minX = -D * COS - 10
  const maxX = W * COS + 10
  const minY = -(height + maxLift) - 10
  const maxY = (W + D) * SIN + 40
  const [sx, sy] = iso(W / 2, D / 2, 0)
  return (
    <svg
      viewBox={`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX - minX).toFixed(0)} ${(maxY - minY).toFixed(0)}`}
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : homelab.section.rackLabel}
      aria-hidden={decorative ? true : undefined}
      data-rack-svg
    >
      <ellipse cx={sx} cy={sy + 18} rx={W * 0.78} ry={W * 0.3} fill="url(#rack-floor)" />
      <defs>
        <radialGradient id="rack-floor">
          <stop offset="0" stopColor="#c8ff2e" stopOpacity="0.16" />
          <stop offset="1" stopColor="#c8ff2e" stopOpacity="0" />
        </radialGradient>
      </defs>
      {units.map((unit) => (
        <Unit key={unit.id} unit={unit} />
      ))}
    </svg>
  )
}
