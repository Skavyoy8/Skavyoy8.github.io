import { homelab } from '@/content/homelab'

/**
 * Génération procédurale des deux formes du Lab (aucun modèle téléchargé) :
 * des pistes de circuit (état de départ) qui se replient en rack 10".
 * Déterministe : même graine → mêmes points. Les particules sont tirées au hasard,
 * donc n'en dessiner qu'un préfixe (drawRange) garde une répartition uniforme.
 */

export const RACK = { width: 1.95, depth: 1.6, u: 0.38 }
export const RACK_UNITS = homelab.units.length
/** Écartement vertical par unité en vue éclatée (même formule que le shader). */
export const EXPLODE_GAP = 0.22
export const EXPLODE_Z = 0.55
/** Échelle du rack (identique dans le shader). */
export const RACK_SCALE = 0.68
export const SERVER_UNIT = homelab.units.findIndex((u) => u.id === 'server')

export type ShapeData = {
  count: number
  circuit: Float32Array
  rack: Float32Array
  rand: Float32Array
  meta: Float32Array
  /** Ancre (bord droit, centre, face avant) de chaque unité du rack, pour les légendes HTML. */
  anchors: Float32Array
}

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Seg = { ax: number; ay: number; bx: number; by: number; len: number; trace: number; s0: number; s1: number }

