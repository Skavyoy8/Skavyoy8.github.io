'use client'

import { Component, type PointerEvent } from 'react'
import { useCalm } from '@/lib/calm'
import { AtelierMarkup } from './AtelierMarkup'
import './atelier.css'

/**
 * Accueil « Atelier » (V5) : la logique du design (rack 3D qu'on fait tourner, pièces cliquables,
 * projets dépliables, copie du pseudo Discord). Le balisage est dans AtelierMarkup.tsx.
 * Le mode calme du site (et prefers-reduced-motion) coupe les animations et la rotation.
 */

const ACCENT = '#FF4F00'

type UnitId = 'routeur' | 'ecran' | 'patch' | 'switch' | 'ms01' | 'nas' | 'vent' | 'plein'
type Unit = { id: UnitId; short: string; name: string; size: string; phase: 'Phase 1' | 'Phase 2'; desc: string; more: string; y: number }
type ProjectId = 'homelab' | 'pronote' | 'portfolio'
type RigKey = 'hero' | 'cfg'
type ElKey = 'hrig' | 'hstage' | 'rig' | 'sway' | 'stage'
type Drag = { x: number; y: number; lx: number; rx: number; ry: number; id: number; on: boolean; el: HTMLElement }
type Rig = { rx: number; ry: number; vel: number; el: ElKey; scale: number; vis: boolean; drag: Drag | null }

type State = {
  sec: string
  unit: UnitId
  xpl: boolean
  xplTouched: boolean
  wire: boolean
  ph1: boolean
  spin: boolean
  proj: ProjectId | null
  copied: boolean
}

const UNITS: readonly Unit[] = [
  { id: 'routeur', short: 'Routeur', name: 'Routeur GL.iNet Slate AX', size: 'Posé sur le rack', phase: 'Phase 2', desc: 'Il isolera le lab du réseau de la maison.', more: '', y: -181 },
  { id: 'ecran', short: 'Écran', name: 'Écran tactile 7,84″', size: '2U', phase: 'Phase 2', desc: 'Pour suivre l’état du serveur en continu (Proxmox et btop).', more: '', y: -108 },
  { id: 'patch', short: 'Patch panel', name: 'Patch panel 12 ports Cat6', size: '0,5U', phase: 'Phase 1', desc: 'Les câbles passent derrière, des cordons de 25 cm en façade.', more: '', y: -63 },
  { id: 'switch', short: 'Switch', name: 'Switch MokerLink', size: '1U', phase: 'Phase 1', desc: '8 ports 2.5G et 1 port SFP+ 10G, avec gestion des VLAN, sans ventilateur.', more: 'Relié au serveur en 10G, et à la box par un seul câble.', y: -36 },
  { id: 'ms01', short: 'MS-01', name: 'Minisforum MS-01', size: '2U', phase: 'Phase 1', desc: 'Le serveur : processeur i5-12600H, 32 Go de mémoire, SSD NVMe de 1 To, sous Proxmox.', more: 'Quatre ports réseau (2 × SFP+ 10G, 2 × 2.5G), trois emplacements NVMe, et seulement 25 à 35 W au repos.', y: 18 },
  { id: 'nas', short: 'Réserve NAS', name: 'Réserve NAS', size: '1U', phase: 'Phase 1', desc: 'Une place gardée pour un futur NAS.', more: '', y: 72 },
  { id: 'vent', short: 'Cache ventilé', name: 'Cache ventilé', size: '1U', phase: 'Phase 2', desc: 'Les blocs d’alimentation respirent derrière.', more: '', y: 108 },
  { id: 'plein', short: 'Cache plein', name: 'Cache plein', size: '0,5U', phase: 'Phase 2', desc: 'Ferme le rack proprement.', more: '', y: 135 },
]

const SECTIONS = ['accueil', 'a-propos', 'competences', 'homelab', 'projets', 'parcours', 'contact'] as const

function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16)
  const c = (v: number) => `0${Math.round(v * k).toString(16)}`.slice(-2)
  return `#${c((n >> 16) & 255)}${c((n >> 8) & 255)}${c(n & 255)}`
}

