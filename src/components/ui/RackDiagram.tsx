import { homelab } from '@/content/homelab'

const U = 46
const TOP = 70
const X = 40
const W = 300

// Position de chaque unité, calculée une fois (de haut en bas).
const placed = homelab.units
  .filter((unit) => unit.heightU > 0)
  .reduce<{ unit: (typeof homelab.units)[number]; top: number; height: number }[]>((list, unit) => {
    const last = list[list.length - 1]
    const top = last ? last.top + last.height : TOP
    return [...list, { unit, top, height: unit.heightU * U }]
  }, [])
const router = homelab.units.find((unit) => unit.heightU === 0)

/** Vue de face du rack 8U (SVG statique) : fallback de la 3D et illustration de la page détail. */
export function RackDiagram({ className = '' }: { className?: string }) {

  return (
    <svg viewBox="0 0 640 470" className={className} role="img" aria-label={`Plan du rack : ${homelab.rack}`}>
      {router ? (
        <g>
          <rect x={X + 70} y={TOP - 46} width={W - 140} height={34} rx="4" fill="none" stroke="rgb(255 255 255 / .35)" strokeDasharray="4 4" />
          <text x={X + W / 2} y={TOP - 24} textAnchor="middle" fill="#ededef" fontSize="12" fontFamily="var(--font-mono)">
            GL.iNet
          </text>
          <text x={X + W + 28} y={TOP - 24} fill="#8b8b94" fontSize="12">
            {router.name} · {homelab.labels.onTop}
          </text>
        </g>
      ) : null}
      <rect x={X - 12} y={TOP - 6} width={W + 24} height={8 * U + 12} rx="8" fill="#0b0b0e" stroke="rgb(255 255 255 / .22)" />
      {placed.map(({ unit, top, height }) => {
        const main = unit.id === 'server'
        const dashed = unit.phase === 2
        return (
          <g key={unit.id}>
            <rect
              x={X}
              y={top + 3}
              width={W}
              height={height - 6}
              rx="3"
              fill={main ? 'rgb(200 255 46 / .1)' : '#050506'}
              stroke={main ? '#c8ff2e' : 'rgb(255 255 255 / .3)'}
              strokeDasharray={dashed ? '4 4' : undefined}
            />
            {unit.id === 'switch'
              ? Array.from({ length: 8 }, (_, i) => <rect key={i} x={X + 18 + i * 22} y={top + height / 2 - 6} width="14" height="11" rx="1.5" fill="none" stroke="rgb(255 255 255 / .35)" />)
              : null}
            {unit.id === 'patch'
              ? Array.from({ length: 12 }, (_, i) => <rect key={i} x={X + 14 + i * 22} y={top + height / 2 - 4} width="12" height="8" rx="1" fill="rgb(255 255 255 / .2)" />)
              : null}
            {unit.id === 'screen' ? <rect x={X + 40} y={top + 16} width={W - 80} height={height - 32} rx="3" fill="rgb(106 228 255 / .08)" stroke="rgb(106 228 255 / .4)" /> : null}
            {unit.id === 'server' || unit.id === 'switch' ? (
              <circle className="pulse-dot" cx={X + W - 18} cy={top + height / 2} r="3" fill="#c8ff2e" />
            ) : null}
            {unit.id === 'vent'
              ? Array.from({ length: 14 }, (_, i) => <line key={i} x1={X + 30 + i * 18} y1={top + 14} x2={X + 30 + i * 18} y2={top + height - 14} stroke="rgb(255 255 255 / .15)" />)
              : null}
            <text x={X - 22} y={top + height / 2 + 4} textAnchor="end" fill="#8b8b94" fontSize="11" fontFamily="var(--font-mono)">
              {String(unit.heightU).replace('.', ',')}U
            </text>
            <text x={X + W + 28} y={top + height / 2 + 4} fill={main ? '#c8ff2e' : '#ededef'} fontSize="13" fontWeight={main ? 600 : 400}>
              {unit.name}
            </text>
            {dashed ? (
              <text x={X + W + 28} y={top + height / 2 + 20} fill="#8b8b94" fontSize="10.5" fontFamily="var(--font-mono)">
                {homelab.labels.phase2.toUpperCase()}
              </text>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}
