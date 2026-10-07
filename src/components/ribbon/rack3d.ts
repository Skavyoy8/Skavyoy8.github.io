import {
  BoxGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  CylinderGeometry,
  EdgesGeometry,
  Group,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
  SRGBColorSpace,
  TubeGeometry,
  Vector3,
} from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { homelab, type RackUnitKind } from '@/content/homelab'

/**
 * Le rack 10" du homelab, modélisé en code (aucun fichier 3D) : cadre DeskPi 8U,
 * unités à l'échelle (1U = 44,45 mm, ici en décimètres), façades dessinées dans des canvas.
 * Les LED et l'écran passent par une texture émissive : le bloom de la scène les fait briller.
 */

export const U = 0.4445
const W = 2.54 // largeur d'une façade 10"
const POST_X = 1.2
const DEPTH = 2.1
const FRONT = DEPTH / 2
const H = 8 * U
const PX = 400 // pixels de texture par décimètre

type Draw = (ctx: CanvasRenderingContext2D, glow: CanvasRenderingContext2D, w: number, h: number) => void

const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const SANS = 'ui-sans-serif, system-ui, sans-serif'

function brushed(ctx: CanvasRenderingContext2D, w: number, h: number, tone = 24) {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, `rgb(${tone + 10} ${tone + 12} ${tone + 6})`)
  g.addColorStop(1, `rgb(${tone} ${tone + 2} ${tone - 4})`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
  ctx.globalAlpha = 0.05
  for (let y = 0; y < h; y += 3) {
    ctx.fillStyle = y % 6 ? '#fff' : '#000'
    ctx.fillRect(0, y, w, 1)
  }
  ctx.globalAlpha = 1
}