function byUnit<T>(fn: (u: Unit, i: number) => T) {
  return Object.fromEntries(UNITS.map((u, i) => [u.id, fn(u, i)])) as Record<UnitId, T>
}

class AtelierRig extends Component<{ calm: boolean }, State> {
  state: State = { sec: '', unit: 'ms01', xpl: false, xplTouched: false, wire: false, ph1: false, spin: false, proj: null, copied: false }

  private alive = false
  private raf = 0
  private lastT = 0
  private xplAt = 0
  private justDragged = 0
  private autoX = false
  private copyTimer = 0
  private xplTimer = 0
  private obsTimer = 0
  private secIo: IntersectionObserver | null = null
  private stageIo: IntersectionObserver | null = null
  private visIo: IntersectionObserver | null = null
  private el: Partial<Record<ElKey, HTMLElement | null>> = {}
  private rigs: Record<RigKey, Rig> = {
    hero: { rx: -12, ry: -28, vel: 0, el: 'hrig', scale: 0.9, vis: true, drag: null },
    cfg: { rx: -14, ry: -30, vel: 0, el: 'rig', scale: 1, vis: true, drag: null },
  }

  // Refs stables (créées une seule fois) : React ne les rappelle pas à chaque rendu.
  private refs = {
    hrig: (node: HTMLDivElement | null) => this.onRef('hrig', node),
    hstage: (node: HTMLDivElement | null) => this.onRef('hstage', node),
    rig: (node: HTMLDivElement | null) => this.onRef('rig', node),
    sway: (node: HTMLDivElement | null) => this.onRef('sway', node),
    stage: (node: HTMLDivElement | null) => this.onRef('stage', node),
  }

  private onRef(k: ElKey, node: HTMLElement | null) {
    this.el[k] = node
    if (!node) return
    if (k === 'hrig') this.applyRig('hero', false)
    if (k === 'rig') this.applyRig('cfg', false)
  }

  componentDidMount() {
    this.alive = true
    this.applyRig('hero', false)
    this.applyRig('cfg', false)
    this.raf = requestAnimationFrame(this.loop)
    this.obsTimer = window.setTimeout(() => this.setupObservers(), 120)
  }

  componentWillUnmount() {
    this.alive = false
    cancelAnimationFrame(this.raf)
    window.clearTimeout(this.copyTimer)
    window.clearTimeout(this.xplTimer)
    window.clearTimeout(this.obsTimer)
    this.secIo?.disconnect()
    this.stageIo?.disconnect()
    this.visIo?.disconnect()
  }