export function generateShapes(count: number, seed = 7): ShapeData {
  const rnd = mulberry32(seed)
  const gauss = () => (rnd() + rnd() + rnd() - 1.5) / 1.5

  const circuit = new Float32Array(count * 3)
  const rack = new Float32Array(count * 3)
  const rand = new Float32Array(count * 4)
  const meta = new Float32Array(count * 4)

  for (let p = 0; p < count; p++) {
    rand[p * 4] = rnd()
    rand[p * 4 + 1] = rnd()
    rand[p * 4 + 2] = rnd()
    rand[p * 4 + 3] = rnd()
    meta[p * 4] = -1
    meta[p * 4 + 2] = -1
  }

  // 1. Circuit compact autour du rack : pistes orthogonales (coudes à 45°), pastilles et puces.
  const segs: Seg[] = []
  const pads: [number, number][] = []
  const W = 2.7
  const H = 1.8
  const snap = (v: number) => Math.round(v / 0.15) * 0.15
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ] as const
  for (let t = 0; t < 40; t++) {
    let x = snap((rnd() * 2 - 1) * W)
    let y = snap((rnd() * 2 - 1) * H)
    let d = Math.floor(rnd() * 4)
    const steps = 2 + Math.floor(rnd() * 4)
    pads.push([x, y])
    let s = 0
    const startIndex = segs.length
    for (let k = 0; k < steps; k++) {
      const dir = dirs[d] as readonly [number, number]
      const diag = k > 0 && rnd() < 0.35
      const len = 0.25 + rnd() * 0.95
      const dx = diag ? (dir[0] + dir[1]) * 0.7071 : dir[0]
      const dy = diag ? (dir[1] - dir[0]) * 0.7071 : dir[1]
      const nx = Math.max(-W, Math.min(W, x + dx * len))
      const ny = Math.max(-H, Math.min(H, y + dy * len))
      const l = Math.hypot(nx - x, ny - y)
      if (l > 0.05) {
        segs.push({ ax: x, ay: y, bx: nx, by: ny, len: l, trace: t, s0: s, s1: s + l })
        s += l
      }
      x = nx
      y = ny
      d = (d + (rnd() < 0.5 ? 1 : 3)) % 4
    }
    for (let k = startIndex; k < segs.length; k++) {
      const seg = segs[k] as Seg
      seg.s0 /= s || 1
      seg.s1 /= s || 1
    }
    pads.push([x, y])
  }
  const chips = Array.from({ length: 3 }, () => ({ x: (rnd() * 2 - 1) * (W - 0.6), y: (rnd() * 2 - 1) * (H - 0.5), w: 0.45 + rnd() * 0.4, h: 0.3 + rnd() * 0.25 }))
  const totalLen = segs.reduce((sum, seg) => sum + seg.len, 0)
  const cumulative = new Float32Array(segs.length)
  let acc = 0
  segs.forEach((seg, i) => {
    acc += seg.len
    cumulative[i] = acc / totalLen
  })
  const tilt = -0.42
  const cosT = Math.cos(tilt)
  const sinT = Math.sin(tilt)
  for (let p = 0; p < count; p++) {
    const roll = rnd()
    let x = 0
    let y = 0
    let z = 0
    if (roll < 0.72) {
      const pick = rnd()
      let lo = 0
      let hi = segs.length - 1
      while (lo < hi) {
        const mid = (lo + hi) >> 1
        if ((cumulative[mid] as number) < pick) lo = mid + 1
        else hi = mid
      }
      const seg = segs[lo] as Seg
      const f = rnd()
      x = seg.ax + (seg.bx - seg.ax) * f + gauss() * 0.012
      y = seg.ay + (seg.by - seg.ay) * f + gauss() * 0.012
      meta[p * 4] = (seg.trace * 0.6180339) % 1
      meta[p * 4 + 1] = seg.s0 + (seg.s1 - seg.s0) * f
    } else if (roll < 0.86) {
      const pad = pads[Math.floor(rnd() * pads.length)] as [number, number]
      const a = rnd() * Math.PI * 2
      const r = Math.sqrt(rnd()) * 0.055
      x = pad[0] + Math.cos(a) * r
      y = pad[1] + Math.sin(a) * r
    } else {
      const chip = chips[Math.floor(rnd() * chips.length)] as (typeof chips)[number]
      const side = rnd()
      if (side < 0.55) {
        // contour
        const per = rnd() * 2 * (chip.w + chip.h)
        if (per < chip.w) [x, y] = [chip.x - chip.w / 2 + per, chip.y - chip.h / 2]
        else if (per < chip.w + chip.h) [x, y] = [chip.x + chip.w / 2, chip.y - chip.h / 2 + per - chip.w]
        else if (per < 2 * chip.w + chip.h) [x, y] = [chip.x + chip.w / 2 - (per - chip.w - chip.h), chip.y + chip.h / 2]
        else [x, y] = [chip.x - chip.w / 2, chip.y + chip.h / 2 - (per - 2 * chip.w - chip.h)]
      } else {
        // broches
        const pins = Math.max(4, Math.round(chip.w / 0.09))
        const k = Math.floor(rnd() * pins)
        const top = rnd() < 0.5 ? 1 : -1
        x = chip.x - chip.w / 2 + ((k + 0.5) / pins) * chip.w
        y = chip.y + top * (chip.h / 2 + rnd() * 0.1)
      }
      z = gauss() * 0.01
    }
    circuit[p * 3] = x
    circuit[p * 3 + 1] = y * cosT - z * sinT
    circuit[p * 3 + 2] = y * sinT + z * cosT
  }

  // 2. Rack 10" : cadre + unités échantillonnées, LED marquées.
  const { width: RW, depth: RD, u: U } = RACK
  const RH = 8 * U
  const units = homelab.units
  const anchors = new Float32Array(units.length * 3)
  type Box = { x: number; y: number; z: number; w: number; h: number; d: number; unit: number; kind: string }
  const boxes: Box[] = []
  let cursor = RH / 2
  units.forEach((unit, i) => {
    if (unit.heightU === 0) {
      const h = 0.26
      boxes.push({ x: 0, y: RH / 2 + 0.06 + h / 2, z: 0, w: 1.3, h, d: 0.95, unit: i, kind: unit.id })
      anchors.set([0.65 + 0.1, RH / 2 + 0.06 + h / 2, 0.48], i * 3)
      return
    }
    const h = unit.heightU * U
    const y = cursor - h / 2
    cursor -= h
    boxes.push({ x: 0, y, z: 0.02, w: RW - 0.16, h: h - 0.03, d: RD - 0.12, unit: i, kind: unit.id })
    anchors.set([RW / 2 + 0.12, y, RD / 2], i * 3)
  })
  const weights = boxes.map((b) => b.w * b.h * (b.kind === 'switch' || b.kind === 'server' || b.kind === 'screen' ? 1.5 : 1))
  const weightSum = weights.reduce((a, b) => a + b, 0)
  const boxCum = weights.map(((sum) => (w: number) => (sum += w / weightSum))(0))

  const edge = (ax: number, ay: number, az: number, bx: number, by: number, bz: number, f: number): [number, number, number] => [
    ax + (bx - ax) * f,
    ay + (by - ay) * f,
    az + (bz - az) * f,
  ]
  const frameEdges: [number, number, number, number, number, number][] = []
  const hx = RW / 2
  const hy = RH / 2
  const hz = RD / 2
  for (const sx of [-1, 1])
    for (const sz of [-1, 1]) frameEdges.push([sx * hx, -hy - 0.05, sz * hz, sx * hx, hy + 0.05, sz * hz])
  for (const sy of [-1, 1]) {
    frameEdges.push([-hx, sy * (hy + 0.05), hz, hx, sy * (hy + 0.05), hz])
    frameEdges.push([-hx, sy * (hy + 0.05), -hz, hx, sy * (hy + 0.05), -hz])
    frameEdges.push([-hx, sy * (hy + 0.05), -hz, -hx, sy * (hy + 0.05), hz])
    frameEdges.push([hx, sy * (hy + 0.05), -hz, hx, sy * (hy + 0.05), hz])
  }
  // rails avant (trous de montage)
  for (const sx of [-1, 1]) frameEdges.push([sx * (hx - 0.06), -hy, hz + 0.01, sx * (hx - 0.06), hy, hz + 0.01])

  for (let p = 0; p < count; p++) {
    const i = p * 3
    const roll = rnd()
    if (roll < 0.17) {
      const e = frameEdges[Math.floor(rnd() * frameEdges.length)] as (typeof frameEdges)[number]
      const [x, y, z] = edge(...e, rnd())
      rack.set([x + gauss() * 0.006, y, z + gauss() * 0.006], i)
      continue
    }
    const pick = rnd()
    const bi = boxCum.findIndex((c) => c >= pick)
    const b = boxes[bi < 0 ? boxes.length - 1 : bi] as Box
    meta[p * 4 + 2] = b.unit
    const fx = b.z + b.d / 2
    const sub = rnd()
    let x: number
    let y: number
    let z = fx
    if (sub < 0.22) {
      // contour de la façade
      const per = rnd() * 2 * (b.w + b.h)
      if (per < b.w) [x, y] = [b.x - b.w / 2 + per, b.y - b.h / 2]
      else if (per < b.w + b.h) [x, y] = [b.x + b.w / 2, b.y - b.h / 2 + per - b.w]
      else if (per < 2 * b.w + b.h) [x, y] = [b.x + b.w / 2 - (per - b.w - b.h), b.y + b.h / 2]
      else [x, y] = [b.x - b.w / 2, b.y + b.h / 2 - (per - 2 * b.w - b.h)]
    } else if (sub < 0.45) {
      // volume : dessus et flancs
      const face = rnd()
      const fz = b.z - b.d / 2 + rnd() * b.d
      if (face < 0.5) [x, y, z] = [b.x - b.w / 2 + rnd() * b.w, b.y + b.h / 2, fz]
      else [x, y, z] = [b.x + (rnd() < 0.5 ? -1 : 1) * (b.w / 2), b.y - b.h / 2 + rnd() * b.h, fz]
    } else {
      // détails de façade selon l'appareil
      x = b.x - b.w / 2 + rnd() * b.w
      y = b.y - b.h / 2 + rnd() * b.h
      if (b.kind === 'switch') {
        const port = Math.floor(rnd() * 9)
        const px = b.x - b.w / 2 + 0.18 + port * ((b.w - 0.5) / 8)
        x = px + (rnd() - 0.5) * 0.12
        y = b.y - 0.02 + (rnd() - 0.5) * 0.12
        if (rnd() < 0.18) {
          y = b.y + b.h * 0.3
          x = px
          meta[p * 4 + 3] = 1
        }
      } else if (b.kind === 'patch') {
        const port = Math.floor(rnd() * 12)
        x = b.x - b.w / 2 + 0.12 + port * ((b.w - 0.24) / 11) + (rnd() - 0.5) * 0.06
        y = b.y + (rnd() - 0.5) * 0.08
      } else if (b.kind === 'server') {
        if (rnd() < 0.5) y = b.y - b.h / 2 + 0.12 + Math.floor(rnd() * 9) * ((b.h - 0.24) / 8)
        if (rnd() < 0.06) {
          x = b.x + b.w / 2 - 0.16
          y = b.y + b.h * 0.3
          meta[p * 4 + 3] = 1
        }
      } else if (b.kind === 'screen') {
        x = b.x + (rnd() - 0.5) * (b.w - 0.5)
        y = b.y + (rnd() - 0.5) * (b.h - 0.24)
        meta[p * 4 + 3] = 0.5
      } else if (b.kind === 'vent') {
        x = b.x - b.w / 2 + 0.12 + Math.floor(rnd() * 16) * ((b.w - 0.24) / 15)
      } else if (b.kind === 'router') {
        if (rnd() < 0.1) {
          x = b.x - 0.4 + Math.floor(rnd() * 4) * 0.25
          y = b.y
          meta[p * 4 + 3] = 1
        }
      }
    }
    rack.set([x, y, z], i)
  }

  return { count, circuit, rack, rand, meta, anchors }
}
