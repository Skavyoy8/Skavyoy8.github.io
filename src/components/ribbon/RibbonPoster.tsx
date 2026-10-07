import { getPose, spine, spreadAt } from './poses'

/**
 * Le ruban en SVG statique, calculé au build avec les mêmes formules que le shader.
 * Visible tout de suite (avant le WebGL), et seul fond en mode calme ou sans WebGL.
 */

const STRANDS = 26
const SAMPLES = 15

function random(seed: number) {
  let a = seed
  return () => {
    a = (a * 16807) % 2147483647
    return (a - 1) / 2147483646
  }
}

const r1 = (n: number) => Math.round(n * 10) / 10

function strandPaths(width: number, height: number) {
  const aspect = width / height
  const pose = getPose(aspect)
  const rand = random(11)
  const world = pose.points.map(([x, y, z]) => [x * aspect, y, z] as const) as unknown as typeof pose.points
  const scale = Math.min(Math.max(aspect / 1.4, 0.5), 1)
  const c: [number, number, number] = [0, 0, 0]
  const c2: [number, number, number] = [0, 0, 0]
  const project = (x: number, y: number, z: number): [number, number] => {
    const w = 1 - z * 0.28
    return [((x / aspect / w) * 0.5 + 0.5) * width, (0.5 - (y / w) * 0.5) * height]
  }

  return Array.from({ length: STRANDS }, (_, s) => {
    const across = ((s + rand()) / STRANDS) * 2 - 1
    const pick = rand()
    const points: [number, number][] = []
    for (let i = 0; i <= SAMPLES; i++) {
      const t = 0.04 + (i / SAMPLES) * 0.92
      spine(world, t, c)
      spine(world, t + 0.004, c2)
      const tx = c2[0] - c[0]
      const ty = c2[1] - c[1]
      const len = Math.hypot(tx, ty) || 1
      const nx = -ty / len
      const ny = tx / len
      const a = pose.twist * Math.PI * 2 * t
      const off = across * spreadAt(pose, t) * scale * Math.cos(a)
      points.push(project(c[0] + nx * off, c[1] + ny * off, Math.sin(a) * across * 0.1))
    }
    // Catmull-Rom -> courbes de Bézier : peu de points, tracé lisse.
    let d = `M${r1(points[0]![0])} ${r1(points[0]![1])}`
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(i - 1, 0)]!
      const p1 = points[i]!
      const p2 = points[i + 1]!
      const p3 = points[Math.min(i + 2, points.length - 1)]!
      d += `C${r1(p1[0] + (p2[0] - p0[0]) / 6)} ${r1(p1[1] + (p2[1] - p0[1]) / 6)} ${r1(p2[0] - (p3[0] - p1[0]) / 6)} ${r1(p2[1] - (p3[1] - p1[1]) / 6)} ${r1(p2[0])} ${r1(p2[1])}`
    }
    const color = pick < 0.18 ? '#4cb8ff' : pick < 0.5 ? '#7fc522' : '#c8ff2e'
    return { d, color, opacity: r1(0.35 + rand() * 0.55) }
  })
}

function Variant({ id, width, height, className }: { id: string; width: number; height: number; className: string }) {
  const aspect = width / height
  const pose = getPose(aspect)
  const pinch: [number, number, number] = [0, 0, 0]
  spine(pose.points.map(([x, y, z]) => [x * aspect, y, z] as const) as unknown as typeof pose.points, pose.pinch, pinch)
  const gx = (pinch[0] / aspect / 2 + 0.5) * width
  const gy = (0.5 - pinch[1] / 2) * height
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#e9ffb0" stopOpacity="0.55" />
          <stop offset="0.25" stopColor="#c8ff2e" stopOpacity="0.16" />
          <stop offset="1" stopColor="#c8ff2e" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <g id={`${id}-lines`} fill="none">
          {strandPaths(width, height).map((strand, i) => (
            <path key={i} d={strand.d} stroke={strand.color} strokeOpacity={strand.opacity} />
          ))}
        </g>
      </defs>
      <circle cx={r1(gx)} cy={r1(gy)} r={Math.min(width, height) * 0.36} fill={`url(#${id}-glow)`} />
      <use href={`#${id}-lines`} strokeWidth="5" opacity="0.5" filter={`url(#${id}-blur)`} />
      <use href={`#${id}-lines`} strokeWidth="1.1" />
    </svg>
  )
}

export function RibbonPoster() {
  return (
    <div className="ribbon-poster" aria-hidden="true">
      <Variant id="rp-l" width={1600} height={1000} className="ribbon-poster-land" />
      <Variant id="rp-p" width={780} height={1688} className="ribbon-poster-port" />
    </div>
  )
}