  private setupObservers() {
    if (!this.alive) return
    this.visIo = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === this.el.hstage) this.rigs.hero.vis = entry.isIntersecting
        if (entry.target === this.el.stage) this.rigs.cfg.vis = entry.isIntersecting
      }
    })
    if (this.el.hstage) this.visIo.observe(this.el.hstage)
    if (this.el.stage) this.visIo.observe(this.el.stage)

    // Section courante : la bande centrale de l'écran décide (souligne le lien du menu).
    this.secIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting && this.state.sec !== entry.target.id) this.setState({ sec: entry.target.id })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of SECTIONS) {
      const node = document.getElementById(id)
      if (node) this.secIo.observe(node)
    }

    // Quand le rack du homelab arrive à l'écran, il s'éclate une fois tout seul.
    const stage = this.el.stage
    if (stage) {
      this.stageIo = new IntersectionObserver(
        (entries) => {
          if (!entries[0]?.isIntersecting || this.autoX) return
          this.autoX = true
          this.xplTimer = window.setTimeout(() => {
            if (this.alive && !this.state.xplTouched) {
              this.xplAt = Date.now()
              this.setState({ xpl: true })
            }
          }, 500)
          this.stageIo?.disconnect()
        },
        { threshold: 0.45 },
      )
      this.stageIo.observe(stage)
    }
  }

  private loop = (t: number) => {
    if (!this.alive) return
    this.raf = requestAnimationFrame(this.loop)
    const dt = Math.min(0.05, Math.max(0, (t - (this.lastT || t)) / 1000))
    this.lastT = t
    if (this.props.calm) return
    for (const k of ['hero', 'cfg'] as const) {
      const r = this.rigs[k]
      if (r.drag || !r.vis) continue
      let moved = false
      if (Math.abs(r.vel) > 0.02) {
        r.ry += r.vel
        r.vel *= 0.93
        moved = true
      }
      const speed = k === 'hero' ? 12 : this.state.spin ? 18 : 0
      if (speed) {
        r.ry += dt * speed
        moved = true
      }
      if (moved) this.applyRig(k, false)
    }
  }

  private applyRig(k: RigKey, animate: boolean) {
    const r = this.rigs[k]
    const node = this.el[r.el]
    if (!node) return
    node.style.transition = animate ? 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
    node.style.transform = `rotateX(${r.rx.toFixed(2)}deg) rotateY(${r.ry.toFixed(2)}deg)${r.scale !== 1 ? ` scale3d(${r.scale}, ${r.scale}, ${r.scale})` : ''}`
  }

  private rotBy(d: number) {
    const r = this.rigs.cfg
    r.ry += d
    r.vel = 0
    this.applyRig('cfg', true)
  }

  private down(k: RigKey, e: PointerEvent<HTMLElement>) {
    if (e.button) return
    const r = this.rigs[k]
    r.drag = { x: e.clientX, y: e.clientY, lx: e.clientX, rx: r.rx, ry: r.ry, id: e.pointerId, on: false, el: e.currentTarget }
    r.vel = 0
  }

  private move(k: RigKey, e: PointerEvent<HTMLElement>) {
    const r = this.rigs[k]
    const d = r.drag
    if (!d) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (!d.on) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      d.on = true
      try {
        d.el.setPointerCapture(d.id)
      } catch {
        // pointeur déjà relâché : on continue sans capture
      }
      if (k === 'cfg' && this.el.sway) this.el.sway.style.animationPlayState = 'paused'
    }
    r.vel = (e.clientX - d.lx) * 0.4
    d.lx = e.clientX
    r.ry = d.ry + dx * 0.4
    r.rx = Math.max(-40, Math.min(8, d.rx - dy * 0.25))
    this.applyRig(k, false)
  }

  private up(k: RigKey) {
    const r = this.rigs[k]
    const d = r.drag
    r.drag = null
    if (d?.on) {
      if (k === 'cfg') this.justDragged = Date.now()
    } else r.vel = 0
  }

  private copyPseudo = () => {
    navigator.clipboard?.writeText('skavyoy_').catch(() => {})
    this.setState({ copied: true })
    window.clearTimeout(this.copyTimer)
    this.copyTimer = window.setTimeout(() => {
      if (this.alive) this.setState({ copied: false })
    }, 2200)
  }

  view() {
    const s = this.state
    const accent = ACCENT
    const accInk = shade(accent, 0.72)
    const accSoft = rgba(accent, 0.16)
    const { sec, unit: sel, xpl, wire, ph1, spin } = s
    // Date.now() ne sert qu'à décaler l'explosion juste après un clic : sans effet au premier rendu.
    const recent = this.alive && Date.now() - this.xplAt < 1300

    const pick = byUnit((u) => () => {
      if (Date.now() - this.justDragged < 300) return
      this.setState({ unit: u.id })
    })
    const ush = byUnit((u) => (u.id === sel ? `0 0 0 2px ${accent}` : 'inset 0 1px 0 rgba(241, 240, 234, 0.1)'))
    const lc = byUnit((u) => (u.id === sel ? accInk : '#2B2A27'))
    const ux = byUnit((u, i) => {
      const isSel = u.id === sel
      let y = u.y
      let z = u.id === 'routeur' ? 10 : 20
      if (xpl) {
        y += u.id === 'routeur' ? -110 : (i - 4) * 24
        z += 70
      }
      if (isSel) z += 70
      return { y, z, d: recent ? i * 55 : 0 }
    })
    const uc = byUnit((u) => [u.id === sel ? 'ksel' : '', ph1 && u.phase === 'Phase 2' ? 'kghost' : ''].filter(Boolean).join(' '))

    const c = UNITS.find((u) => u.id === sel) ?? (UNITS[4] as Unit)
    const cur = { ...c, hasMore: !!c.more, phaseColor: c.phase === 'Phase 1' ? accInk : '#6B6A64' }
    const unitList = UNITS.map((u) => {
      const isSel = u.id === sel
      const ghost = ph1 && u.phase === 'Phase 2'
      return {
        short: u.short,
        go: pick[u.id],
        active: isSel,
        bg: isSel ? accent : 'transparent',
        color: isSel ? '#131313' : ghost ? '#8A8983' : '#131313',
        ring: isSel ? 'none' : ghost ? 'inset 0 0 0 1px rgba(19, 19, 19, 0.1)' : 'inset 0 0 0 1px rgba(19, 19, 19, 0.16)',
        size: u.id === 'routeur' ? 'dessus' : u.size,
        h: u.size === '2U' ? 88 : 44,
        mb: u.id === 'routeur' ? 8 : 0,
      }
    })
    const cordsOn = !xpl && sel !== 'patch' && sel !== 'switch'
    const stageCls = [xpl ? 'kxpl' : '', wire ? 'kwire' : '', cordsOn ? '' : 'knocord'].filter(Boolean).join(' ')
    const tg = (on: boolean) => ({ on, bg: on ? '#131313' : 'transparent', color: on ? '#F7F6F2' : '#131313' })
    const stageHint = ph1 ? 'En pointillés : la phase 2 (écran, routeur, caches)' : wire ? 'Vue filaire · 10″ de large, 8U de haut' : 'Glisse pour tourner · clique une pièce'

    const proj = Object.fromEntries(
      (['homelab', 'pronote', 'portfolio'] as const).map((id) => {
        const open = s.proj === id
        return [id, { open, rot: open ? '45deg' : '0deg', go: () => this.setState({ proj: open ? null : id }) }]
      }),
    ) as Record<ProjectId, { open: boolean; rot: string; go: () => void }>

    return {
      r: this.refs,
      rootCls: this.props.calm ? 'qcalm' : '',
      accent,
      accInk,
      accSoft,
      nav: { apropos: sec === 'a-propos', competences: sec === 'competences', homelab: sec === 'homelab', projets: sec === 'projets', parcours: sec === 'parcours' },
      hDown: (e: PointerEvent<HTMLElement>) => this.down('hero', e),
      hMove: (e: PointerEvent<HTMLElement>) => this.move('hero', e),
      hUp: () => this.up('hero'),
      cur,
      tgl: { xpl: tg(xpl), wire: tg(wire), ph1: tg(ph1), spin: tg(spin) },
      toggleXpl: () => {
        this.xplAt = Date.now()
        this.setState({ xpl: !xpl, xplTouched: true })
      },
      toggleWire: () => this.setState({ wire: !wire }),
      togglePh1: () => this.setState({ ph1: !ph1 }),
      toggleSpin: () => this.setState({ spin: !spin }),
      stageCls,
      stageHint,
      rotL: () => this.rotBy(-35),
      rotR: () => this.rotBy(35),
      rotFace: () => {
        const r = this.rigs.cfg
        r.rx = -8
        r.ry = 0
        r.vel = 0
        this.applyRig('cfg', true)
      },
      rDown: (e: PointerEvent<HTMLElement>) => this.down('cfg', e),
      rMove: (e: PointerEvent<HTMLElement>) => this.move('cfg', e),
      rUp: () => this.up('cfg'),
      pick,
      ush,
      lc,
      ux,
      uc,
      unitList,
      proj,
      copyLabel: s.copied ? 'Copié !' : 'Copier',
      copyPseudo: this.copyPseudo,
    }
  }

  render() {
    return <AtelierMarkup v={this.view()} />
  }
}

export type AtelierView = ReturnType<AtelierRig['view']>

export function Atelier() {
  const calm = useCalm()
  return <AtelierRig calm={calm} />
}
