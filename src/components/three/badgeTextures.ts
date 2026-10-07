import QRCode from 'qrcode'
import * as THREE from 'three'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { asset } from '@/lib/asset'

export type BadgeTextures = { front: THREE.CanvasTexture; back: THREE.CanvasTexture; band: THREE.CanvasTexture }

const W = 800
const H = 1125
const BG = '#0b0b0e'
const FG = '#ededef'
const MUTED = '#8b8b94'
const ACCENT = '#c8ff2e'

function fonts() {
  const css = getComputedStyle(document.documentElement)
  const sans = css.getPropertyValue('--font-geist').trim() || 'system-ui, sans-serif'
  const mono = css.getPropertyValue('--font-geist-mono').trim() || 'ui-monospace, monospace'
  return { sans, mono }
}

function canvas(w: number, h: number) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  if (!ctx) throw new Error('canvas 2D indisponible')
  return { c, ctx }
}

function corners(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, len: number) {
  ctx.beginPath()
  for (const [cx, cy, dx, dy] of [
    [x, y, 1, 1],
    [x + w, y, -1, 1],
    [x, y + h, 1, -1],
    [x + w, y + h, -1, -1],
  ] as const) {
    ctx.moveTo(cx, cy + dy * len)
    ctx.lineTo(cx, cy)
    ctx.lineTo(cx + dx * len, cy)
  }
  ctx.stroke()
}

function texture(c: HTMLCanvasElement) {
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

async function loadAvatar(): Promise<HTMLImageElement | null> {
  try {
    const img = new Image()
    img.src = asset(site.avatar)
    await img.decode()
    return img
  } catch {
    return null
  }
}

/** Recto, verso et bande du badge, dessinés en canvas : aucune image externe. */
export async function createBadgeTextures(): Promise<BadgeTextures> {
  await document.fonts?.ready
  const { sans, mono } = fonts()
  const b = about.badge
  const avatar = await loadAvatar()

  // Recto
  const front = canvas(W, H)
  let ctx = front.ctx
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)
  ctx.strokeStyle = 'rgba(255,255,255,0.04)'
  ctx.lineWidth = 1
  for (let x = 0; x < W; x += 50) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, H)
    ctx.stroke()
  }
  ctx.fillStyle = ACCENT
  ctx.fillRect(0, 0, W, 10)
  ctx.font = `500 30px ${mono}`
  ctx.fillStyle = MUTED
  ctx.fillText(b.org, 60, 96)
  ctx.font = `600 26px ${mono}`
  const level = b.level
  const lw = ctx.measureText(level).width + 28
  ctx.fillStyle = ACCENT
  ctx.fillRect(W - 60 - lw, 66, lw, 42)
  ctx.fillStyle = BG
  ctx.fillText(level, W - 60 - lw + 14, 96)

  if (avatar) {
    ctx.save()
    ctx.filter = 'grayscale(1) contrast(1.1)'
    ctx.drawImage(avatar, 60, 150, 250, 250)
    ctx.restore()
  }
  ctx.strokeStyle = ACCENT
  ctx.lineWidth = 3
  corners(ctx, 50, 140, 270, 270, 26)
  // puce de contact
  ctx.strokeStyle = 'rgba(200,255,46,0.6)'
  ctx.lineWidth = 2
  ctx.strokeRect(370, 180, 130, 100)
  for (let i = 1; i < 4; i++) {
    ctx.beginPath()
    ctx.moveTo(370 + i * 32.5, 180)
    ctx.lineTo(370 + i * 32.5, 280)
    ctx.stroke()
  }
  ctx.font = `400 24px ${mono}`
  ctx.fillStyle = MUTED
  ctx.fillText('SIGNAL // 10G', 370, 330)
  ctx.fillText('LAN ONLY', 370, 366)

  ctx.font = `600 118px ${sans}`
  ctx.fillStyle = FG
  ctx.fillText(b.name, 54, 545)
  ctx.font = `400 32px ${mono}`
  ctx.fillStyle = MUTED
  ctx.fillText(b.handle, 60, 596)

  const rows: [string, string, string][] = [
    ['FILIÈRE', b.role, FG],
    ['STATUT', b.status, FG],
    ['ACCÈS', b.access, ACCENT],
  ]
  ctx.font = `400 28px ${mono}`
  rows.forEach(([k, v, color], i) => {
    const y = 690 + i * 52
    ctx.fillStyle = MUTED
    ctx.fillText(k, 60, y)
    ctx.fillStyle = color
    ctx.fillText(v, 230, y)
  })

  const qr = QRCode.create(site.github.url, { errorCorrectionLevel: 'M' }).modules
  const cell = Math.floor(190 / (qr.size + 2))
  const qx = W - 60 - cell * (qr.size + 2)
  const qy = H - 60 - cell * (qr.size + 2)
  ctx.fillStyle = FG
  ctx.fillRect(qx, qy, cell * (qr.size + 2), cell * (qr.size + 2))
  ctx.fillStyle = BG
  for (let y = 0; y < qr.size; y++) for (let x = 0; x < qr.size; x++) if (qr.get(x, y)) ctx.fillRect(qx + (x + 1) * cell, qy + (y + 1) * cell, cell, cell)
  ctx.font = `400 24px ${mono}`
  ctx.fillStyle = MUTED
  ctx.fillText(b.qrLabel, 60, H - 70)

  // Verso
  const back = canvas(W, H)
  ctx = back.ctx
  ctx.fillStyle = BG
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = ACCENT
  ctx.fillRect(0, H - 10, W, 10)
  ctx.font = `500 30px ${mono}`
  ctx.fillStyle = MUTED
  ctx.fillText(b.backTitle.toUpperCase(), 60, 110)
  ctx.font = `400 30px ${mono}`
  b.backLines.forEach(([k, v], i) => {
    const y = 210 + i * 92
    ctx.fillStyle = MUTED
    ctx.fillText(k.toUpperCase(), 60, y)
    ctx.fillStyle = FG
    ctx.font = `500 40px ${sans}`
    ctx.fillText(v, 60, y + 46)
    ctx.font = `400 30px ${mono}`
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'
    ctx.beginPath()
    ctx.moveTo(60, y + 66)
    ctx.lineTo(W - 60, y + 66)
    ctx.stroke()
  })
  for (let i = 0; i < 46; i++) {
    const w = (i * 7919) % 3 === 0 ? 8 : 3
    ctx.fillStyle = FG
    ctx.fillRect(60 + i * 14, H - 150, w, 70)
  }
  ctx.font = `400 24px ${mono}`
  ctx.fillStyle = MUTED
  ctx.fillText(site.url.replace('https://', ''), 60, H - 40)

  // Bande du lanyard
  const band = canvas(1024, 64)
  ctx = band.ctx
  ctx.fillStyle = '#121216'
  ctx.fillRect(0, 0, 1024, 64)
  ctx.font = `600 30px ${mono}`
  ctx.fillStyle = ACCENT
  ctx.fillText(`${site.name.toUpperCase()} · CIEL / FR · ${site.name.toUpperCase()} · SIGNAL ·`, 12, 43)

  const bandTexture = texture(band.c)
  bandTexture.wrapS = THREE.RepeatWrapping
  bandTexture.wrapT = THREE.ClampToEdgeWrapping
  bandTexture.repeat.set(3, 1)
  return { front: texture(front.c), back: texture(back.c), band: bandTexture }
}