function ears(ctx: CanvasRenderingContext2D, w: number, h: number) {
  // Oreilles de fixation et vis, aux deux bords.
  for (const x of [26, w - 26]) {
    for (const y of h > 120 ? [h * 0.25, h * 0.75] : [h / 2]) {
      ctx.fillStyle = '#0a0b08'
      ctx.beginPath()
      ctx.arc(x, y, 11, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#3a3d33'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x - 6, y)
      ctx.lineTo(x + 6, y)
      ctx.stroke()
    }
  }
}

function led(glow: CanvasRenderingContext2D, x: number, y: number, color: string, r = 5) {
  glow.fillStyle = color
  glow.beginPath()
  glow.arc(x, y, r, 0, Math.PI * 2)
  glow.fill()
}

function port(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = '#040503'
  ctx.fillRect(x, y, w, h)
  ctx.strokeStyle = '#4a4e42'
  ctx.lineWidth = 2
  ctx.strokeRect(x, y, w, h)
  ctx.fillStyle = '#1a1c15'
  ctx.fillRect(x + w * 0.3, y + h - 8, w * 0.4, 6)
}

const draws: Record<Exclude<RackUnitKind, 'reserve'>, Draw> = {
  router(ctx, glow, w, h) {
    brushed(ctx, w, h, 30)
    ctx.fillStyle = '#c9ccc2'
    ctx.font = `600 ${h * 0.32}px ${SANS}`
    ctx.fillText('GL·iNet', 40, h * 0.62)
    for (let i = 0; i < 3; i++) led(glow, w - 120 + i * 34, h / 2, i === 2 ? '#6ae4ff' : '#ffffff', 6)
  },
  screen(ctx, glow, w, h) {
    brushed(ctx, w, h)
    ears(ctx, w, h)
    const sx = w * 0.13
    const sy = h * 0.12
    const sw = w * 0.74
    const sh = h * 0.76
    ctx.fillStyle = '#020302'
    ctx.fillRect(sx - 8, sy - 8, sw + 16, sh + 16)
    // Console Proxmox et btop, en lumière.
    glow.fillStyle = '#070b08'
    glow.fillRect(sx, sy, sw, sh)
    glow.fillStyle = '#c8ff2e'
    glow.font = `600 ${sh * 0.11}px ${MONO}`
    glow.fillText('pve · ms-01', sx + 24, sy + sh * 0.18)
    glow.fillStyle = '#8d8f88'
    glow.font = `${sh * 0.085}px ${MONO}`
    glow.fillText('uptime 12 j · 8 lxc · 0 alertes', sx + sw * 0.5, sy + sh * 0.18)
    const bars = [
      ['cpu', 0.34],
      ['ram', 0.36],
      ['nvme', 0.21],
    ] as const
    bars.forEach(([label, value], i) => {
      const y = sy + sh * (0.36 + i * 0.17)
      glow.fillStyle = '#8d8f88'
      glow.fillText(label, sx + 24, y + sh * 0.06)
      glow.fillStyle = '#1d2216'
      glow.fillRect(sx + sw * 0.16, y, sw * 0.34, sh * 0.07)
      glow.fillStyle = '#c8ff2e'
      glow.fillRect(sx + sw * 0.16, y, sw * 0.34 * value, sh * 0.07)
    })
    glow.strokeStyle = '#6ae4ff'
    glow.lineWidth = 4
    glow.beginPath()
    for (let i = 0; i <= 40; i++) {
      const x = sx + sw * 0.58 + (sw * 0.38 * i) / 40
      const y = sy + sh * (0.72 - 0.22 * Math.abs(Math.sin(i * 0.45)) - 0.08 * Math.sin(i * 1.7))
      if (i) glow.lineTo(x, y)
      else glow.moveTo(x, y)
    }
    glow.stroke()
  },
  patch(ctx, glow, w, h) {
    brushed(ctx, w, h)
    ears(ctx, w, h)
    const start = w * 0.12
    const step = (w * 0.76) / 12
    for (let i = 0; i < 12; i++) {
      port(ctx, start + i * step + 6, h * 0.3, step - 12, h * 0.5)
      ctx.fillStyle = '#6d7064'
      ctx.font = `${h * 0.2}px ${MONO}`
      ctx.fillText(String(i + 1), start + i * step + step / 2 - 6, h * 0.22)
    }
    void glow
  },
  switch(ctx, glow, w, h) {
    brushed(ctx, w, h)
    ears(ctx, w, h)
    ctx.fillStyle = '#c9ccc2'
    ctx.font = `600 ${h * 0.2}px ${SANS}`
    ctx.fillText('MokerLink', 70, h * 0.58)
    const start = w * 0.3
    const step = w * 0.054
    for (let i = 0; i < 8; i++) {
      port(ctx, start + i * step, h * 0.38, step - 14, h * 0.42)
      led(glow, start + i * step + 10, h * 0.25, i < 3 ? '#9dff3c' : '#2a2f22', 5)
      led(glow, start + i * step + step - 26, h * 0.25, i < 3 ? '#ffb02e' : '#2a2f22', 5)
    }
    // Cage SFP+ 10G.
    ctx.fillStyle = '#040503'
    ctx.fillRect(w * 0.79, h * 0.36, w * 0.08, h * 0.32)
    ctx.strokeStyle = '#c8ff2e'
    ctx.lineWidth = 3
    ctx.strokeRect(w * 0.79, h * 0.36, w * 0.08, h * 0.32)
    led(glow, w * 0.83, h * 0.24, '#c8ff2e', 6)
    ctx.fillStyle = '#6d7064'
    ctx.font = `${h * 0.14}px ${MONO}`
    ctx.fillText('10G', w * 0.81, h * 0.86)
  },
  server(ctx, glow, w, h) {
    // Façade du MS-01, posé sur sa tablette 2U.
    brushed(ctx, w, h, 34)
    ctx.fillStyle = '#0d0e0b'
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 18; col++) {
        ctx.beginPath()
        ctx.arc(w * 0.08 + col * w * 0.028 + (row % 2) * w * 0.014, h * 0.2 + row * h * 0.12, 6, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    ctx.fillStyle = '#c9ccc2'
    ctx.font = `600 ${h * 0.11}px ${SANS}`
    ctx.fillText('MINISFORUM', w * 0.62, h * 0.32)
    ctx.fillStyle = '#6d7064'
    ctx.font = `${h * 0.09}px ${MONO}`
    ctx.fillText('MS-01 · i5-12600H', w * 0.62, h * 0.48)
    for (let i = 0; i < 2; i++) port(ctx, w * 0.62 + i * 70, h * 0.62, 52, 26)
    ctx.strokeStyle = '#4a4e42'
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.arc(w * 0.9, h * 0.5, 22, 0, Math.PI * 2)
    ctx.stroke()
    glow.strokeStyle = '#c8ff2e'
    glow.lineWidth = 5
    glow.beginPath()
    glow.arc(w * 0.9, h * 0.5, 22, 0, Math.PI * 2)
    glow.stroke()
    led(glow, w * 0.84, h * 0.75, '#6ae4ff', 5)
  },
  vent(ctx, glow, w, h) {
    brushed(ctx, w, h)
    ears(ctx, w, h)
    ctx.fillStyle = '#060705'
    for (let i = 0; i < 22; i++) {
      const x = w * 0.1 + i * w * 0.037
      ctx.beginPath()
      ctx.roundRect(x, h * 0.22, w * 0.018, h * 0.56, 6)
      ctx.fill()
    }
    void glow
  },
  blank(ctx, glow, w, h) {
    brushed(ctx, w, h)
    ears(ctx, w, h)
    ctx.fillStyle = '#2b2e26'
    ctx.fillRect(w * 0.1, h * 0.48, w * 0.8, 3)
    void glow
  },
}

const disposables: { dispose: () => void }[] = []
const track = <T extends { dispose: () => void }>(item: T) => {
  disposables.push(item)
  return item
}

function panelMaterial(kind: Exclude<RackUnitKind, 'reserve'>, width: number, height: number) {
  const w = Math.round(width * PX)
  const h = Math.max(48, Math.round(height * PX))
  const base = document.createElement('canvas')
  const light = document.createElement('canvas')
  base.width = light.width = w
  base.height = light.height = h
  const ctx = base.getContext('2d')!
  const glow = light.getContext('2d')!
  glow.fillStyle = '#000'
  glow.fillRect(0, 0, w, h)
  draws[kind](ctx, glow, w, h)
  const map = track(new CanvasTexture(base))
  const emissiveMap = track(new CanvasTexture(light))
  map.colorSpace = SRGBColorSpace
  emissiveMap.colorSpace = SRGBColorSpace
  map.anisotropy = 4
  return track(new MeshStandardMaterial({ map, emissiveMap, emissive: '#ffffff', emissiveIntensity: 2.4, metalness: 0.55, roughness: 0.42 }))
}

const metal = () => track(new MeshStandardMaterial({ color: '#23261d', metalness: 0.78, roughness: 0.32 }))

export type RackUnitObject = {
  id: RackUnitKind
  group: Group
  /** Hauteur de base (bas de l'unité) quand le rack est compact. */
  base: number
  /** Niveau dans la vue éclatée (0 = en bas). */
  level: number
  edges: LineBasicMaterial
  panel?: MeshStandardMaterial
}

export type RackModel = {
  root: Group
  pivot: Group
  units: RackUnitObject[]
  top: Group
  posts: Mesh[]
  cables: MeshStandardMaterial[]
  dac: MeshStandardMaterial
  levels: number
  dispose: () => void
}

/** Construit le rack. Appelé une fois, côté client. */
export function createRack(): RackModel {
  disposables.length = 0
  const root = new Group()
  const pivot = new Group()
  const rack = new Group()
  rack.position.y = -H / 2
  pivot.add(rack)
  root.add(pivot)

  // Cadre : quatre montants, plateau du bas et pieds.
  const postGeometry = track(new RoundedBoxGeometry(0.1, H + 0.12, 0.1, 2, 0.02))
  const frameMaterial = metal()
  const posts: Mesh[] = []
  for (const x of [-POST_X, POST_X]) {
    for (const z of [-FRONT + 0.05, FRONT - 0.05]) {
      const post = new Mesh(postGeometry, frameMaterial)
      post.position.set(x, H / 2, z)
      posts.push(post)
      rack.add(post)
    }
  }
  const plateGeometry = track(new RoundedBoxGeometry(2.62, 0.07, DEPTH, 2, 0.02))
  const bottom = new Mesh(plateGeometry, frameMaterial)
  bottom.position.y = -0.05
  rack.add(bottom)
  const footGeometry = track(new CylinderGeometry(0.07, 0.08, 0.08, 16))
  for (const x of [-1.1, 1.1]) {
    for (const z of [-0.85, 0.85]) {
      const foot = new Mesh(footGeometry, frameMaterial)
      foot.position.set(x, -0.13, z)
      rack.add(foot)
    }
  }

  // Le dessus : plateau + routeur posé dessus (il monte avec la vue éclatée).
  const top = new Group()
  const topPlate = new Mesh(plateGeometry, frameMaterial)
  topPlate.position.y = 0.035
  top.add(topPlate)
  rack.add(top)

  // Unités, du haut vers le bas dans le contenu : on les empile depuis le bas.
  const order = [...homelab.units].reverse()
  const units: RackUnitObject[] = []
  let y = 0
  let level = 0
  const edgeGeometryFor = (w: number, h: number, d: number) => track(new EdgesGeometry(track(new BoxGeometry(w + 0.04, h + 0.04, d + 0.04))))

  for (const unit of order) {
    const group = new Group()
    const edges = track(new LineBasicMaterial({ color: '#c8ff2e', transparent: true, opacity: 0, toneMapped: false }))
    edges.color.multiplyScalar(2.2)
    let panel: MeshStandardMaterial | undefined
    const base = y

    if (unit.id === 'router') {
      // GL.iNet Slate AX, posé sur le plateau du haut.
      const body = new Mesh(track(new RoundedBoxGeometry(1.4, 0.42, 0.98, 3, 0.06)), track(new MeshStandardMaterial({ color: '#1d1f1a', metalness: 0.35, roughness: 0.5 })))
      body.position.set(0, 0.21 + 0.07, 0.1)
      panel = panelMaterial('router', 1.4, 0.42)
      const face = new Mesh(track(new PlaneGeometry(1.36, 0.38)), panel)
      face.position.set(0, 0.21 + 0.07, 0.1 + 0.49 + 0.002)
      group.add(body, face, new LineSegments(edgeGeometryFor(1.4, 0.42, 0.98), edges))
      group.children[2]!.position.copy(body.position)
      top.add(group)
      units.push({ id: unit.id, group, base: 0, level: -1, edges, panel })
      continue
    }

    const height = unit.heightU * U
    if (unit.id === 'reserve') {
      // Emplacement libre : un contour pointillé, en attente du NAS.
      const dashed = track(new LineDashedMaterial({ color: '#c8ff2e', dashSize: 0.08, gapSize: 0.06, transparent: true, opacity: 0.45, toneMapped: false }))
      const ghost = new LineSegments(edgeGeometryFor(W - 0.08, height - 0.06, 1.6), dashed)
      ghost.computeLineDistances()
      ghost.position.set(0, height / 2, FRONT - 0.8)
      group.add(ghost)
      const outline = new LineSegments(edgeGeometryFor(W - 0.08, height - 0.06, 1.6), edges)
      outline.position.copy(ghost.position)
      group.add(outline)
    } else if (unit.id === 'server') {
      // Tablette 2U et le MS-01 posé dessus.
      const shelf = new Mesh(track(new RoundedBoxGeometry(W, 0.05, 1.9, 2, 0.015)), metal())
      shelf.position.set(0, 0.03, FRONT - 0.95)
      const lip = new Mesh(track(new RoundedBoxGeometry(W, height, 0.04, 2, 0.015)), metal())
      lip.position.set(0, height / 2, FRONT - 0.02)
      lip.scale.y = 0.18
      lip.position.y = height * 0.09
      const pc = new Mesh(track(new RoundedBoxGeometry(1.96, 0.48 * 1.4, 1.89, 3, 0.05)), track(new MeshStandardMaterial({ color: '#2a2d26', metalness: 0.6, roughness: 0.4 })))
      pc.position.set(-0.1, 0.05 + 0.34, FRONT - 1.0)
      panel = panelMaterial('server', 1.96, 0.672)
      const face = new Mesh(track(new PlaneGeometry(1.92, 0.64)), panel)
      face.position.set(-0.1, 0.05 + 0.34, FRONT - 1.0 + 0.945 + 0.002)
      const outline = new LineSegments(edgeGeometryFor(W, height, 1.9), edges)
      outline.position.set(0, height / 2, FRONT - 0.95)
      group.add(shelf, lip, pc, face, outline)
    } else {
      const depth = unit.id === 'switch' ? 1.5 : unit.id === 'screen' ? 0.55 : unit.id === 'patch' ? 0.35 : 0.06
      const body = new Mesh(track(new RoundedBoxGeometry(W, height - 0.01, depth, 2, 0.012)), metal())
      body.position.set(0, height / 2, FRONT - depth / 2)
      panel = panelMaterial(unit.id, W, height)
      const face = new Mesh(track(new PlaneGeometry(W - 0.004, height - 0.014)), panel)
      face.position.set(0, height / 2, FRONT + 0.002)
      const outline = new LineSegments(edgeGeometryFor(W, height, depth), edges)
      outline.position.copy(body.position)
      group.add(body, face, outline)
    }

    group.position.y = base
    rack.add(group)
    // Le patch panel suit le switch dans la vue éclatée : les cordons restent branchés.
    if (unit.id !== 'patch') level++
    units.push({ id: unit.id, group, base, level: level - 1, edges, panel })
    y += height
  }

  // Cordons de brassage patch → switch, et le câble DAC 10G (lumineux) vers le MS-01.
  const switchUnit = order.findIndex((u) => u.id === 'switch')
  const patchUnit = order.findIndex((u) => u.id === 'patch')
  const switchObj = units[switchUnit]!
  const patchObj = units[patchUnit]!
  const cables: MeshStandardMaterial[] = []
  const patchY = patchObj.base + 0.25 * U - switchObj.base
  const portX = (i: number) => -W / 2 + W * 0.12 + ((W * 0.76) / 12) * (i + 0.5)
  const switchX = (i: number) => -W / 2 + W * 0.3 + W * 0.054 * i + W * 0.022
  const colors = ['#c8ff2e', '#e8e9e2', '#6ae4ff']
  for (let i = 0; i < 3; i++) {
    const a = new Vector3(portX(i * 2), patchY, FRONT + 0.02)
    const b = new Vector3(switchX(i), U * 0.4, FRONT + 0.02)
    const curve = new CatmullRomCurve3([a, a.clone().add(new Vector3(0, 0, 0.18)), new Vector3((a.x + b.x) / 2, (a.y + b.y) / 2 + 0.02, FRONT + 0.32), b.clone().add(new Vector3(0, 0, 0.18)), b])
    const material = track(new MeshStandardMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: i === 0 ? 0.9 : 0.15, roughness: 0.5 }))
    cables.push(material)
    switchObj.group.add(new Mesh(track(new TubeGeometry(curve, 40, 0.022, 8)), material))
  }
  const dacMaterial = track(new MeshStandardMaterial({ color: '#c8ff2e', emissive: '#c8ff2e', emissiveIntensity: 2.2, roughness: 0.4, transparent: true }))
  cables.push(dacMaterial)
  const serverObj = units[order.findIndex((u) => u.id === 'server')]!
  const dy = serverObj.base - switchObj.base
  const dac = new CatmullRomCurve3([
    new Vector3(W * 0.33, U * 0.5, FRONT + 0.02),
    new Vector3(W * 0.42, U * 0.4, FRONT + 0.3),
    new Vector3(1.45, dy + U * 1.2, FRONT - 0.2),
    new Vector3(1.4, dy + U * 1.0, -0.6),
    new Vector3(0.6, dy + U * 0.9, -0.95),
  ])
  switchObj.group.add(new Mesh(track(new TubeGeometry(dac, 60, 0.026, 8)), dacMaterial))

  const levels = level
  top.position.y = H

  const dispose = () => {
    for (const item of disposables) item.dispose()
    disposables.length = 0
  }

  // Éclairage du rack : il voyage avec lui le long de la page.
  const hemi = new HemisphereLight('#eef3e2', '#090a07', 1.3)
  const key = new DirectionalLight('#ffffff', 3.2)
  key.position.set(-4, 7, 8)
  key.target.position.set(0, 0, 0)
  const rim = new PointLight('#c8ff2e', 26, 12, 2)
  rim.position.set(3.2, 2.4, -2.6)
  const fill = new PointLight('#6ae4ff', 6, 10, 2)
  fill.position.set(-3, -1, 3)
  root.add(hemi, key, key.target, rim, fill)

  return { root, pivot, units, top, posts, cables, dac: dacMaterial, levels, dispose }
}

export const RACK_HEIGHT = H
